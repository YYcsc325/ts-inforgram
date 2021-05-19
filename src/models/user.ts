import { getQueryUserData, IUserResponse } from "@/service/user";
import { Reducer } from "umi";

const initialState = {
  userinfo: <IUserResponse>{},
};

type initialStateTypeOf = typeof initialState;

type IUserModel = {
  namespace: string;
  state: initialStateTypeOf;
  effects: {
    fetchUserList: Reducer<any>;
  };
  reducers: {
    updateState: Reducer<any>;
    clearState: Reducer<any>;
  };
  subscriptions: {
    setup: Reducer<any>;
  };
};

const userModel: IUserModel = {
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
    updateState(state, { payload, updatePath }: any) {
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
