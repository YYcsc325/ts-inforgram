import React from "react";
import { find, includes } from "lodash";
import className from "classnames";
import { useModel, useLocation } from "umi";
import { createPrefixClass } from "@/util/utils";

import Odps from "./Odps";
import Shrinkage from "./Shrinkage";
import { actionBarItems } from "./mock";
import styles from "./index.less";

const prefixCls = createPrefixClass("action-bar", styles);

const visiblePathNames = [
  "/library",
  "/brandsets",
  "/analytics",
  "/content",
  "/templates",
  "/teams",
];

const ActionBar: React.FC = () => {
  const location: any = useLocation();
  const pathName = location?.pathname;

  const [globalStore, globalActions] = useModel("useGlobalModel.index");

  const selectedBarId = find(
    actionBarItems,
    (item) => item.link === pathName
  )?.id;

  const handleShrinkageOpen = () => {
    globalActions.changeShrinkage(true);
  };

  return (
    <div
      className={className({
        [prefixCls("hidden")]: !includes(visiblePathNames, pathName),
      })}
    >
      <Odps selectId={selectedBarId} onOpen={handleShrinkageOpen} />
      <Shrinkage
        isOpen={globalStore.isShowShrinkage}
        selectId={selectedBarId}
      />
    </div>
  );
};

export default ActionBar;
