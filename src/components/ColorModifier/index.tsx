import React, { FC, useState } from "react";
import styles from "./index.less";
import ColorGroup from "./components/ColorGroup";
import { Popover } from "antd";

interface ColorModifierProps {
  [x: string]: any;
  value: string;
  onChange: (value: string) => void;
}

const ColorModifier: FC<ColorModifierProps> = ({ value, onChange }) => {
  const [isShowCom, setIsShowCom] = useState(false);

  const show = () => {
    setIsShowCom(true);
  };

  const hidden = () => {
    setIsShowCom(false);
  };

  const handleVisibleChange = (visible: boolean) => {
    setIsShowCom(visible);
  };

  const popoverData = {
    hiddenFunc: hidden,
    value,
    onChange,
  };
  console.log(isShowCom, "isShowCom");
  return (
    <Popover
      overlayClassName={styles["colorModifierBox"]}
      content={<ColorGroup {...popoverData} />}
      placement="leftTop"
      trigger="click"
      visible={isShowCom}
      onVisibleChange={handleVisibleChange}
    >
      <div
        className={styles["colorModifierBox-content"]}
        onClick={show}
        style={{ background: value }}
      />
    </Popover>
  );
};

export default ColorModifier;
