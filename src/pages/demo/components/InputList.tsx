import React, { useState } from 'react';
import { Form, Input } from 'antd';
let uid = 1;
const CustomInput = ({
  inputKey,
  onAddClick,
  onDeleteClick,
  deleteShow,
  addShow,
  ...reset
}) => {
  return (
    <>
      <Input {...reset} style={{ width: 300 }} />
      {true && (
        <span
          onClick={() => {
            onAddClick();
          }}
          style={{ cursor: 'pointer', marginRight: '10px' }}
        >
          添加
        </span>
      )}
      {true && (
        <span
          onClick={() => {
            onDeleteClick(inputKey);
          }}
          style={{ cursor: 'pointer', marginRight: '10px' }}
        >
          删除
        </span>
      )}
    </>
  );
};

const InputList = ({ options = [], fatherKey, form, rules = [], ...reset }) => {
  const [list, setList] = useState(options);
  // 增加数据
  const addClick = () => {
    setList(
      list.concat([
        {
          key: `${fatherKey}.${uid++}`,
        },
      ]),
    );
  };
  // 删除数据
  const deleteClick = (key) => {
    console.log(key, 'key');
    setList(list.filter((item) => item.key !== key));
  };
  return (
    <Form form={form}>
      {list.map(({ key, label, rules }, index) => {
        console.log(key, 'key');
        return (
          <Form.Item name={key} label={label} rules={rules}>
            <CustomInput
              {...reset}
              inputKey={key}
              onAddClick={addClick}
              onDeleteClick={deleteClick}
              deleteShow={index !== list.length}
              addShow={index == list.length}
            />
          </Form.Item>
        );
      })}
    </Form>
  );
};
export default InputList;
