import React, { FC, useEffect } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

interface ITeamProps {
  [x: string]: any;
}

const prefixCls = createPrefixClass("team", styles);

const Team: FC<ITeamProps> = ({ consumer }) => {
  const handleClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };

  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  return (
    <div className={prefixCls()} onClick={handleClick}>
      team
    </div>
  );
};

export default contextConsumer(Team);
