import { Switch } from 'antd';
import React, { forwardRef } from 'react';

const FormSwitch = (props = {}, ref) => {
  const { value, ...reset } = props;
  return (
    <Switch 
      { ...reset }
      ref={ref}
    />
  )
}
export default forwardRef(FormSwitch);
