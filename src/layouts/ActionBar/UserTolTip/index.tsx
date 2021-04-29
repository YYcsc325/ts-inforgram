import React, { FC, useState } from "react";
import { createPrefixClass } from "@/util/utils";
import classNames from "classnames";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "umi";

import styles from "./index.less";

interface IUserTolTipProps {
  userName: string;
  className?: string;
}

const prefixCls = createPrefixClass("user-tip", styles);

const UserTolTip: FC<IUserTolTipProps> = ({ className, userName }) => {
  const [isRotate, setIsRotate] = useState(false);

  return (
    <div className={classNames(prefixCls(), className)}>
      <div className={prefixCls("top")}>
        <div className={prefixCls("user-icon")}>YC</div>
        <Link className={prefixCls("user-warp")} to="/library">
          <div className={prefixCls("user-name")}>{userName}</div>
          <div className={prefixCls("user-mes")}>Basic account</div>
        </Link>
      </div>
      <div
        className={classNames(prefixCls("bottom"), {
          [prefixCls("bottom-bg")]: isRotate,
        })}
        onMouseEnter={() => setIsRotate(true)}
        onMouseLeave={() => setIsRotate(false)}
      >
        <div
          className={classNames(prefixCls("b-icon"), {
            [prefixCls("trans")]: isRotate,
          })}
        >
          <PlusOutlined />
        </div>
        <div className={prefixCls("b-mes")}>Create a team</div>
      </div>
    </div>
  );
};

export default UserTolTip;
