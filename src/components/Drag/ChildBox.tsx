import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";
import { RedoOutlined } from "@ant-design/icons";

import styles from "./ChildBox.less";
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
  left: number;
  top: number;
  width?: number;
  height?: number;
  warpComponentId: string;
  clicked: boolean;
  id: string;
  onClick?: (params: string) => void;
  scale?: boolean;
}

const DragBox: FC<IDragBoxProps> = ({
  id,
  scale,
  clicked,
  warpComponentId,
  left = 100,
  top = 100,
  width = 100,
  height = 100,
  onClick,
  children,
}) => {
  const [style, setStyle] = useState({
    left,
    top,
    width,
    height,
  });

  /**
   * @name 初始化元素坐标跟鼠标坐标
   * @param top 元素top
   * @param left 元素left
   * @param cX 鼠标的x轴位置
   * @param cY 鼠标的y轴位置
   */
  const oriPos = useRef({ top, left, cX: 0, cY: 0 });
  /** 拖拽元素目标区域 */
  const targetDragArea = useRef<any>(null);
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
      // 注册事件
      targetDragArea?.current?.addEventListener?.("mousemove", onMouseMove);
      targetDragArea?.current?.addEventListener?.("mouseup", onMouseUp);
    },
    [style]
  );

  // 鼠标移动
  const onMouseMove = useCallback((e) => {
    e.stopPropagation();
    // 判断鼠标是否按住
    if (!isDown.current) return;
    const newStyle = scale
      ? transformScale(direction.current, oriPos.current, e)
      : transform(direction.current, oriPos.current, e);
    setStyle(newStyle);
  }, []);

  // 鼠标被抬起
  const onMouseUp = useCallback((e) => {
    e.stopPropagation();
    isDown.current = false;
    // 取消注册事件
    targetDragArea.current?.removeEventListener?.("mousemove", onMouseMove);
    targetDragArea.current?.removeEventListener?.("mouseup", onMouseUp);
  }, []);

  useEffect(() => {
    targetDragArea.current = document.getElementById(warpComponentId);
  }, []);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      onClick?.(id);
    },
    [onClick]
  );

  return (
    <div
      style={style}
      className={classNames(prefixCls(), {
        [prefixCls("clicked")]: clicked,
      })}
      onMouseDown={(e) => onMouseDown("move", e)}
      onClick={handleClick}
    >
      {clicked &&
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
      {clicked && (
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

export default DragBox;
