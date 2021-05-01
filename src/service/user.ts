import request from "@/util/request";
import { stringify, parse } from "query-string";

let localHost = "http://localhost:3000";

export interface IUserProps {
  email: string;
  passWord: string;
}

export async function getQueryUserData(params: IUserProps) {
  return request(`${localHost}/inforgram/user?${stringify(params)}`, {
    method: "GET",
  });
}
export async function postQueryUserData({ ...params }) {
  return request(`${localHost}/inforgram/user`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
