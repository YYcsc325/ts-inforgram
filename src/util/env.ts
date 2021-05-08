const { host } = window.location;
/**
 *  @description dev | local 开发环境; test 测试环境; pre 预发环境；
 */
type EnvType = "dev" | "local" | "test" | "pre";

let env: EnvType = "dev";
if (host.indexOf("locahost") >= 0) {
  env = "local";
}
if (host.indexOf("test.localhost.net") >= 0) {
  env = "test";
}
if (host.indexOf("baidu.com") >= 0) {
  env = "pre";
}
export const getEnv = () => env;
