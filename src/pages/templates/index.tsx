import React, { FC, useEffect } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

interface ITemplatesProps {
  [x: string]: any;
}

const prefixCls = createPrefixClass("templates", styles);

const Templates: FC<ITemplatesProps> = ({ consumer }) => {
  const handleClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };

  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  return (
    <div className={prefixCls()} onClick={handleClick}>
      Templates
    </div>
  );
};

export default contextConsumer(Templates);
