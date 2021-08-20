import { getEditContentDataSource, IEditContentResponse } from "@/service/edit";

import type { io, ActionWithPayload } from "./modelsPublicInterface";
import { createActions } from "./index";

const editInitialState = {
  editContentDataSource: <IEditContentResponse>[],
};

type IEditInitialState = typeof editInitialState;

const editModel = {
  namespace: "edit",
  state: editInitialState,
  effects: {
    *fetchEditContentDataSource(
      { payload }: ActionWithPayload,
      { call, put }: io
    ): any {
      const response = yield call(getEditContentDataSource, { ...payload });
      if (response)
        yield put(
          editActions.setState({ editContentDataSource: response.result })
        );
      return response;
    },
  },
  reducers: {
    setState(
      state: IEditInitialState,
      { payload }: ActionWithPayload<Partial<IEditInitialState>>
    ) {
      return { ...state, ...payload };
    },
    clearState() {
      return editInitialState;
    },
  },
};

export const editActions = createActions(editModel);

export default editModel;
