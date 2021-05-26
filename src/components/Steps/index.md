---
order: CENSHICHAO
title:
  zh-CN: 基础样例
  en-US: Basic Usage
---

Simplest of usage.

### 用法一： 组件调用

```jsx
import React from "react";
import Steps from "./index.tsx";

const Render = () => {
  return (
    <Steps current={1}>
      <Steps.Step title="测试数据1" />
      <Steps.Step title="测试数据2" />
      <Steps.Step title="测试数据3" />
    </Steps>
  );
};
```
