import request from "@/util/request";
import { PREFIX } from "@/consts";

export interface IEditContentItem {
  id: string;
  type: string;
  defaultPostion?: { left: number; top: number };
  url?: string;
  scale?: boolean;
}

export type IEditContentResponse = Array<IEditContentItem>;

export type IEditContentParams = { id: string };

export async function getEditContentDataSource(
  params: IEditContentParams
): Promise<[IEditContentResponse, ResponseWarp<IEditContentResponse>]> {
  return request(`${PREFIX}/inforgram/editContentDataSource.json`, { params });
}
