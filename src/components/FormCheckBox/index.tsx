import { Checkbox } from "antd";
import { CheckboxGroupProps } from "antd/lib/checkbox";
import React, { forwardRef, ForwardRefRenderFunction } from "react";

const CheckboxGroup = Checkbox.Group;

const FormCheckbox: ForwardRefRenderFunction<
  HTMLDivElement,
  CheckboxGroupProps
> = (props = {}, ref: any) => {
  return <CheckboxGroup {...props} ref={ref} />;
};
export default forwardRef(FormCheckbox);
