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
import CardTabs from "./index.tsx";

const CardTabs = () => {
  return (
    <CardTabs onChange={() => {}} defaultValue="1">
      <CardTabs title="测试数据1" value="1" />
      <CardTabs title="测试数据2" value="2" />
    </CardTabs>
  );
};
```
