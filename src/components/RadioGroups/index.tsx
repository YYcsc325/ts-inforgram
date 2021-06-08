import React, { FC, useState, useMemo } from "react";
import { Radio } from "antd";

interface IRadioGroupProps {
  defaultValue?: string;
  value?: string;
  onChange?: (params: any) => void;
}

const RadioGroups: FC<IRadioGroupProps> & {
  Item: FC<IRadioGroupItemProps>;
} = ({ children, onChange, defaultValue, value }) => {
  const [privateValue, setPrivateValue] = useState(defaultValue || value);

  const handleChange = (e: any) => {
    const val = e.target.value;
    setPrivateValue(val);
    onChange?.(val);
  };

  const childList: any = useMemo(() => {
    return React.Children.toArray(children);
  }, [children]);

  const renderChildrenItem = useMemo(() => {
    return childList.find((item: any) => item?.props?.value === privateValue)
      ?.props?.children;
  }, [childList, privateValue]);

  return (
    <div>
      <div>
        <Radio.Group onChange={handleChange} value={privateValue}>
          {childList.map((child: any) => React.cloneElement(child))}
        </Radio.Group>
      </div>
      <div>{renderChildrenItem}</div>
    </div>
  );
};

interface IRadioGroupItemProps {
  label: React.ReactNode;
  value: string;
}

const RadioGroupItem: FC<IRadioGroupItemProps> = ({ label, value }) => {
  return <Radio.Button value={value}>{label}</Radio.Button>;
};

RadioGroups.Item = RadioGroupItem;
RadioGroups.displayName = "RadioGroups";
RadioGroupItem.displayName = "RadioGroupItem";
export default RadioGroups;
