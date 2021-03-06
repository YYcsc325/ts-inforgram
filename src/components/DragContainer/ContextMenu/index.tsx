import React, { FC } from "react";
import { Dropdown, Menu } from "antd";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const prefixCls = createPrefixClass("context-menu", styles);

export type OptionsItem = {
  title: string;
  value: string;
  icon?: React.ReactNode;
};

interface IContextMenuProps {
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

const ContextMenu: FC<IContextMenuProps> = ({
  children,
  options = [],
  onMenuClick,
  placement = "bottomCenter",
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: OptionsItem
  ) => {
    e.stopPropagation();
    onMenuClick?.(value);
  };

  const menu = (
    <Menu>
      {options.map((item, index) => (
        <div
          key={item.value || index}
          onClick={(e) => handleClick(e, item)}
          className={prefixCls("menu-item")}
        >
          <div className={prefixCls("item-title")}>{item.title}</div>
          <div className={prefixCls("item-icon")}>{item.icon}</div>
        </div>
      ))}
    </Menu>
  );
  return (
    <Dropdown
      overlay={menu}
      placement={placement}
      trigger={["contextMenu"]}
      overlayClassName={prefixCls()}
    >
      <div>{children}</div>
    </Dropdown>
  );
};

export default ContextMenu;
