import { Select } from "antd";
import React, { forwardRef } from "react";
import { RefSelectProps, SelectProps } from "antd/lib/select";

export interface IFormSelectProps extends SelectProps<any> {
  options: Array<{ value: any; text: React.ReactNode }>;
}

const FormSelect: React.ForwardRefRenderFunction<
  RefSelectProps,
  IFormSelectProps
> = (props, ref) => {
  const { options = [], ...reset } = props;
  return (
    <Select {...reset} ref={ref}>
      {options.map((item) => (
        <Select.Option key={item?.value} value={item?.value}>
          {item?.text}
        </Select.Option>
      ))}
    </Select>
  );
};
export default forwardRef(FormSelect);
