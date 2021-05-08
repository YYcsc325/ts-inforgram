import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const prefixCls = createPrefixClass("dragable", styles);

const points = ["e", "w", "s", "n", "ne", "nw", "se", "sw"];

interface IDragBoxProps {
  left: number;
  top: number;
}

const Drawing: FC<IDragBoxProps> = ({ left = 100, top = 100 }) => {
  const [style, setStyle] = useState({ left, top, width: 100, height: 100 });

  /**
   * @name 初始化元素坐标跟鼠标坐标
   * @param top 元素top
   * @param left 元素left
   * @param cX 鼠标的x轴位置
   * @param cY 鼠标的y轴位置
   */
  const oriPos = useRef({ top, left, cX: 0, cY: 0 });
  /** 鼠标是否按下 */
  const isDown = useRef(false);
  /** 记录鼠标按下位置 */
  const direction = useRef("");

  // 鼠标被按下
  const onMouseDown = useCallback(
    (dir, e) => {
      // 阻止事件冒泡
      e.stopPropagation();
      // 保存方向。
      direction.current = dir;
      isDown.current = true;
      // 然后鼠标坐标是
      const cY = e.clientY; // clientX 相对于可视化区域
      const cX = e.clientX;
      oriPos.current = {
        ...style,
        cX,
        cY,
      };
    },
    [style]
  );

  // 鼠标移动
  const onMouseMove = useCallback((e) => {
    // 判断鼠标是否按住
    console.log(isDown, "isDown");
    if (!isDown.current) return;
    let newStyle = transform(direction, oriPos, e);
    setStyle(newStyle);
  }, []);

  // 鼠标被抬起
  const onMouseUp = useCallback(() => {
    isDown.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <div
      className={prefixCls()}
      style={style}
      onMouseDown={(e) => onMouseDown("move", e)}
    >
      {points.map((item) => (
        <div
          className={classNames(
            prefixCls("control-point"),
            prefixCls(`point-${item}`)
          )}
          key={item}
          onMouseDown={(e) => onMouseDown(item, e)}
        ></div>
      ))}
      <div
        className={classNames(prefixCls("rotate"))}
        onMouseDown={(e) => onMouseDown("rotate", e)}
      ></div>
    </div>
  );
};

/**
 * 元素变化。 方法放在组件外部或者其他地方。
 * @param direction  方向 // move 移动 / 'e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'
 * @param oriStyle 元素的属性 width height top left
 * @param oriPos   鼠标按下时所记录的坐标
 * @param e        事件event
 */
function transform(direction: any, oriPos: any, e: any) {
  const style = { ...oriPos.current };
  const offsetX = e.clientX - oriPos.current.cX;
  const offsetY = e.clientY - oriPos.current.cY;
  switch (direction.current) {
    // 拖拽移动
    case "move":
      // 元素当前位置 + 偏移量
      const top = oriPos.current.top + (e.clientY - oriPos.current.cY);
      const left = oriPos.current.left + (e.clientX - oriPos.current.cX);
      // 限制必须在这个范围内移动 画板的高度-元素的高度
      style.top = top;
      style.left = left;
      break;
    // 东
    case "e":
      // 向右拖拽添加宽度
      style.width += offsetX;
      return style;
    // 西
    case "w":
      // 增加宽度、位置同步左移
      style.width -= offsetX;
      style.left += offsetX;
      return style;
    // 南
    case "s":
      style.height += offsetY;
      return style;
    // 北
    case "n":
      style.height -= offsetY;
      style.top += offsetY;
      break;
    // 东北
    case "ne":
      style.height -= offsetY;
      style.top += offsetY;
      style.width += offsetX;
      break;
    // 西北
    case "nw":
      style.height -= offsetY;
      style.top += offsetY;
      style.width -= offsetX;
      style.left += offsetX;
      break;
    // 东南
    case "se":
      style.height += offsetY;
      style.width += offsetX;
      break;
    // 西南
    case "sw":
      style.height += offsetY;
      style.width -= offsetX;
      style.left += offsetX;
      break;
    // 拖拽移动
    case "rotate":
      // 先计算下元素的中心点, x，y 作为坐标原点
      const x = style.width / 2 + style.left;
      const y = style.height / 2 + style.top;
      // 当前的鼠标坐标
      const x1 = e.clientX;
      const y1 = e.clientY;
      // 运用高中的三角函数
      style.transform = `rotate(${
        Math.atan2(y1 - y, x1 - x) * (180 / Math.PI) - 90
      }deg)`;
      break;
  }
  return style;
}

export default Drawing;
