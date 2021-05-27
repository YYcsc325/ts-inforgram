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
import Ellipsis from "./index.tsx";

const Render = () => {
  return (
    <div style={{ width: "200px", height: "50px" }}>
      <Ellipsis
        text="这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据"
        isShowTips={true}
        lineClamps={3}
      ></Ellipsis>
    </div>
  );
};
```
