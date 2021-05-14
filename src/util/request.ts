import { isPlainObject } from "@/util/utils";
import { stringify } from "qs";
import { request } from "umi";

// 是否json转换
function parseJSON(response: any) {
  return response.json();
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

  if (newOptions.method === "GET" && isPlainObject(newOptions.params)) {
    realURL +=
      (realURL.includes("?") ? "" : "?") + stringify(newOptions.params);
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
  return (
    request(realURL, newOptions)
      .then((res: any) => {
        if (
          options.isNeedQue &&
          lastRequestTime[url.split("?")[0] + newOptions.method] > currentTime
        ) {
          throw Error("错误了");
        }

        return res;
      })
      // .then(parseJSON)
      .then((data: any) => data)
      .catch((err: any) => err)
  );
}
