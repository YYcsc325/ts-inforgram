import React from "react";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const prefixCls = createPrefixClass("odps", styles);

const arr = [1, 2, 3, 4, 5];

const Odps = () => {
  return (
    <div className={prefixCls()}>
      <div className={prefixCls("switch")}>点击</div>
      <div className={prefixCls("user-icon")}>哈哈</div>
      {arr.map((item) => (
        <div>{item}</div>
      ))}
    </div>
  );
};

export default Odps;
