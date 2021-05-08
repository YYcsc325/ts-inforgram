import React, { FC, useEffect } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import { DragBox } from "@/components";
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
      <DragBox left={100} top={100}></DragBox>
      <DragBox left={200} top={200}></DragBox>
    </div>
  );
};

export default contextConsumer(Team);
