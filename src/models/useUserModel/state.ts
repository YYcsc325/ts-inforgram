import { IUserResponse } from "@/service/user";

const initUserState = {
  loading: <boolean>false,
  userinfo: <IUserResponse>{},
};

export type IinitUserState = typeof initUserState;
export default initUserState;
