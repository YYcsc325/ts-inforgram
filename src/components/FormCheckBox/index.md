---
order: CENSHICHAO
title:
  zh-CN: 基础样例
  en-US: Basic Usage
---

Simplest of usage.

```jsx
import React, { useState } from "react";
import FormCheckbox from "./index.tsx";

const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = ["Apple", "Orange"];

const Render = () => {
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);

  const handleChange = (list = []) => {
    setCheckedList(list);
  };
  return (
    <FormCheckbox
      options={plainOptions}
      value={checkedList}
      onChange={handleChange}
    />
  );
};
```

---

title: FormCheckbox
subtitle: Checkbox 多选

## API

### FormCheckbox

参数依照 antd 的 CheckboxGroup https://ant.design/components/checkbox-cn/
