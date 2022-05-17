import { IEditContentResponse } from "@/service/edit";

/** page页数 */
export const PAGE_TYPE = {
  /** 增加page页 */
  ADD: "ADD_PAGE",
  /** 修改page页 */
  MODIFY: "MODIFY_PAGE",
  /** 删除page页 */
  DELETE: "DELETE_PAGE",
  /** 增加page页下children元素 */
  ADD_CHILDREN: "ADD_CHILDREN_BOX",
  /** 删除page页下的children元素 */
  DELETE_CHILDREN: "DELETE_CHILDREN_BOX",
};

/** page下的box数量 */
export const BOX_TYPE = {
  /** 增加box */
  ADD: "ADD_BOX",
  /** 修改box */
  MODIFY: "MODIFY_BOX",
  /** 删除box */
  DELETE: "DELETE_BOX",
};

const initEditorState = {
  loading: <boolean>false,
  checkedId: <string | number>"",
  modifyId: <string | number>"",
  pages: <any>{},
  pageBoxs: <any>{},
  editContentDataSource: <IEditContentResponse>[],
};

export type IinitEditorState = typeof initEditorState;
export default initEditorState;
