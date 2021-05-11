---
order: CENSHICHAO
title:
  zh-CN: 基础样例
  en-US: Basic Usage
---

Simplest of usage.

```jsx
import LazyLoadingImg from "./index.tsx";

const Render = () => {
  return (
    <LazyLoadingImg url="http://xxx.jpg">
      <div>可自定义渲染</div>
    </LazyLoadingImg>
  );
};
```

---

title: LazyLoadingImg
subtitle: 懒加载图片

---

可懒加载 CDN 链接图片。

## API

### LazyLoadingImg

| 参数      | 说明                 | 类型    | 默认值 |
| --------- | -------------------- | ------- | ------ |
| url       | 需要懒加载的图片地址 | string  | -      |
| className | className 类名       | styring | -      |
