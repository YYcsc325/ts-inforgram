import React, { FC, useCallback } from "react";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";
import RotateAllow from "../RotateAllow";
import { data } from "../mock";

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
      <RotateAllow
        className={prefixCls("rotate-allow")}
        onClick={handleOpenClick}
      />
      <div className={prefixCls("user")}>
        <div className={prefixCls("user-icon")}>YC</div>
      </div>
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
