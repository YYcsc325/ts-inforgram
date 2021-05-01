import React, { FC, useCallback, useState, useMemo } from "react";
import { createPrefixClass, filterChildren } from "@/util/utils";
import classNames from "classnames";

import styles from "./index.less";

const prefixTabCls = createPrefixClass("tabs", styles);
const prefixTabPaneCls = createPrefixClass("tabs-pane", styles);

interface ITabsProps {
  defaultActiveValue?: string;
  activeValue?: string;
  className?: string;
  onChange?: (key: string) => void;
}
interface ITabsPaneProps {
  tab: React.ReactNode;
  value: string;
  className?: string;
  privateValue?: string;
  onChange?: (key: string) => void;
  children: React.ReactNode;
}

const Tabs: FC<ITabsProps> & {
  TabPane: FC<ITabsPaneProps>;
} = ({ className, children, defaultActiveValue, activeValue, onChange }) => {
  const [privateValue, setPrivateValue] = useState(defaultActiveValue);

  const childFilter = filterChildren(children, TabsPane);

  const childFilterProps = useMemo(() => {
    return childFilter.map((item) => item.props);
  }, [childFilter]);

  const handleChange = useCallback(
    (value) => {
      onChange?.(value);
      setPrivateValue(value);
    },
    [onChange, setPrivateValue]
  );

  return (
    <div className={classNames(prefixTabCls(), className)}>
      <div className={prefixTabCls("warp")}>
        {childFilter.map((child) =>
          React.cloneElement(child, { onChange: handleChange, privateValue })
        )}
      </div>
      <div>
        {childFilterProps.find((item) => item.value === privateValue)?.children}
      </div>
    </div>
  );
};

const TabsPane: FC<ITabsPaneProps> = ({
  tab,
  value,
  onChange,
  className,
  children,
  privateValue,
  ...resetProps
}) => {
  const handleChange = useCallback(() => {
    onChange?.(value);
  }, [onChange]);
  return (
    <div
      {...resetProps}
      className={classNames(
        prefixTabPaneCls(),
        {
          [prefixTabPaneCls("active")]: privateValue === value,
        },
        className
      )}
      onClick={handleChange}
    >
      {tab}
    </div>
  );
};

Tabs.displayName = "Tabs";
TabsPane.displayName = "TabsPane";

Tabs.TabPane = TabsPane;

export default Tabs;
