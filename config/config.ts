import { defineConfig } from "umi";
import routes from "./routes";
import path from "path";
// import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin';
const target = "http://localhost:8000";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
  },
  base: "/docs/",
  publicPath: "/static/",
  hash: true,
  history: {
    type: "hash",
  },
  alias: {
    "~": path.resolve(__dirname, "..", "src"),
  },
  // proxy: {
  //   "/ad/portal": { target },
  //   "/cms/repos": { target },
  // },
  // chainWebpack(chain) {
  //   chain.plugin('sensitive').use(CaseSensitivePathsWebpackPlugin, []);
  // },
  locale: {
    default: "zh-CN",
  },
  // ctoken: true,
  title: "inforgram",
  favicon: "https://cdn.jifo.co/favicon/favicon-32x32.png",
  metas: [{ name: "description", content: "Welcome come to inforgram" }],
  routes,
});
