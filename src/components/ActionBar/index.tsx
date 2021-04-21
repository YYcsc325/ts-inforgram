import React, { FC, useState } from "react";
import { createPrefixClass } from "@/util/utils";

import Odps from "./components/Odps";
import Shrinkage from "./components/Shrinkage";
import styles from "./index.less";

const prefixCls = createPrefixClass("action-bar", styles);

interface IActionBarProps {
  showShrinkage: boolean;
}

const ActionBar: FC<IActionBarProps> = ({ showShrinkage = false }) => {
  const [isShowShrinkage] = useState(showShrinkage);

  return (
    <div className={prefixCls()}>
      <Odps />
      <Shrinkage isOpen={isShowShrinkage} />
    </div>
  );
};

export default ActionBar;
