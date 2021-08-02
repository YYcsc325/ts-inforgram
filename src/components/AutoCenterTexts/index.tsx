import React, { FC } from "react";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const createPrefixTexts = createPrefixClass("auto-texts", styles);
const createPrefixText = createPrefixClass("auto-text", styles);

export interface IAutoCenterTextsProps {
  style?: React.CSSProperties;
  className?: string;
}

const AutoCenterTexts: FC<IAutoCenterTextsProps> & {
  Item: FC<IAutoCenterTextProps>;
} = ({ children, className, style }) => {
  return (
    <div className={classNames(createPrefixTexts(), className)} style={style}>
      {children}
    </div>
  );
};

export interface IAutoCenterTextProps {
  label: string;
  text: string | number;
  style?: React.CSSProperties;
  className?: string;
}

const AutoCenterText: FC<IAutoCenterTextProps> = ({
  label = "",
  text,
  className,
  style,
}) => {
  const labelRender = label.split("").map((item) => <span>{item}</span>);

  return (
    <div className={classNames(createPrefixText(), className)} style={style}>
      <div
        className={classNames(createPrefixText("label"), {
          [createPrefixText("space")]: labelRender.length > 1,
          [createPrefixText("center")]: labelRender.length <= 1,
        })}
      >
        {labelRender}
      </div>
      <div className={createPrefixText("text")}>{text}</div>
    </div>
  );
};

AutoCenterTexts.Item = AutoCenterText;
AutoCenterTexts.displayName = "AutoCenterTexts";
AutoCenterText.displayName = "AutoCenterText";

export default AutoCenterTexts;
