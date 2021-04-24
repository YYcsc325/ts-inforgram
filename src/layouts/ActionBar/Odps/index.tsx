import React, { FC, useCallback, useState } from "react";
import { createPrefixClass } from "@/util/utils";
import { Link } from "umi";
import classNames from "classnames";
import UserTolTip from "@/layouts/ActionBar/UserTolTip";

import styles from "./index.less";
import RotateAllow from "../RotateAllow";
import { actionBarItems } from "../mock";

const prefixCls = createPrefixClass("odps", styles);

interface IOdpsProps {
  selectId?: string;
  onOpen: () => void;
}

const Odps: FC<IOdpsProps> = ({ onOpen, selectId }) => {
  const [isShowUser, setIsShowUser] = useState(false);

  const handleOpenClick = useCallback(() => {
    onOpen();
  }, [onOpen]);

  document.onclick = (e) => {
    e.stopPropagation();
    setIsShowUser(false);
  };

  return (
    <div className={prefixCls()}>
      <RotateAllow
        className={prefixCls("rotate-allow")}
        onClick={handleOpenClick}
      />
      <div className={prefixCls("user")} onClick={() => setIsShowUser(true)}>
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
      {isShowUser && (
        <UserTolTip
          userName={"YY小学徒 CSC小..."}
          className={prefixCls("user-position")}
        />
      )}
    </div>
  );
};

export default Odps;
