import { Radio } from 'antd';
import React, { forwardRef } from 'react';

const mapUi = {
  radio: Radio.Group,
  radioButton: (props) => {
    const { options = [], ...reset } = props;
    return (
      <Radio.Group {...reset}>
        {
          options.map(item => <Radio.Button value={item.value} disabled={item.disabled || false} key={item.value}>{item.label}</Radio.Button>)
        }
      </Radio.Group>
    )
  }
};

const FormRadio = (props = {}, ref) => {
  const { type, ...reset } = props;
  const Element = mapUi[type];
  if(!Element) console.warn(`type: ${ type }传入有误 -- 参考文档https://yuque.antfin.com/pbu5vq/dv6i3b/sioied#36mq0`)
  return (
    Element && <Element {...reset} />
  )
}
export default forwardRef(FormRadio);
