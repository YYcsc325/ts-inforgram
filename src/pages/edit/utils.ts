import { normalize, denormalize, schema } from "normalizr";
import { Map } from "immutable";

/** 序列化pagesData */
export function normalizePagesData(data: any[] = []) {
  const boxs = new schema.Entity("boxs");
  const pages = new schema.Entity("pages", { children: [boxs] });
  const result = normalize(data, [pages]).entities;
  return Map(result);
}

/** 反序列化pagesData */
export function denormalizePagesData(normalizedData: any) {
  const boxs = new schema.Entity("boxs");
  const pages = new schema.Entity("pages", { children: [boxs] });

  return denormalize(normalizedData.result, [pages], normalizedData.entities);
}

/** 向上递归查找节点 */
export function getParentNode(node: any, callback: (params: any) => any): any {
  if (callback(node)) {
    return callback(node);
  } else {
    return getParentNode(node?.parentNode, callback);
  }
}
