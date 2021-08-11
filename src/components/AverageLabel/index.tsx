import React, { useMemo } from "react";
import classNames from "classnames";
import {
  createPrefixClass,
  filterChildren,
  childrenClone,
  splitArray,
  autoFillArray,
} from "@/util/utils";
import { uniqueId } from "lodash";

import styles from "./index.less";

const createPrefixLabel = createPrefixClass("average-warp", styles);
const createPrefixLabelItem = createPrefixClass("average-item", styles);

interface IAverageItemProps {
  splitLabel?: boolean;
  label: string;
  value: string | number;
  style?: React.CSSProperties;
  className?: string;
}

const AverageItem: React.FC<IAverageItemProps> = ({
  label = "",
  value = "",
  className,
  style,
  splitLabel = false,
}) => {
  const labelRender = useMemo(() => {
    return splitLabel
      ? label.split("").map((item) => <span key={item}>{item}</span>)
      : [label];
  }, [label, splitLabel]);

  return (
    <div
      className={classNames(createPrefixLabelItem(), className)}
      style={style}
    >
      <div
        className={classNames(createPrefixLabelItem("label"), {
          [createPrefixLabelItem("space")]: labelRender.length > 1,
          [createPrefixLabelItem("center")]: labelRender.length <= 1,
        })}
      >
        {labelRender}
      </div>
      <div className={createPrefixLabelItem("text")}>{value}</div>
    </div>
  );
};

interface IAverageLabelProps {
  splitLabel?: boolean;
  size?: number;
  style?: React.CSSProperties;
  space?: number;
  className?: string;
}

const AverageLabel: React.FC<IAverageLabelProps> & {
  Item: React.FC<IAverageItemProps>;
} = ({ children, className, style, size = 4, splitLabel = false }) => {
  const childList = filterChildren(children, AverageItem);
  const sortChildList = splitArray<
    Exclude<React.ReactNode, boolean | null | undefined>
  >(childList, size);
  const renderSortChildList = sortChildList.map((list) =>
    autoFillArray(list, size, () => (
      <AverageItem label={""} value={""} key={uniqueId()} />
    ))
  );

  return (
    <div className={classNames(createPrefixLabel(), className)} style={style}>
      {renderSortChildList.map((childs: any, index: number) => (
        <div key={index} className={createPrefixLabel("col")}>
          {childs.map((child: any) => (
            <div
              key={child.props.name}
              className={createPrefixLabel("col-line")}
            >
              {childrenClone(child, { splitLabel })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

AverageLabel.Item = AverageItem;
AverageLabel.displayName = "AverageLabel";
AverageItem.displayName = "AverageItem";

export { IAverageLabelProps, IAverageItemProps };

export default AverageLabel;
