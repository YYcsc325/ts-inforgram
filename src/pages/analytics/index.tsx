import React, { FC, useEffect } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

interface IAnalyticsProps {
  [x: string]: any;
}

const prefixCls = createPrefixClass("analytics", styles);

const Analytics: FC<IAnalyticsProps> = ({ consumer }) => {
  const handleClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };

  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  return (
    <div className={prefixCls()} onClick={handleClick}>
      analytics
    </div>
  );
};

export default contextConsumer(Analytics);
