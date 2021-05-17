import { Radio } from "antd";
import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { RadioGroupProps } from "antd/lib/radio/interface";

const mapUi: {
  radio: React.FC<RadioGroupProps>;
  radioButton: React.FC<{
    options?: Array<{
      value: any;
      disabled?: boolean;
      label: React.ReactNode;
      [x: string]: any;
    }>;
  }>;
} = {
  radio: Radio.Group,
  radioButton: (props) => {
    const { options = [], ...reset } = props;
    return (
      <Radio.Group {...reset}>
        {options.map((item) => (
          <Radio.Button
            value={item?.value}
            disabled={item?.disabled || false}
            key={item?.value}
          >
            {item.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    );
  },
};

export interface IFormRadioProps {
  type: keyof typeof mapUi;
}

const FormRadio: ForwardRefRenderFunction<any, IFormRadioProps> = (
  props,
  ref
) => {
  const { type, ...reset } = props;
  const Element = mapUi[type];

  if (!Element) {
    console.warn(`type: ${type}传入有误`);
    return null;
  }

  return <Element {...reset} />;
};
export default forwardRef(FormRadio);
