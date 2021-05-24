import request from "@/util/request";
import { PREFIX } from "@/consts";

export interface IProjectListProps {}

export type IProjectListItem = {
  id: string;
  checked: boolean;
  name: string;
  data: string;
  url: string;
};

export async function getProjectList(
  params: IProjectListProps
): Promise<IProjectListItem[]> {
  return request(`${PREFIX}/inforgram/projectList.json`, { params });
}
