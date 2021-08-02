import React, { FC, useEffect, useState } from "react";
import { AutoCenterTexts } from "@/components";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import ColorModifier from "@/components/ColorModifier";

import styles from "./index.less";

interface IBrandsetsProps {
  [x: string]: any;
}

const dataList = [
  {
    label: "就是",
    text: 123,
  },
  {
    label: "就是这",
    text: 12343,
  },
  {
    label: "就是这",
    text: 11,
  },
  {
    label: "就是这杨",
    text: 12,
  },
  {
    label: "就是这",
    text: 12,
  },
  {
    label: "就",
    text: 2121212,
  },
  {
    label: "就是这杨的",
    text: 3123,
  },
  {
    label: "就是这杨的",
    text: 213123,
  },
];

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
      <AutoCenterTexts>
        {dataList.map(({ label, text }) => (
          <AutoCenterTexts.Item label={label} text={text} />
        ))}
      </AutoCenterTexts>
    </div>
  );
};

export default contextConsumer(Brandsets);
