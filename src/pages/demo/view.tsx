import React, { useState } from "react";
import { Form, Button } from "antd";
import { CustomModal, FormView } from "@/components";
import { defaultConfig } from "./defaultConfig";

const Index = (props = {}) => {
  const [form] = Form.useForm();
  const [initialValueInput] = useState("1234");

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values, "values");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const openModal = () => {
    const modal = CustomModal.showModal({
      footer: null,
      onCancel: () => {
        modal.destroy();
      },
      onOk: () => {
        modal.destroy();
      },
      children: (
        <div>
          <div>奥术大师多</div>
          <div>按时肯定会啊</div>
        </div>
      ),
    });
  };
  return (
    <div>
      <FormView
        form={form}
        config={defaultConfig}
        formProps={{
          layout: "horizontal",
        }}
        stateProps={{
          onChangeState: () => {},
          initialValueInput,
        }}
      />
      <Button
        onClick={() => {
          handleSubmit();
        }}
      >
        点击提交
      </Button>
      <Button
        onClick={() => {
          openModal();
        }}
      >
        点击打开模态框
      </Button>
    </div>
  );
};

export default Index;
