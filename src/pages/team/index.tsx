import React, { FC, useEffect, useState } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import { ChromePicker } from "react-color";

import styles from "./index.less";

interface ITeamProps {
  [x: string]: any;
}

const prefixCls = createPrefixClass("team", styles);

const Team: FC<ITeamProps> = ({ consumer }) => {
  const [color, setColor] = useState<string>("");
  const handleClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };

  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  return (
    <div id={"team"} className={prefixCls()} onClick={handleClick}>
      <ChromePicker
        onChange={(e) => {
          setColor(e.hex);
        }}
        color={color}
      />
      {color}
      <span style={{ color }}>这是选择的颜色</span>
    </div>
  );
};

export default contextConsumer(Team);
