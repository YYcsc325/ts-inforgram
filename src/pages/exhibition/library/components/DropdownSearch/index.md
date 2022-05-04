---
order: CENSHICHAO
title:
  zh-CN: 基础样例
  en-US: Basic Usage
---

Simplest of usage.

```jsx
import DropdownSearch from "./index.tsx";

const Render = () => {
  return (
    <DropdownSearch
      placeholder="请输入"
      onSearch={(val) => val}
      onChange={(val) => val}
    >
      <DropdownSearch.Option
        id="1"
        url="http://aaa.com"
        name="第一条数据"
        date="第一条数据日期"
        onChange={(id) => id}
      />
      <DropdownSearch.Option
        id="2"
        url="http://bbb.com"
        name="第二条数据"
        date="第二条数据日期"
        onChange={(id) => id}
      />
      <DropdownSearch.Option
        id="3"
        url="http://ccc.com"
        name="第三条数据"
        date="第三条数据日期"
        onChange={(id) => id}
      />
    </DropdownSearch>
  );
};
```

---

title: DropdownSearch
subtitle: 下拉搜索

---

一个可搜索下拉特定样式的搜索框 `search`。

## API

### DropdownSearch

| 参数        | 说明           | 类型                     | 默认值     |
| ----------- | -------------- | ------------------------ | ---------- |
| placeholder | 选择框默认文本 | React.ReactNode          | -          |
| onSearch    | 搜索触发       | (e.target.value) => void | () => void |
| onChange    | 选择下来值触发 | (id) => void             | () => void |

### DropdownSearch.Option

| 参数     | 说明           | 类型            | 默认值     |
| -------- | -------------- | --------------- | ---------- |
| id       | 唯一性         | string          | -          |
| url      | 图片地址       | string          | -          |
| name     | 开头显示的文案 | React.ReactNode | -          |
| date     | 最后显示的日期 | React.ReactNode | -          |
| onChange | 事件触发回调   | (id) => void    | () => void |
