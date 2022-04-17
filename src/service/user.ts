import request from "@/util/request";
import { PREFIX } from "@/consts";

export interface IRequestUserParams {
  email: string;
  passWord: string;
}

export interface IUserResponse {
  email: string;
  code: string;
}

export async function getQueryUserData(
  params: IRequestUserParams
): Promise<IUserResponse> {
  return request(`${PREFIX}/inforgram/userLogin.json`, { params });
}

export async function postQueryUserData(
  data: IRequestUserParams
): Promise<IUserResponse> {
  return request(`${PREFIX}/inforgram/user.json`, {
    method: "POST",
    data,
  });
}
