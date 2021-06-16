import React, { FC, useCallback } from "react";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const prefixCls = createPrefixClass("shrink-line", styles);

export interface IShrinkLineProps {
  style?: React.CSSProperties;
  className?: string;
  onMouseMove?: () => void;
}

const ShrinkLine: FC<IShrinkLineProps> = ({
  style,
  className,
  onMouseMove,
}) => {
  const handleMouseMove = useCallback(
    (e) => {
      console.log(e, "e");
    },
    [onMouseMove]
  );
  return (
    <div className={classNames(prefixCls(), className)} style={style}>
      <span
        className={prefixCls("shrink-line-box")}
        onMouseMove={handleMouseMove}
      >
        <span className={prefixCls("shrink-line-double")}></span>
      </span>
    </div>
  );
};

export default ShrinkLine;
