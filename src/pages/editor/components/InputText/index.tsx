import { InputNumber } from "antd";
import React, { forwardRef } from "react";
import { InputNumberProps } from "antd/lib/input-number";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const prefixCls = createPrefixClass("input-style-one", styles);

export interface InputTextProps extends InputNumberProps {
  styleOne?: boolean;
}

const InputText: React.ForwardRefRenderFunction<any, InputTextProps> = (
  props,
  ref
) => {
  const { className, styleOne, ...resetProps } = props;
  return (
    <InputNumber
      {...resetProps}
      ref={ref}
      className={classNames(className, {
        [prefixCls()]: styleOne,
      })}
    />
  );
};
export default forwardRef(InputText);
