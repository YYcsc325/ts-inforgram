import { getQueryUserData, IUserResponse } from "@/service/user";

import type { io, ActionWithPayload } from "./index";
import { createActions } from "./index";

const userInitialState = {
  userinfo: <IUserResponse>{},
};

type IUserInitialState = typeof userInitialState;

const userModel = {
  namespace: "user",
  state: userInitialState,
  effects: {
    *fetchUserList({ payload }: ActionWithPayload, { call, put, select }: io) {
      const response = yield call(getQueryUserData, payload);
      if (response)
        userActions.setState({
          userinfo: { ...response.result, code: response.code },
        });
      return response;
    },
  },
  reducers: {
    setState(
      state: IUserInitialState,
      { payload }: ActionWithPayload<Partial<IUserInitialState>>
    ) {
      return { ...state, ...payload };
    },
    clearState() {
      return userInitialState;
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     // 这里是监听路由变化
  //     history.listen((location) => {});
  //   },
  // },
};

export const userActions = createActions(userModel);

export default userModel;
