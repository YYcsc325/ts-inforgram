import request from "@/util/request";
import { PREFIX } from "@/consts";

export interface IUserProps {
  email: string;
  passWord: string;
}

export interface IUserResponse {
  email: string;
  code: string;
}

export async function getQueryUserData(
  params: IUserProps
): Promise<IUserResponse> {
  return request(`${PREFIX}/inforgram/user.json`, { ...params });
}
export async function postQueryUserData({ ...params }): Promise<IUserResponse> {
  return request(`${PREFIX}/inforgram/user.json`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
