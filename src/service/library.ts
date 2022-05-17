import request from "@/util/request";
import { PREFIX } from "@/consts";

export type IProjectListItem = {
  id: string;
  checked: boolean;
  name: string;
  date: string;
  url: string;
};

export type IProjectListResponse = IProjectListItem[];

export async function getProjectList(): Promise<
  [IProjectListResponse, ResponseWarp<IProjectListResponse>]
> {
  return request(`${PREFIX}/inforgram/library/list.json`, { params: {} });
}
