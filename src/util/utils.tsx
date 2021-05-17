import React, { ComponentType, Children, ReactElement, ReactNode } from "react";
import { message, notification } from "antd";
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

export function processingObj(item: any = {}, todo: string, injectProps: any) {
  const newItem = { ...item };
  for (const key in item) {
    if (isFunc(item[key]) && Object.prototype.hasOwnProperty.call(item, key)) {
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

export function isFunc(fn: Function) {
  if (typeof fn === "function") return true;
  return false;
}

// 获取local
export function getlocal(str: string) {
  try {
    if (window) {
      if (
        window.Storage &&
        window.localStorage &&
        window.localStorage instanceof Storage
      ) {
        const local_message =
          JSON.parse(window?.localStorage?.getItem?.(str) as string) || {};
        return local_message;
      }
    }
  } catch (err) {
    console.log(err, "err");
  }
}

//设置
export function setlocal(str: string, obj: any) {
  try {
    if (window) {
      if (
        window.Storage &&
        window.localStorage &&
        window.localStorage instanceof Storage
      ) {
        localStorage.setItem(str, JSON.stringify(obj));
      }
    }
  } catch (err) {
    console.log(err, "err");
  }
}

//删除
export function removelocal(str: string) {
  try {
    if (window) {
      if (
        window.Storage &&
        window.localStorage &&
        window.localStorage instanceof Storage
      ) {
        localStorage.removeItem(str);
      }
    }
  } catch (err) {
    console.log(err, "err");
  }
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

/** 递归插入数据 */
interface ITreeProps<T = any> {
  [x: string]: any;
  children: Array<T>;
}
export function recursionInsertData(
  list: Array<ITreeProps<any>> = [],
  callBack: (val: ITreeProps) => any
) {
  if (typeof callBack !== "function") return list;
  return list.map((item: ITreeProps<any>) => {
    const result = callBack({ ...item });
    if (item.children && item.children.length) {
      result.children = recursionInsertData(item.children, callBack);
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
