import { IDvaModel } from "@/models/index";

import libraryModel from "@/models/library";
import editModel from "@/models/edit";
import userModel from "@/models/user";

/** 获取model的申明 */
export type DelareState<M extends IDvaModel = IDvaModel> = M["state"];

export type AppStore = {
  user: UserState;
  library: LibraryState;
  edit: EditState;
  loading: LoadingState;
};

/** 用户的state */
export type LibraryState = DelareState<typeof libraryModel>;
export type EditState = DelareState<typeof editModel>;
export type UserState = DelareState<typeof userModel>;
export type LoadingState = { effects: any };
