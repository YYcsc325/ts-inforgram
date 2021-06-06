import React, { FC, useEffect } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

interface IBrandsetsProps {
  [x: string]: any;
}

const prefixCls = createPrefixClass("brandsets", styles);

const Brandsets: FC<IBrandsetsProps> = ({ consumer }) => {
  const handleClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };

  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  return (
    <div className={prefixCls()} onClick={handleClick}>
      brandsets
    </div>
  );
};

export default contextConsumer(Brandsets);
