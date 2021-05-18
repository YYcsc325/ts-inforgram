import React, { FC, CSSProperties, useState } from "react";
import classNames from "classnames";
import { createPrefixClass, filterChildren } from "@/util/utils";
import ChildBox, { IDragBoxProps } from "./ChildBox";
import styles from "./index.less";

const prefixCls = createPrefixClass("drag-container", styles);

export interface IDragContainerProps {
  className?: string;
  style?: CSSProperties;
}

const DragContainer: FC<IDragContainerProps> & {
  Box: FC<IDragBoxProps>;
} = ({ className, style, children, ...reset }) => {
  const [clicked, setClicked] = useState<string | undefined>();

  const childFilter = filterChildren(children, ChildBox);

  return (
    <div
      {...reset}
      className={classNames(prefixCls(), className)}
      style={style}
    >
      {childFilter.map((child) => {
        console.log(child, "child");
        return React.cloneElement(child, {});
      })}
      {"这里渲染辅助线"}
    </div>
  );
};

DragContainer.displayName = "DragContainer";
DragContainer.Box = ChildBox;

export default DragContainer;
