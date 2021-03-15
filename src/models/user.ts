import { postQueryUserData, getQueryUserData } from '@/service/user';
import createActions, { Model } from 'dva';

const userModel: Model = {
  namespace: 'user',
  state: {},
  effects: {
    *fetchUserList({ payload }, { call, put }) {
      let response = [];
      try {
        response = yield call(getQueryUserData, { ...payload });
      } catch(err) {
          throw err;
      }
      yield put({
        type: 'updateIn',
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
    setup({ dispatch, history }) {},
  },
};

export const userEffectActions = userModel.effects;
export const userReducerActions = userModel.reducers;
export default userModel;
