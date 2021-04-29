import React, { FC, useState } from "react";
import { createPrefixClass } from "@/util/utils";
import classNames from "classnames";

import styles from "./index.less";

const prefixCls = createPrefixClass("tabs", styles);

interface IDialogProps {
  [x: string]: any;
}

interface ITabsProps {}
interface ITabsItemProps {}

const Tabs: FC<ITabsProps> & {
  Item: FC<ITabsItemProps>;
} = () => {
  return <div></div>;
};

const TabsItem: FC<ITabsItemProps> = () => {
  return <div></div>;
};
Tabs.displayName = "Tabs";
TabsItem.displayName = "TabsItem";

Tabs.Item = TabsItem;

export default Tabs;
