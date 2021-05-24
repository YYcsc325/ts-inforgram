import { getProjectList, IProjectListItem } from "@/service/library";
import { Reducer } from "umi";

const initialState = {
  projectList: <IProjectListItem[]>[],
};

type initialStateTypeOf = typeof initialState;

type ILibraryModel = {
  namespace: string;
  state: initialStateTypeOf;
  effects: {
    fetchProjectList: Reducer<any>;
  };
  reducers: {
    updateState: Reducer<any>;
    clearState: Reducer<any>;
  };
};

const libraryModel: ILibraryModel = {
  namespace: "library",
  state: initialState,
  effects: {
    *fetchProjectList({ payload }, { call, put }) {
      let response = [];
      try {
        response = yield call(getProjectList, { ...payload });
      } catch (err) {
        throw err;
      }
      yield put({
        type: "updateState",
        updatePath: "projectList",
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

export default libraryModel;
