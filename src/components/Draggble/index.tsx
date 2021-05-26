import React, { FC } from "react";
import { createPrefixClass } from "@/util/utils";
import Draggable from "react-draggable";

import styles from "./index.less";

const prefixCls = createPrefixClass("draggable", styles);

export interface IDragBoxWarpProps {
  defaultPostion: { left: number; top: number };
}

const DragBoxWarp: FC<IDragBoxWarpProps> = ({ defaultPostion, children }) => {
  return (
    <Draggable
      defaultPosition={{ x: defaultPostion.left, y: defaultPostion.top }}
      defaultClassName={prefixCls()}
    >
      {children}
    </Draggable>
  );
};

export default DragBoxWarp;
