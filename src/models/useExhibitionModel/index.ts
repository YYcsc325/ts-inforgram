import React from "react";
import ACTION_TYPE from "@/consts/actionType";
import { getProjectList } from "@/service/library";

import initExhibitionState, { IinitExhibitionState } from "./state";

const reducer = (
  state: IinitExhibitionState,
  { type, payload }: { type?: keyof typeof ACTION_TYPE; payload?: any }
): IinitExhibitionState => {
  switch (type) {
    case ACTION_TYPE.SET_MULTI_KEY:
      return { ...state, [payload.key]: payload.value };
    case ACTION_TYPE.SET_SINGLE_KEY:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};

export default function useExhibitionModel() {
  const [store, dispatchStore] = React.useReducer(reducer, initExhibitionState);

  const initStore = () => {
    dispatchStore({ payload: initExhibitionState });
  };

  const updateSingleKeyStore = (key: string, value: any) => {
    dispatchStore({
      type: ACTION_TYPE.SET_SINGLE_KEY,
      payload: { [key]: value },
    });
  };

  const updateMultiKeyStore = (value: any) => {
    dispatchStore({ type: ACTION_TYPE.SET_MULTI_KEY, payload: value });
  };

  const actions = {
    initStore,

    updateSingleKeyStore,

    updateMultiKeyStore,

    fetchProjectList: async () => {
      updateSingleKeyStore("loading", true);
      const [resResult, res] = await getProjectList();
      if (resResult) {
        updateSingleKeyStore("projectList", resResult);
      }
      updateSingleKeyStore("loading", false);
      return res;
    },
  };

  return [store, actions] as [typeof store, typeof actions];
}
