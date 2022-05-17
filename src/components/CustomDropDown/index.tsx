import React, { FC } from "react";
import { Dropdown, Menu } from "antd";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const prefixCls = createPrefixClass("dropdown", styles);

type OptionsItem = { title: string; value: string; icon?: React.ReactNode };

interface ICustomDropDownProps {
  options: Array<OptionsItem>;
  placement?:
    | "bottomRight"
    | "bottomLeft"
    | "bottomCenter"
    | "topLeft"
    | "topCenter"
    | "topRight";
  onMenuClick?: (params: OptionsItem) => void;
}

const CustomDropDown: FC<ICustomDropDownProps> = ({
  children,
  options = [],
  onMenuClick,
  placement = "bottomCenter",
}) => {
  const handleClick = (value: OptionsItem) => {
    onMenuClick?.(value);
  };
  const menu = (
    <Menu>
      {options.map((item, i) => (
        <div
          key={i}
          onClick={() => handleClick(item)}
          className={prefixCls("menu-item")}
        >
          <div className={prefixCls("item-icon")}>{item.icon}</div>
          <div className={prefixCls("item-title")}>{item.title}</div>
        </div>
      ))}
    </Menu>
  );

  return (
    <div>
      <Dropdown
        overlay={menu}
        placement={placement}
        overlayClassName={prefixCls()}
      >
        {children}
      </Dropdown>
    </div>
  );
};

export default CustomDropDown;
