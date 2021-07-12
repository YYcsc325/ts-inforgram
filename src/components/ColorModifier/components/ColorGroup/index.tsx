import React, { FC, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import styles from './index.less';
import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
interface IBrandsetsProps {
  [x: string]: any;
}

const colorList = [
  '8EC3A7',
  'DC5356',
  'F0CB69',
  '5FB7E5',
  'AB91C5',
  '6D53DC',
  'FD6A37',
  'E54D24',
  '000000',
  '4C4C4C',
  '999999',
  'E5E5E5',
  'FFFFFF',
];

const ColorGroup: FC<IBrandsetsProps> = ({ hiddenFunc, selectColor }) => {
  const [checkColor, setCheckColor] = useState();
  const [showMoreColorFlag, setShowMoreColorFlag] = useState(false);
  useEffect(() => {}, []);

  const chooseColor = (data) => {
    console.log(data, 'chooseColor');
    setCheckColor(data);
    selectColor(data);
  };

  return (
    <div className={styles['colorGroupBox']}>
      <div className={styles['colorGroupBox-close']}>
        <CloseOutlined
          onClick={() => {
            hiddenFunc(), setShowMoreColorFlag(false);
          }}
        />
      </div>
      <p className={styles['colorGroupBox-title']}>There color</p>
      <div className={styles['colorGroupBox-list']}>
        {colorList.map((item, index) => (
          <span
            key={index}
            style={
              checkColor === item
                ? { background: `#${item}`, borderColor: ' #fff' }
                : { background: `#${item}` }
            }
            onClick={() => chooseColor(item)}
          />
        ))}
      </div>
      <div className={styles['colorGroupBox-colors']}>
        <p className={styles['colorGroupBox-title']}>Custom color</p>
        <Input
          addonBefore="#"
          addonAfter={
            <div
              className={styles['colorGroupBox-icon']}
              onClick={() => setShowMoreColorFlag(!showMoreColorFlag)}
            />
          }
          value={checkColor}
        />
        {showMoreColorFlag && (
          <ChromePicker
            color={`#${checkColor}`}
            className={styles['colorGroupBox-chromePicker']}
            onChange={(hexColor) => {
              setCheckColor(hexColor.hex.split('#')[1]);
              selectColor(hexColor.hex.split('#')[1]);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ColorGroup;
