import request from "@/util/request";
import { objToQs } from "@/util/utils";

let localHost = "http://localhost:3000";

export interface IUserProps {
  email: string;
  passWord: string;
}

export async function getQueryUserData(params: IUserProps) {
  return request(`${localHost}/inforgram/user?${objToQs(params)}`, {
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
