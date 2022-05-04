import React, { FC } from "react";
import InputText, { InputTextProps } from "../InputText";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const prefixCls = createPrefixClass("title-input", styles);

export interface ILabelInputProps extends InputTextProps {
  label: React.ReactNode;
}

const LabelInput: FC<ILabelInputProps> = (props) => {
  const { label, children, ...resetProps } = props;
  return (
    <div className={prefixCls()}>
      <div>{label}</div>
      <div>{children ? children : <InputText {...resetProps} />}</div>
    </div>
  );
};

export default LabelInput;
