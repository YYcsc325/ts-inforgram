/**
 * @name 配置层
 */
import { Input } from "antd";

import connect from "./connect";

const list = [
  { label: "产品ID", rules: [{ required: true, message: "必填" }] },
];

export const defaultConfig = [
  {
    type: "Input",
    connect,
    isShow: () => {
      return true;
    },
    formItemProps: {
      name: "input",
      label: "测试input框",
      rules: [{ required: true, message: "请输入" }],
      initialValue: ({ initialValueInput }) => initialValueInput,
    },
    itemProps: {
      onChange: (e, props) => {
        console.log(e.target.value, "value");
        console.log(props, "props");
      },
      placeholder: "请输入",
      style: {
        width: 500,
      },
    },
  },
  {
    connect,
    isShow: () => {
      return true;
    },
    formItemProps: {
      name: "input",
      label: "自定义",
    },
    component: ({ form }) => {
      return <div>自定义</div>;
    },
  },
  {
    type: "Input",
    connect,
    isShow: (form) => {
      if (form.getFieldValue("input") === 1) {
        return true;
      }
    },
    formItemProps: {
      name: "input1",
      label: "测试input框",
      rules: [{ required: true, message: "请输入" }],
      initialValue: ({ initialValue = "" }) => initialValue,
    },
    itemProps: {
      onChange: (e, props) => {
        console.log(e.target.value, "value");
        console.log(props, "props");
      },
      placeholder: "请输入",
      style: {
        width: 500,
      },
    },
    component: (props) => <Input {...props} />,
  },
];
