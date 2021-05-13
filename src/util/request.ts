import { notification } from "antd";
import { isPlainObject } from "@/util/utils";
import { stringify } from "qs";
import { request } from "umi";

const codeMessage: any = {
  200: "服务器成功返回请求的数据",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据,的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器",
  502: "网关错误",
  503: "服务不可用，服务器暂时过载或维护",
  504: "网关超时",
};

function parseJSON(response: any) {
  // return response.json();
  return response;
}
export function checkStatus(response: any) {
  if (response.code >= 200 && response.code < 300) {
    return response;
  }
  const errortext: any = codeMessage[response.code] || response.msg;
  notification.error({
    message: `请求错误 ${response.code}: ${response.url}`,
    description: errortext,
  });
  const error: any = new Error(errortext);
  error.name = response.code;
  error.response = response;
  throw error;
}

const lastRequestTime: any = {};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function dtRequest(url: string, options: any) {
  const defaultOptions = {
    credentials: "include",
    timeout: 5 * 1000 * 60, // 请求2分钟后超时
  };

  let realURL = url;
  let newOptions: any = {
    ...defaultOptions,
    ...options,
    method: (options.method || "GET").toUpperCase(),
  };

  const currentTime = new Date().getTime();

  if (newOptions.postType === "form") {
    newOptions = {
      ...newOptions,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        ...newOptions.headers,
      },
      body: stringify(newOptions.body, { indices: false }),
    };
  }

  if (newOptions.method === "GET" && isPlainObject(newOptions.query)) {
    realURL =
      realURL +
      (realURL.includes("?") ? "" : "?") +
      stringify(newOptions.query);
  }

  if (newOptions.method === "POST" || newOptions.method === "PUT") {
    newOptions = {
      ...newOptions,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers,
      },
      body: JSON.stringify(newOptions.body),
    };
  }

  if (newOptions.isNeedQue) {
    lastRequestTime[url.split("?")[0] + newOptions.method] = currentTime;
  }
  return request(realURL, newOptions)
    .then((res: any) => {
      if (
        options.isNeedQue &&
        lastRequestTime[url.split("?")[0] + newOptions.method] > currentTime
      ) {
        throw Error("错误了");
      }

      return res;
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((data: any) => data)
    .catch((err: any) => err);
}
