import { getQueryUserData } from "@/service/user";
import { Model } from "dva";

const userModel: Model = {
  namespace: "user",
  state: {},
  effects: {
    *fetchUserList({ payload }, { call, put, select }) {
      let response = [];
      try {
        response = yield call(getQueryUserData, { ...payload });
      } catch (err) {
        throw err;
      }
      yield put({
        type: "updateIn",
        payload: response.result,
      });
      return response;
    },
  },
  reducers: {
    updateIn(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearState() {
      return {};
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
