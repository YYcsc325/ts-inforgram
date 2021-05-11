---
order: CENSHICHAO
title:
  zh-CN: 基础样例
  en-US: Basic Usage
---

Simplest of usage.

```jsx
import React, { useState } from "react";
import FormDatePicker from "./index.tsx";

const Render = () => {
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  return (
    <>
      <FormDatePicker type="datePicker" onChange={onChange} picker="week" />
      <FormDatePicker type="weekPicker" onChange={onChange} picker="week" />
      <FormDatePicker type="rangePicker" onChange={onChange} picker="week" />
      <FormDatePicker type="monthPicker" onChange={onChange} picker="week" />
    </>
  );
};
```

---

title: FormDatePicker
subtitle: 时间选择器

## API

### FormDatePicker

参数依照 antd 的 DatePicker https://ant.design/components/date-picker-cn/
