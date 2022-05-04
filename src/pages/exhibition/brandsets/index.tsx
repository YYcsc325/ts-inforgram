import React, { FC, useEffect, useState } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import ColorModifier from "@/components/ColorModifier";

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

  const [color, setColor] = useState("CCCCCC");

  const onChangeColor = (value: string) => {
    setColor(value);
  };

  return (
    <div className={prefixCls()} onClick={handleClick}>
      <ColorModifier value={color} onChange={onChangeColor} />
    </div>
  );
};

export default contextConsumer(Brandsets);
