import { Input } from "antd";
import React, { forwardRef } from "react";
import { default as InputProps } from "antd/lib/input";

const FormInput: React.ForwardRefRenderFunction<any, InputProps> = (
  props,
  ref
) => {
  return <Input {...props} ref={ref} />;
};
export default forwardRef(FormInput);
