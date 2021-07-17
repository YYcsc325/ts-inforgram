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

  const handleVisibleChange = (visible: boolean) => {
    setIsShowCom(visible);
  };

  const popoverData = {
    hiddenFunc: handleVisibleChange,
    value,
    onChange,
  };

  return (
    <Popover
      overlayClassName={styles["colorModifierBox"]}
      content={<ColorGroup {...popoverData} />}
      placement="leftTop"
      trigger="click"
      visible={isShowCom}
      onVisibleChange={handleVisibleChange}
    >
      <span
        className={styles["colorModifierBox-content"]}
        style={{ background: value }}
      />
    </Popover>
  );
};

export default ColorModifier;
