import React from "react";
import { createPrefixClass } from "@/util/utils";

import LeftSilder from "./components/leftSilder";
import RightSilder from "./components/rightSilder";
import styles from "./index.less";

const prefixCls = createPrefixClass("library", styles);

const Library = () => {
  return (
    <div className={prefixCls()}>
      <LeftSilder />
      <RightSilder />
    </div>
  );
};

export default Library;
