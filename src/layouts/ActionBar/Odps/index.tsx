import React from "react";
import { Link } from "umi";
import { parse } from "qs";
import Cookies from "js-cookie";
import classNames from "classnames";
import { ellipsis } from "@/util/utils";
import { createPrefixClass } from "@/util/utils";

import UserTolTip from "../UserTolTip";
import RotateAllow from "../RotateAllow";
import { actionBarItems } from "../mock";
import styles from "./index.less";

const prefixCls = createPrefixClass("odps", styles);

interface IOdpsProps {
  selectId?: string;
  onOpen: () => void;
}

const Odps: React.FC<IOdpsProps> = ({ onOpen, selectId }) => {
  const [isShowUser, setIsShowUser] = React.useState(false);
  const userName = ellipsis(
    parse(Cookies.get("userLogin") as string)?.name as string
  );

  const handleOpenClick = React.useCallback(() => {
    onOpen?.();
  }, [onOpen]);

  const handleIsShowUser = () => {
    setIsShowUser(false);
  };

  React.useEffect(() => {
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
