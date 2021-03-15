import { Select } from 'antd';
import React, { forwardRef } from 'react';

const { Option } = Select;

const FormSelect = (props = {}, ref) => {
  const { options = [], ...reset } = props;
  return (
    <Select
      {...reset}
      ref={ref}
    >
      {options.map(val => (
        <Option key={val.value} value={val.value}>
          {val.text}
        </Option>
      ))}
    </Select>
  )
}
export default forwardRef(FormSelect);
