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
import { Input, Select } from "antd";
import RadioGroups from "./index.tsx";

const Render = () => {
  return (
    <div style={{ width: "200px", height: "50px" }}>
      <RadioGroups onChange={this.handleChange} defaultValue="a">
        <RadioGroups.Item label="不限" value="a" />
        <RadioGroups.Item label="测试数据1" value="b">
          <Input style={{ width: 300, marginTop: 10 }} placeholder="请输入" />
        </RadioGroups.Item>
        <RadioGroups.Item label="测试数据2" value="c">
          <Select style={{ width: 300, marginTop: 10 }} placeholder="请选择">
            <Select.Option value="1">选择数据1</Select.Option>
          </Select>
        </RadioGroups.Item>
      </RadioGroups>
    </div>
  );
};
```
