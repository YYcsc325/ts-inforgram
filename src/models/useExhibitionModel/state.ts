import { IProjectListResponse } from "@/service/library";

const initExhibitionState = {
  loading: <boolean>false,
  projectList: <IProjectListResponse>[],
};

export type IinitExhibitionState = typeof initExhibitionState;
export default initExhibitionState;
