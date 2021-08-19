declare module "*.less";
declare module "*.png";
declare module "*.svg";

// 别名
// declare module '@aa/lodash' {
//   export * from 'lodash';
// }

// 全局模块定义
declare interface Window {
  Tracert: {
    click(spmId: string, options: Object): void;
  };
}

// 全局模块定义
declare interface Window {}

type nameSpace = string;

type state<T = any> = T;

type effects<T = any> = T;

type reducers<T = any> = T;

type subscriptions<T = any> = T;
declare interface Model<T> {
  namespace: nameSpace;
  state?: state;
  effects: effects;
  reducers: reducers;
  subscriptions: subscriptions;
}

declare var $: () => {};
