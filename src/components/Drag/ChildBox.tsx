import React, { useCallback, forwardRef, useRef, useState } from "react";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";
import { RedoOutlined } from "@ant-design/icons";

import styles from "./ChildBox.less";
import { useDragHookContext } from "./context";
import { transform, transformScale } from "./utils";

const prefixCls = createPrefixClass("dragable", styles);

const points = ["e", "w", "s", "n", "ne", "nw", "se", "sw"];

// 东 - 右:  e
// 南 - 下:  s
// 西 - 左:  w
// 北 - 上:  n

// 西北 - 左上: nw
// 东北 - 右上: ne
// 西南 - 左下: sw
// 东南 - 右下: se

export interface IDragBoxProps {
  id: string; // 唯一标识
  scale?: boolean; // 是否开启等比例缩放
  defaultPostion?: { left: number; top: number };
  defaultStyle?: { width: number; height: number };
  width?: number;
  height?: number;
  [x: string]: any;
}

const DragBox: React.ForwardRefRenderFunction<HTMLDivElement, IDragBoxProps> = (
  { id, scale, defaultStyle, defaultPostion, onDrag, children, ...reset },
  ref
) => {
  const { clicked, dragArea } = useDragHookContext();
  const targetArea = dragArea || document;
  const isClicked = clicked === id;

  const [defaultPrivatePos] = useState(() => ({
    left: defaultPostion?.left ?? 0,
    top: defaultPostion?.top ?? 0,
  }));
  const [defaultPrivateStyle] = useState(() => ({
    width: defaultStyle?.width ?? 100,
    height: defaultStyle?.height ?? 100,
  }));
  const [style, setStyle] = useState({
    ...defaultPrivateStyle,
    ...defaultPrivatePos,
  });

  /**
   * @name 初始化元素坐标跟鼠标坐标
   * @param top 元素top
   * @param left 元素left
   * @param cX 鼠标的x轴位置
   * @param cY 鼠标的y轴位置
   */
  const oriPos = useRef({ ...defaultPrivatePos, cX: 0, cY: 0 });
  /** 鼠标是否按下 */
  const isDown = useRef(false);
  /** 记录鼠标按下位置 */
  const direction = useRef("");

  // 鼠标被按下
  const onMouseDown = useCallback(
    (dir, e) => {
      // 阻止事件冒泡
      e.stopPropagation();
      // 阻止默认行为
      e.preventDefault();
      // 保存拖拽事件方向。
      direction.current = dir;
      isDown.current = true;
      oriPos.current = { ...style, cX: e.clientX, cY: e.clientY };
      // 在目标拖拽区域注册事件
      targetArea?.addEventListener?.("mousemove", onMouseMove);
      targetArea?.addEventListener?.("mouseup", onMouseUp);
    },
    [style, targetArea]
  );

  // 鼠标移动
  const onMouseMove = useCallback(
    (e) => {
      e.stopPropagation();
      // 判断鼠标是否按住
      if (!isDown.current) return;
      const newStyle = scale
        ? transformScale(direction.current, oriPos.current, e)
        : transform(direction.current, oriPos.current, e);
      setStyle(newStyle);
      onDrag?.(e, id, newStyle);
    },
    [onDrag]
  );

  // 鼠标被抬起
  const onMouseUp = useCallback(
    (e) => {
      e.stopPropagation();
      isDown.current = false;
      // 取消注册事件
      targetArea?.removeEventListener?.("mousemove", onMouseMove);
      targetArea?.removeEventListener?.("mouseup", onMouseUp);
    },
    [targetArea]
  );

  return (
    <div
      {...reset}
      ref={ref}
      data-id={id}
      style={style}
      className={classNames(prefixCls(), {
        [prefixCls("clicked")]: isClicked,
      })}
      onMouseDown={(e) => onMouseDown("move", e)}
    >
      {isClicked &&
        points.map((item) => (
          <div
            className={classNames(
              prefixCls("control-point"),
              prefixCls(`point-${item}`)
            )}
            key={item}
            onMouseDown={(e) => onMouseDown(item, e)}
          ></div>
        ))}
      {isClicked && (
        <div
          className={classNames(prefixCls("rotate"))}
          onMouseDown={(e) => onMouseDown("rotate", e)}
        >
          <RedoOutlined style={{ color: "#3494ce" }} />
        </div>
      )}
      {children}
    </div>
  );
};

DragBox.displayName = "DragBox";

export default forwardRef(DragBox);
