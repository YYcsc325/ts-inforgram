import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { StaticModal, FormView } from '@/components';
import { defaultConfig } from './defaultConfig';

const Index = (props = {}) => {
  const [form] = Form.useForm();
  const [initialValueInput] = useState('1234');

  const handleSubmit = () => {
    console.log(form, 'form');
    form
      .validateFields()
      .then((values) => {
        console.log(values, 'values');
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  };

  const openModal = () => {
    const modal = StaticModal.showModal({
      destroy: () => {
        modal.destroy();
      },
    });
  };
  return (
    <div>
      <FormView
        form={form}
        config={defaultConfig}
        formProps={{
          layout: 'horizontal',
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
