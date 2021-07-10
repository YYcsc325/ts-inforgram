import { Input } from "antd";
import React, { forwardRef } from "react";
import { InputProps } from "antd/lib/input";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const prefixCls = createPrefixClass("input-style-one", styles);

export interface IFormInputProps extends InputProps {
  styleOne?: boolean;
}

const FormInput: React.ForwardRefRenderFunction<any, IFormInputProps> = (
  props,
  ref
) => {
  const { className, styleOne } = props;
  return (
    <Input
      {...props}
      ref={ref}
      className={classNames(className, {
        [prefixCls()]: styleOne,
      })}
    />
  );
};
export default forwardRef(FormInput);
