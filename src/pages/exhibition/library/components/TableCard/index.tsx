import React, { FC, useCallback } from "react";
import { createPrefixClass } from "@/util/utils";
import { Checkbox } from "antd";
import classNames from "classnames";
import { LazyLoadingImg } from "@/components";

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

  const handleCheck = useCallback(
    (e) => {
      e.stopPropagation();
      onCheck?.(e.target.checked);
    },
    [onCheck]
  );
  return (
    <div className={classNames(prefixCls(), className)} onClick={handleClick}>
      <div className={prefixCls("left")}>
        <div className={prefixCls("checkbox")}>
          <Checkbox checked={checked} onClick={handleCheck} />
        </div>
        <LazyLoadingImg className={prefixCls("url")} url={url} />
        <div className={prefixCls("public")}>Public</div>
        <div className={prefixCls("name")}>{name}</div>
      </div>
      <div className={prefixCls("right")}></div>
    </div>
  );
};

export default TableCard;
