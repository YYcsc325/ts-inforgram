import React, { FC, useCallback, useRef } from "react";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const prefixCls = createPrefixClass("shrink-line", styles);

export interface IShrinkLineProps {
  style?: React.CSSProperties;
  className?: string;
  onMouseDown?: (e: React.MouseEventHandler<HTMLSpanElement>) => void;
  onMouseMove?: (e: React.MouseEventHandler<HTMLSpanElement>) => void;
  onMouseUp?: (e: React.MouseEventHandler<HTMLSpanElement>) => void;
}

const ShrinkLine: FC<IShrinkLineProps> = ({
  style,
  className,
  onMouseDown,
  onMouseMove,
  onMouseUp,
}) => {
  const isDown = useRef<boolean>(false);

  const handleMouseDown = useCallback(
    (e) => {
      isDown.current = true;
      onMouseDown?.(e);
      document?.addEventListener?.("mousemove", handleMouseMove);
      document?.addEventListener?.("mouseup", handleMouseUp);
    },
    [onMouseDown]
  );

  const handleMouseMove = useCallback(
    (e) => {
      isDown.current && onMouseMove?.(e);
    },
    [onMouseMove]
  );

  const handleMouseUp = useCallback((e) => {
    isDown.current = false;
    onMouseUp?.(e);
    document?.removeEventListener?.("mousemove", handleMouseMove);
    document?.removeEventListener?.("mouseup", handleMouseUp);
  }, []);

  return (
    <div className={classNames(prefixCls(), className)} style={style}>
      <span
        className={prefixCls("shrink-line-box")}
        onMouseDown={handleMouseDown}
      >
        <span className={prefixCls("shrink-line-double")}></span>
      </span>
    </div>
  );
};

export default ShrinkLine;
