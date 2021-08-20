import { getProjectList, IProjectListResponse } from "@/service/library";

import type { io, ActionWithPayload } from "./modelsPublicInterface";
import { createActions } from "./index";

const libraryInitialState = {
  projectList: <IProjectListResponse>[],
};

type IlibraryInitialState = typeof libraryInitialState;

const libraryModel = {
  namespace: "library",
  state: libraryInitialState,
  effects: {
    *fetchProjectList({ payload }: ActionWithPayload, { call, put }: io): any {
      const response = yield call(getProjectList, payload);
      if (response)
        yield put(libraryActions.setState({ projectList: response.result }));
      return response;
    },
  },
  reducers: {
    setState(
      state: IlibraryInitialState,
      { payload }: ActionWithPayload<Partial<IlibraryInitialState>>
    ) {
      return { ...state, ...payload };
    },
    clearState() {
      return libraryInitialState;
    },
  },
};

export const libraryActions = createActions(libraryModel);

export default libraryModel;
