import { getEditContentDataSource, IEditContentResponse } from "@/service/edit";
import { Reducer } from "umi";

const initialState = {
  editContentDataSource: <IEditContentResponse>[],
};

type initialStateTypeOf = typeof initialState;

type IEditModel = {
  namespace: string;
  state: initialStateTypeOf;
  effects: {
    fetchEditContentDataSource: Reducer<any>;
  };
  reducers: {
    updateState: Reducer<any>;
    clearState: Reducer<any>;
  };
};

const editModel: IEditModel = {
  namespace: "edit",
  state: initialState,
  effects: {
    *fetchEditContentDataSource({ payload }, { call, put }) {
      let response = [];
      try {
        response = yield call(getEditContentDataSource, { ...payload });
      } catch (err) {
        throw err;
      }
      yield put({
        type: "updateState",
        updatePath: "editContentDataSource",
        payload: response.result,
      });
      return response;
    },
  },
  reducers: {
    updateState(state, { payload, updatePath }: any) {
      return { ...state, [updatePath]: payload };
    },
    clearState() {
      return initialState;
    },
  },
};

export default editModel;
