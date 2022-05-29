import React from "react";
import ACTION_TYPE from "@/consts/actionType";
import { useRequest } from "umi";
import { normalizePagesData } from "@/pages/editor/utils";
import { assign, omit, set, filter } from "lodash";
import { getEditContentDataSource } from "@/service/edit";
import initEditorState, { IinitEditorState } from "./state";

const reducer = (
  state: IinitEditorState,
  { type, payload }: { type?: keyof typeof ACTION_TYPE; payload?: any }
): IinitEditorState => {
  switch (type) {
    case ACTION_TYPE.SET_SINGLE_KEY:
      return { ...state, [payload.key]: payload.value };
    case ACTION_TYPE.SET_MULTI_KEY:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};

export default function useEditorModel() {
  const [store, dispatchStore] = React.useReducer(reducer, initEditorState);

  const { loading: editDataLoading, run: fetchEditData } = useRequest(
    getEditContentDataSource,
    {
      manual: true,
      formatResult: (response) => {
        const [result] = response;
        const normalize = normalizePagesData(result || []);
        actions.updateMultiKeyStore({
          pages: normalize?.pages,
          pageBoxs: normalize?.boxs,
        });
        return response;
      },
    }
  );

  const actions = {
    initStore: () => {
      dispatchStore({ payload: initEditorState });
    },

    updateSingleKeyStore: (key: string, value: any) => {
      dispatchStore({
        type: ACTION_TYPE.SET_SINGLE_KEY,
        payload: { key, value },
      });
    },

    updateMultiKeyStore: (value: any) => {
      dispatchStore({ type: ACTION_TYPE.SET_MULTI_KEY, payload: value });
    },

    /** 添加page页 */
    addPage: (pageId: string | number, pageData: any) => {
      actions.updateSingleKeyStore("pages", {
        ...store.pages,
        [pageId]: pageData,
      });
    },

    /** 修改page页 */
    modifyPage: (pageId: string | number, pageData: any) => {
      actions.updateSingleKeyStore("pages", {
        ...store.pages,
        [pageId]: assign(store.pages[pageId], pageData),
      });
    },

    /** 删除page页 */
    deletePage: (pageId: string | number) => {
      actions.updateSingleKeyStore("pages", omit(store.pages, [pageId]));
    },

    /** 添加page子集 */
    addPageChild: (pageId: string | number, boxId: string | number) => {
      const pageChildren = store.pages[pageId]?.children || [];
      const newPages = set(
        store.pages,
        [pageId, "children"],
        [...pageChildren, boxId]
      );
      actions.updateSingleKeyStore("pages", newPages);
    },

    /** 删除page子集 */
    deletePageChild: (pageId: string | number, boxId: string | number) => {
      const pageChildren = store.pages[pageId]?.children || [];
      const newPageChildren = filter(pageChildren, (key) => key !== boxId);
      const newPages = set(store.pages, [pageId, "children"], newPageChildren);
      actions.updateSingleKeyStore("pages", newPages);
    },

    /** 添加page下的element */
    addPageBox: (boxId: string | number, boxData: any) => {
      actions.updateSingleKeyStore(
        "pageBoxs",
        set(store.pageBoxs, [boxId], boxData)
      );
    },

    /** 修改page下的element */
    modifyPageBox: (boxId: string | number, boxData: any) => {
      actions.updateSingleKeyStore(
        "pageBoxs",
        set(store.pageBoxs, [boxId], { ...store.pageBoxs[boxId], ...boxData })
      );
    },

    /** 删除page下的element */
    deletePageBox: (boxId: string | number) => {
      actions.updateSingleKeyStore("pageBoxs", omit(store.pageBoxs, [boxId]));
    },

    /** 设置选中的id */
    updateCheckedId: (checkedId: string | number) => {
      actions.updateSingleKeyStore("checkedId", checkedId);
    },

    /** 设置在修改的id */
    updateModifyId: (modifyId: string | number) => {
      actions.updateSingleKeyStore("modifyId", modifyId);
    },

    fetchEditData,
  };

  const loading = editDataLoading;

  return [{ ...store, loading }, actions] as [typeof store, typeof actions];
}
