import React, { FC, useState, useEffect } from 'react';
import styles from './index.less';
import ColorGroup from './components/ColorGroup';
import { Popover } from 'antd';
interface IBrandsetsProps {
  [x: string]: any;
}

const ColorModifier: FC<IBrandsetsProps> = ({ consumer }) => {
  const [isShowCom, setIsShowCom] = useState(false);
  const [color, setColor] = useState({});
  useEffect(() => {
    setColor({
      background: '#ccc',
    });
  }, []);

  const show = () => {
    setIsShowCom(true);
  };

  const hidden = () => {
    setIsShowCom(false);
  };

  const handleVisibleChange = (visible) => {
    setIsShowCom(visible);
  };

  const selectColor = (data) => {
    setColor({ background: `#${data}` });
  };

  return (
    <div className={styles['colorModifierBox']}>
      <Popover
        className={styles['colorModifierPopover']}
        content={<ColorGroup hiddenFunc={hidden} selectColor={selectColor} />}
        placement="leftTop"
        trigger="click"
        visible={isShowCom}
        onVisibleChange={handleVisibleChange}
      >
        <div
          className={styles['colorModifierBox-content']}
          onClick={show}
          style={color}
        />
      </Popover>
    </div>
  );
};

export default ColorModifier;
