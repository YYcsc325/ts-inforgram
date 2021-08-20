import { IDvaModel } from "@/models/modelsPublicInterface";

import libraryModel from "@/models/library";
import editModel from "@/models/edit";

/** 获取model的申明 */
export type DelareState<M extends IDvaModel = IDvaModel> = M["state"];

export type AppStore = {
  library: LibraryState;
  edit: EditState;
};

/** 用户的state */
export type LibraryState = DelareState<typeof libraryModel>;
export type EditState = DelareState<typeof editModel>;

export type LoadingState = {
  effects: any;
};
