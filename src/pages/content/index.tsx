import React, { FC, useEffect } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import DragBoxWarp from "@/components/Draggble";

import styles from "./index.less";

interface IContentProps {
  [x: string]: any;
}

const prefixCls = createPrefixClass("content", styles);

const Content: FC<IContentProps> = ({ consumer }) => {
  const handleClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };

  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  return (
    <div className={prefixCls()} onClick={handleClick} id="container">
      <DragBoxWarp warpComponentId="container">
        <div>这里是需要拖拽的目标</div>
      </DragBoxWarp>
    </div>
  );
};

export default contextConsumer(Content);
