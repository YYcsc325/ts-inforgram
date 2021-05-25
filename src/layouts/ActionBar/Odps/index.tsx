import React, { FC, useCallback, useState, useEffect } from "react";
import { createPrefixClass } from "@/util/utils";
import { Link } from "umi";
import classNames from "classnames";
import UserTolTip from "@/layouts/ActionBar/UserTolTip";
import Cookies from "js-cookie";
import { parse } from "qs";
import { ellipsis } from "@/util/utils";

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
  const userName = ellipsis(
    parse(Cookies.get("userLogin") as string)?.name as string
  );

  const handleOpenClick = useCallback(() => {
    onOpen?.();
  }, [onOpen]);

  const handleIsShowUser = () => {
    setIsShowUser(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleIsShowUser);
    return () => {
      document.removeEventListener("click", handleIsShowUser);
    };
  }, []);

  return (
    <div className={prefixCls()}>
      <RotateAllow
        className={prefixCls("rotate-allow")}
        onClick={handleOpenClick}
      />
      <div
        className={prefixCls("user")}
        onClick={() => {
          event?.stopImmediatePropagation();
          setIsShowUser(true);
        }}
      >
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
          userName={userName}
          className={prefixCls("user-position")}
        />
      )}
    </div>
  );
};

export default Odps;
