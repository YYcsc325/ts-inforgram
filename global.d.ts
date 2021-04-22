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

declare var $: () => {};
