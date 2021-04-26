import React, { FC, useCallback } from "react";
import { createPrefixClass } from "@/util/utils";
import { Checkbox } from "antd";
import classNames from "classnames";

import styles from "./index.less";

const prefixCls = createPrefixClass("table-card", styles);

interface ITableCardProps {
  id: string;
  url: string;
  name: string;
  checked: boolean;
  className?: string;
  onClick?: (id: string) => void;
  onCheck: (val: boolean) => void;
}

const TableCard: FC<ITableCardProps> = ({
  className,
  name,
  url,
  id,
  checked,
  onCheck,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    onClick?.(id);
  }, [onClick]);

  return (
    <div className={classNames(prefixCls(), className)} onClick={handleClick}>
      <div className={prefixCls("left")}>
        <div className={prefixCls("checkbox")}>
          <Checkbox
            checked={checked}
            onChange={(e) => onCheck?.(e.target.checked)}
          />
        </div>
        <div
          className={prefixCls("url")}
          style={{ backgroundImage: `url(${url})` }}
        ></div>
        <div className={prefixCls("public")}>Public</div>
        <div className={prefixCls("name")}>{name}</div>
      </div>
      <div className={prefixCls("right")}></div>
    </div>
  );
};

export default TableCard;
