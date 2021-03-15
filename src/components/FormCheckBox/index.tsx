import { Checkbox } from 'antd';
import React, { forwardRef } from 'react';

const CheckboxGroup = Checkbox.Group;

const FormCheckbox = (props = {}, ref: any) => {
  return (
    <CheckboxGroup {...props} ref={ref}/>
  )
}
export default forwardRef(FormCheckbox);
