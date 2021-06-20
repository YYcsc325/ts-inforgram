import { Map } from "immutable";
/**
 * @name immutable是一种持久化数据。一旦被创建就不会被修改。修改immutable对象的时候返回新的immutable。但是原数据不会改变。
 * @desc 参考地址： https://blog.csdn.net/qq_42941302/article/details/111834035
 * @desc 官网地址： https://immutable-js.com/
 */
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set("b", 50);
map1.get("b") + " vs. " + map2.get("b"); // 2 vs. 50
