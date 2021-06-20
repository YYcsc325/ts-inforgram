import React, { FC, useEffect } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import a from "@/util/normalizr";

import styles from "./index.less";

a();

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
