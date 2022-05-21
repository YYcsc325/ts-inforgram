import React from "react";
import Cookies from "js-cookie";
import { stringify } from "qs";
import { history, useRequest } from "umi";
import ACTION_TYPE from "@/consts/actionType";
import { getQueryUserData } from "@/service/user";

import initUserState, { IinitUserState } from "./state";

// 在model层直接这样定义，会报错
// const initState = {
//   userinfo: <IUserResponse>{},
// };

const reducer = (
  state: IinitUserState,
  { type, payload }: { type?: keyof typeof ACTION_TYPE; payload?: any }
): IinitUserState => {
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
  const [store, dispatchStore] = React.useReducer(reducer, initUserState);

  const { loading: userLoading, run: fetchUserData } = useRequest(
    getQueryUserData,
    {
      manual: true,
      formatResult: (res) => res,
      onSuccess: ([result]) => {
        if (result) {
          Cookies.set("userLogin", stringify(result), {
            expires: 1,
          });
          history.push("/library");
        }
      },
    }
  );

  const actions = {
    initStore: () => {
      dispatchStore({ payload: initUserState });
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

    fetchUserData,
  };

  const loading = userLoading;

  return [{ ...store, loading }, actions] as [typeof store, typeof actions];
}
