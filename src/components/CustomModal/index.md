---
order: CENSHICHAO
title:
  zh-CN: 基础样例
  en-US: Basic Usage
---

Simplest of usage.

### 用法一： 组件调用

```jsx
import React, { useState } from "react";
import CustomModal from "./index.tsx";
import { Button } from "antd";

const Render = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <div>
      <CustomModal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </CustomModal>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
    </div>
  );
};
```

### 用法二： api 式调用

```jsx
import React from "react";
import CustomModal from "./index.tsx";
import { Button } from "antd";

const Render = () => {
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
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
    </div>
  );
};
```

---

title: CustomModal
subtitle: CustomModal 可自定义 modal 框

## API

### FormCheckbox

参数依照 antd 的 Modal https://ant.design/components/modal-cn/
