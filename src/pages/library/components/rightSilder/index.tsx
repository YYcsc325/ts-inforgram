import React, { FC } from "react";
import Drag from "@/pages/library/components/drag/index";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const prefixCls = createPrefixClass("right-silder", styles);

const RightSilder = () => {
  return (
    <div className={prefixCls()}>
      <Drag />
    </div>
  );
};

export default RightSilder;
