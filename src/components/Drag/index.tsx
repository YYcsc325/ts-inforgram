import React, { FC, CSSProperties, useState, useCallback } from "react";
import classNames from "classnames";
import { createPrefixClass, filterChildren } from "@/util/utils";

import ChildBox, { IDragBoxProps } from "./ChildBox";
import styles from "./index.less";

const prefixCls = createPrefixClass("drag-container", styles);

export interface IDragContainerProps {
  className?: string;
  style?: CSSProperties;
  onChildClick?: (params: string) => void;
}

const DragContainer: FC<IDragContainerProps> & {
  Box: FC<IDragBoxProps>;
} = ({ className, style, children, onChildClick, ...reset }) => {
  const [clicked, setClicked] = useState<string | undefined>();

  const childFilter = filterChildren(children, ChildBox);

  const handleChildClick = useCallback(
    (id: string) => {
      setClicked(id);
      onChildClick?.(id);
    },
    [onChildClick]
  );

  return (
    <div
      {...reset}
      style={style}
      id="drag-container"
      className={classNames(prefixCls(), className)}
    >
      {childFilter.map((child) => {
        console.log(child, "child");
        return React.cloneElement(child, {
          clicked: child.props.id === clicked,
          containerId: "drag-container",
          handleChildClick,
        });
      })}
      {"这里渲染辅助线"}
    </div>
  );
};

DragContainer.displayName = "DragContainer";
DragContainer.Box = ChildBox;

export default DragContainer;
