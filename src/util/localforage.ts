import localforage from "localforage";

// 建立一个WebSQL-Inforgram-page的仓库第一张表
const page = localforage.createInstance({
  name: "WebSQL-Inforgram-page",
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE], // 可以调整优先级，不配置默认就是这个配置
  storeName: "Edit-Data",
  description: "编辑持久化数据",
  version: 1,
});
// 建立一个WebSQL-Inforgram-page的仓库第二张表
const page2 = localforage.createInstance({
  name: "WebSQL-Inforgram-page",
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE], // 可以调整优先级，不配置默认就是这个配置
  storeName: "Edit-Data2",
  description: "编辑持久化数据",
  version: 2,
});

/** 建多个仓库只需要把storeName去掉 */

page.getItem("name").then((value) => {
  console.log("name", value);
});
page2.setItem("name", "jim").then(() => {
  console.log("名字设置成功");

  page.getItem("name").then((value) => {
    console.log("name", value);
  });
});
