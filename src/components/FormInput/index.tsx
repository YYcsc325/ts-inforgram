import { Input } from "antd";
import React from "react";

const FormInput = (props = {}) => {
  console.log(props, "props");
  return <Input {...props} />;
};
export default FormInput;
