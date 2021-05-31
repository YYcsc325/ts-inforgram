import { ComponentType, Children, ReactElement, ReactNode } from "react";
import { notification } from "antd";
import { ArgsProps } from "antd/lib/notification/index";
import classNames from "classnames";

export const noSpace: any[] = [
  {
    validator(rule = [], value: any, callback: Function) {
      if (value && value.indexOf(" ") !== -1) {
        callback("输入不得包含空格，请重新输入");
        return;
      }
      callback();
    },
    message: "输入不得包含空格，请重新输入",
  },
];

export function openNotification(props: ArgsProps) {
  const { type, message, description } = props;
  if (!type) return;
  notification[type]({
    message,
    description,
  });
}

export function loadImg(url: string, callback: Function) {
  var img = new Image();
  img.src = url;
  img.onload = () => {
    callback?.();
  };
}

export function processingObj(item: any = {}, todo: string, injectProps: any) {
  const newItem = { ...item };
  for (const key in item) {
    if (
      isFunction(item[key]) &&
      Object.prototype.hasOwnProperty.call(item, key)
    ) {
      if (todo === "calling") {
        newItem[key] = item?.[key]?.call(null, injectProps);
      } else if (todo === "bindding") {
        newItem[key] = item?.[key]?.bind(null, injectProps);
      } else {
        newItem[key] = item[key];
      }
    }
  }
  return newItem;
}

/**
 * @name 监听页面切换
 */
export function addPageListener(cb: () => any) {
  document.addEventListener("visibilitychange", cb);
}
/**
 * @name 移除去除监听页面切换
 */
export function removePageListener(cb: () => any) {
  document.addEventListener("visibilitychange", cb);
}

export function getDisplayName(component: ComponentType<any>) {
  if (!component) return "Unknow";
  return component.displayName || component.name || "Unknown";
}

export function findChild<P = any>(
  children: ReactNode | undefined,
  component: ComponentType<P>
) {
  return Children.toArray(children).find(
    (child: any) => child.type === component
  ) as ReactElement<P>;
}

export function filterChildren<P = any>(
  children: ReactNode | undefined,
  component: ComponentType<P>
) {
  return Children.toArray(children).filter(
    (child: any) => child.type === component
  ) as Array<ReactElement<P>>;
}

export function createPrefixClass(namespace: string, styles: any) {
  if (!namespace) throw new Error("命名空间为必须传递参数");

  return (...args: string[]) => {
    const classes = args.map(
      (name) => styles[`dt-${namespace}${name ? `-${name}` : ""}`]
    );
    if (classes.length) return classNames(classes);

    return styles[`dt-${namespace}`];
  };
}

/** 递归重写数据 */
/** 还存在问题是children的类型如何定义 */

type IListItemProps<T = any> = {
  [P in keyof T]: T[P];
};

export function recursiveLoop<T = any>(
  list: Array<IListItemProps<T>> = [],
  callBack: (val: IListItemProps<T>) => IListItemProps<T>
) {
  if (!isFunction(callBack)) return list;
  return list.map((item: any) => {
    const result = { ...item, ...callBack({ ...item }) };
    if (item?.children?.length) {
      result.children = recursiveLoop(item?.children, callBack);
    }
    return result;
  });
}

export const isArray =
  Array.isArray ||
  function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

export function isPlainObject(obj: any) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function isString(str: any) {
  return Object.prototype.toString.call(str) === "[object String]";
}

export function isPromise(e: any) {
  return e instanceof Promise;
}

export function isFunction(func: any) {
  return Object.prototype.toString.call(func) === "[object Function]";
}

export function isEmptyObject(obj: any) {
  if (!isPlainObject(obj)) {
    return false;
  }
  return !Object.keys(obj).length;
}

export function isParseJSON(str: string) {
  try {
    return !!JSON.parse(str);
  } catch (e) {
    return false;
  }
}

export function isUndefined(o: any) {
  if (!arguments.length) return false;
  return typeof o === "undefined";
}

export function isNull(o: any) {
  return o === null;
}
/** 计算字符串长度，包括英文跟中文字符 */
export function getBLen(str: any) {
  if (str == null) return 0;
  if (typeof str !== "string") {
    str += "";
  }
  return str.replace(/[^\x00-\xff]/g, "01").length;
}

/** 是否展示省略号 */
export function ellipsis(str: string, num: number = 10) {
  if (getBLen(str) > num) return str.slice(0, 8) + "...";
  return str;
}

/** 判断是不是整数 */
export function isInteger(num: number) {
  return num % 1 === 0;
}
