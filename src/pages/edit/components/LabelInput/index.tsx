import React, { FC } from "react";
import FormInput, { IFormInputProps } from "@/components/FormInput";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const prefixCls = createPrefixClass("title-input", styles);

export interface ILabelInputProps extends IFormInputProps {
  label: React.ReactNode;
}

const LabelInput: FC<ILabelInputProps> = (props) => {
  const { label, ...resetProps } = props;
  return (
    <div className={prefixCls()}>
      <div>{label}</div>
      <div>
        <FormInput {...resetProps} />
      </div>
    </div>
  );
};

export default LabelInput;
