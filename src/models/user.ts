import { getQueryUserData, IUserResponse } from "@/service/user";
import { Model } from "dva";

const initialState = {
  userinfo: <IUserResponse>{},
};

type initialStateTypeOf = typeof initialState;

const userModel: Model = {
  namespace: "user",
  state: initialState,
  effects: {
    *fetchUserList({ payload }, { call, put, select }) {
      let response = [];
      try {
        response = yield call(getQueryUserData, { ...payload });
      } catch (err) {
        throw err;
      }
      yield put({
        type: "updateState",
        updatePath: "userinfo",
        payload: { ...response.result, code: response.code },
      });
      return response;
    },
  },
  reducers: {
    updateState(state: initialStateTypeOf, { payload, updatePath }: any) {
      return { ...state, [updatePath]: { ...payload } };
    },
    clearState() {
      return initialState;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // 这里是监听路由变化
      history.listen((location) => {});
    },
  },
};

export default userModel;
