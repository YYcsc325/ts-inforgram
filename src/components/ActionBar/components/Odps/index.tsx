import React, { FC, useCallback } from "react";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";
import { data } from "../Shrinkage/mock";

const prefixCls = createPrefixClass("odps", styles);
interface IOdpsProps {
  onOpen: () => void;
}

const Odps: FC<IOdpsProps> = ({ onOpen }) => {
  const handleOpenClick = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <div className={prefixCls()}>
      <div className={prefixCls("switch")} onClick={handleOpenClick}>
        点击
      </div>
      <div className={prefixCls("user-icon")}>哈哈</div>
      {data.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className={prefixCls("select-icon")}>
            <Icon />
          </div>
        );
      })}
    </div>
  );
};

export default Odps;
