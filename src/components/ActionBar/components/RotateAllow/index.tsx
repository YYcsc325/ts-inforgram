import React, { FC, useState } from "react";
import { createPrefixClass } from "@/util/utils";
import classNames from "classnames";

import styles from "./index.less";

const prefixCls = createPrefixClass("rotate-allow", styles);

interface IRotateAllowProps {
  [x: string]: any;
  className?: string;
}

const RotateAllow: FC<IRotateAllowProps> = ({ className, ...reset }) => {
  const [rotate, setRotate] = useState(false);

  return (
    <div
      {...reset}
      className={classNames(prefixCls(), className)}
      onMouseEnter={() => setRotate(true)}
      onMouseLeave={() => setRotate(false)}
    >
      <div className={prefixCls("line-warp")}>
        <div
          className={classNames(prefixCls("line"), {
            [prefixCls("rotate-top")]: rotate,
          })}
        ></div>
        <div className={prefixCls("line")}></div>
        <div
          className={classNames(prefixCls("line"), {
            [prefixCls("rotate-bottom")]: rotate,
          })}
        ></div>
      </div>
    </div>
  );
};

export default RotateAllow;
