import request from "@/util/request";
import { PREFIX } from "@/consts";

export interface IProjectListParams {}

export type IProjectListItem = {
  id: string;
  checked: boolean;
  name: string;
  data: string;
  url: string;
};

export type IProjectListResponse = IProjectListItem[];

export async function getProjectList(
  params: IProjectListParams
): Promise<IProjectListResponse> {
  return request(`${PREFIX}/inforgram/projectList.json`, { params });
}
