import React, { FC, useCallback, useState, useMemo } from "react";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";
import { filterChildren } from "@/util/utils";

import styles from "./index.less";

const prefixClsTabs = createPrefixClass("card-tabs", styles);
const prefixClsTab = createPrefixClass("tab", styles);

type onChange = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  val: string | undefined,
  params: ITabProps
) => void;

export interface ITabsProps {
  value?: string;
  defaultValue?: string;
  style?: React.CSSProperties;
  className?: string;
  onChange?: onChange;
}

const CardTabs: FC<ITabsProps> & {
  Tab: FC<ITabProps>;
} = (props) => {
  const { children, className, style, onChange, defaultValue } = props;
  const [praviteValue, setPraviteValue] = useState(defaultValue);
  const childList = filterChildren(children, Tab);

  const value = useMemo(() => {
    return Object.prototype.hasOwnProperty.call(props, "value")
      ? props.value
      : praviteValue;
  }, [props, praviteValue]);

  const handleChange = useCallback(
    (e, val, params) => {
      setPraviteValue(val);
      onChange?.(e, val, params);
    },
    [onChange]
  );

  return (
    <div className={classNames(prefixClsTabs(), className)} style={style}>
      {childList.map((child: any, index) =>
        React.cloneElement(child, {
          onChange: handleChange,
          active: child?.props?.value === value,
          hasLine: childList.length !== index + 1,
        })
      )}
    </div>
  );
};

export interface ITabProps {
  value: string;
  title: React.ReactNode;
  active?: boolean;
  style?: React.CSSProperties;
  description?: React.ReactNode;
  hasLine?: boolean;
  className?: string;
  onChange?: onChange;
}

const Tab: FC<ITabProps> = (props) => {
  const {
    value,
    onChange,
    className,
    title,
    description,
    style,
    active,
    hasLine,
  } = props;

  const handleChange = useCallback(
    (e) => {
      onChange?.(e, value, props);
    },
    [props, value, onChange]
  );

  return (
    <div
      key={value}
      className={classNames(prefixClsTab(), className, {
        [prefixClsTab("active")]: active,
      })}
      style={{ width: "430px", ...style }}
      onClick={handleChange}
    >
      <div className={classNames({ [prefixClsTab("line")]: hasLine })}>
        <div className={prefixClsTab("title")}>{title}</div>
        <div className={prefixClsTab("description")}>{description}</div>
      </div>
    </div>
  );
};

CardTabs.displayName = "Tabs";
Tab.displayName = "Tab";

CardTabs.Tab = Tab;

export default CardTabs;
