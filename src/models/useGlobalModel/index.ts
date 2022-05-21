import React from "react";
import ACTION_TYPE from "@/consts/actionType";

import initGlobalState, { IinitGlobalState } from "./state";

const reducer = (
  state: IinitGlobalState,
  { type, payload }: { type?: keyof typeof ACTION_TYPE; payload?: any }
): IinitGlobalState => {
  switch (type) {
    case ACTION_TYPE.SET_SINGLE_KEY:
      return { ...state, [payload.key]: payload.value };
    case ACTION_TYPE.SET_MULTI_KEY:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};

export default function useUserModel() {
  const [store, dispatchStore] = React.useReducer(reducer, initGlobalState);

  const actions = {
    initStore: () => {
      dispatchStore({ payload: initGlobalState });
    },

    updateSingleKeyStore: (key: string, value: any) => {
      console.log(key, value);
      dispatchStore({
        type: ACTION_TYPE.SET_SINGLE_KEY,
        payload: { key, value },
      });
    },

    updateMultiKeyStore: (value: any) => {
      dispatchStore({ type: ACTION_TYPE.SET_MULTI_KEY, payload: value });
    },

    changeShrinkage: async (bol: boolean) => {
      actions.updateSingleKeyStore("isShowShrinkage", bol);
    },
  };

  return [store, actions] as [typeof store, typeof actions];
}
