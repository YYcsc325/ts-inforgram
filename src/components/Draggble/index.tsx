import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";
import Draggable from "react-draggable";
import { RedoOutlined } from "@ant-design/icons";

import { transform } from "./utils";
import styles from "./index.less";

const prefixCls = createPrefixClass("draggable", styles);

const points = ["e", "w", "s", "n", "ne", "nw", "se", "sw"];

// 东 - 右:  e
// 南 - 下:  s
// 西 - 左:  w
// 北 - 上:  n

// 西北 - 左上: nw
// 东北 - 右上: ne
// 西南 - 左下: sw
// 东南 - 右下: se

export interface IDragBoxWarpProps {
  warpComponentId: string;
  left?: number;
  top?: number;
  width?: number | string;
  height?: number | string;
}

const DragBoxWarp: FC<IDragBoxWarpProps> = ({
  left = 0,
  top = 0,
  width,
  height,
  warpComponentId,
  children,
}) => {
  const [style, setStyle] = useState({ left, top, width, height });

  /** 拖拽目标元素 */
  const targetDragArea = useRef<any>(null);
  /** 记录鼠标位置，元素位置 */
  const oriPos = useRef({ top, left, cX: 0, cY: 0 });
  /** 鼠标是否按下 */
  const isDown = useRef(false);
  /** 记录鼠标按下位置 */
  const direction = useRef("");
  /** 获取初始化children元素高度 */
  const childrenWarpStyle = useRef(null);

  // 鼠标被按下
  const onMouseDown = useCallback(
    (e, dir) => {
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
    const newStyle = transform(direction.current, oriPos.current, e);
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
    /** 如果没有传高度，自动获取高度 */
    if (!width && !height) {
      const initailStyle = getComputedStyle(childrenWarpStyle?.current as any);
      setStyle({
        ...style,
        width: Number(initailStyle.width.replace("px", "")),
        height: Number(initailStyle.height.replace("px", "")),
      });
    }
  }, []);

  const handleUpdateStyle = (e: any, data: any) => {
    setStyle({
      ...style,
      left: data.x,
      top: data.y,
    });
  };

  return (
    <Draggable
      position={{ x: style.left, y: style.top }}
      defaultClassName={prefixCls()}
      onStart={handleUpdateStyle}
      onDrag={handleUpdateStyle}
      onStop={handleUpdateStyle}
    >
      <div
        style={{
          width: style.width,
          height: style.height,
          transform: style.transform,
        }}
        ref={childrenWarpStyle}
      >
        {points.map((item) => (
          <div
            className={classNames(
              prefixCls("control-point"),
              prefixCls(`point-${item}`)
            )}
            key={item}
            onMouseDown={(e) => onMouseDown(e, item)}
          ></div>
        ))}
        <div
          className={classNames(prefixCls("rotate"))}
          onMouseDown={(e) => onMouseDown(e, "rotate")}
        >
          <RedoOutlined style={{ color: "#3494ce" }} />
        </div>
        {children}
      </div>
    </Draggable>
  );
};

export default DragBoxWarp;
