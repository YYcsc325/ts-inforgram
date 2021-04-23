import React, { FC, useCallback } from "react";
import { createPrefixClass } from "@/util/utils";
import { Link } from "umi";
import classNames from "classnames";

import styles from "./index.less";
import RotateAllow from "../RotateAllow";
import { actionBarItems } from "../mock";

const prefixCls = createPrefixClass("odps", styles);

interface IOdpsProps {
  selectId?: string;
  onOpen: () => void;
}

const Odps: FC<IOdpsProps> = ({ onOpen, selectId }) => {
  const handleOpenClick = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <div className={prefixCls()}>
      <RotateAllow
        className={prefixCls("rotate-allow")}
        onClick={handleOpenClick}
      />
      <div className={prefixCls("user")}>
        <div className={prefixCls("user-icon")}>YC</div>
      </div>
      {actionBarItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            to={item.link}
            key={item.id}
            className={classNames(prefixCls("select-icon"), {
              [prefixCls("active")]: item.id === selectId,
            })}
          >
            <Icon />
          </Link>
        );
      })}
    </div>
  );
};

export default Odps;
