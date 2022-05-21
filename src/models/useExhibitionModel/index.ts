import React from "react";
import ACTION_TYPE from "@/consts/actionType";
import { getProjectList } from "@/service/library";

import initExhibitionState, { IinitExhibitionState } from "./state";

const reducer = (
  state: IinitExhibitionState,
  { type, payload }: { type?: keyof typeof ACTION_TYPE; payload?: any }
): IinitExhibitionState => {
  switch (type) {
    case ACTION_TYPE.SET_SINGLE_KEY:
      return { ...state, [payload.key]: payload.value };
    case ACTION_TYPE.SET_MULTI_KEY:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};

export default function useExhibitionModel() {
  const [store, dispatchStore] = React.useReducer(reducer, initExhibitionState);

  const actions = {
    initStore: () => {
      dispatchStore({ payload: initExhibitionState });
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

    fetchProjectList: async () => {
      actions.updateSingleKeyStore("loading", true);
      const [resResult, res] = await getProjectList();
      if (resResult) {
        actions.updateSingleKeyStore("projectList", resResult);
      }
      actions.updateSingleKeyStore("loading", false);
      return res;
    },
  };

  return [store, actions] as [typeof store, typeof actions];
}
