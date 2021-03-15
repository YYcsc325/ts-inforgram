// @ts-nocheck
import {
  createHashHistory,
  History,
} from "/Users/yycsc/Desktop/ts-inforgram/node_modules/_@umijs_runtime@3.4.2@@umijs/runtime";

let options = {
  basename: "/docs/",
};
if ((<any>window).routerBase) {
  options.basename = (<any>window).routerBase;
}

// remove initial history because of ssr
let history: History = process.env.__IS_SERVER
  ? null
  : createHashHistory(options);
export const createHistory = (hotReload = false) => {
  if (!hotReload) {
    history = createHashHistory(options);
  }

  return history;
};

export { history };
