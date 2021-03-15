import { InputNumber } from 'antd';
import React, { forwardRef } from 'react';

const FormInputNumber = (props = {}, ref) => {
  return (
    <InputNumber
      {...props}
      ref={ref}
    />
  )
}
export default forwardRef(FormInputNumber);
