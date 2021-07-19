import { normalize, denormalize, schema } from "normalizr";
import { Map } from "immutable";

/** 序列化pagesData */
export function normalizePagesData(data: any[] = []) {
  const boxs = new schema.Entity("boxs");
  const pages = new schema.Entity("pages", { children: [boxs] });
  const result = normalize(data, [pages]).entities;
  return result;
  // return Map(result);
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
export const boxChangeType = {
  /** 添加盒子 */
  ADD: "ADD",
  /** 删除盒子 */
  DELETE: "DELETE",
  /** 修改盒子样式 */
  MODIFY_STYLE: "MODIFY_STYLE",
} as const;

export type IBoxChangeType = keyof typeof boxChangeType;
