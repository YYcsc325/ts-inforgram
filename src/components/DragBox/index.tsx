import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";
import { RedoOutlined } from "@ant-design/icons";

import styles from "./index.less";
import { transform } from "./utils";

const prefixCls = createPrefixClass("dragable", styles);

const points = ["e", "w", "s", "n", "ne", "nw", "se", "sw"];

interface IDragBoxProps {
  left: number;
  top: number;
  warpComponentId: string;
  clicked: boolean;
  id: string;
  onClick?: (params: string) => void;
}

const DragBox: FC<IDragBoxProps> = ({
  id,
  clicked,
  warpComponentId,
  left = 100,
  top = 100,
  onClick,
  children,
}) => {
  const [style, setStyle] = useState({
    left,
    top,
    width: 100,
    height: 100,
  });

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
      e.preventDefault();
      // 保存拖拽事件方向。
      direction.current = dir;
      isDown.current = true;
      // 然后鼠标坐标是 clientX 相对于可视化区域
      const cY = e.clientY;
      const cX = e.clientX;
      oriPos.current = { ...style, cX, cY };
    },
    [style]
  );
  // 鼠标移动
  const onMouseMove = useCallback((e) => {
    // 判断鼠标是否按住
    e.stopPropagation();
    if (!isDown.current) return;
    setStyle(transform(direction, oriPos, e));
  }, []);

  // 鼠标被抬起
  const onMouseUp = useCallback((e) => {
    e.stopPropagation();
    isDown.current = false;
  }, []);

  useEffect(() => {
    // 指定拖拽区域
    const targetCom = document.getElementById(warpComponentId);
    targetCom?.addEventListener?.("mousemove", onMouseMove);
    targetCom?.addEventListener?.("mouseup", onMouseUp);
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

export default DragBox;
