import { connect, Dispatch } from "umi";
import { get } from "lodash";
import { IUserProps } from "@/service/user";

const loginAction = ({ payload }: any) => ({
  type: "user/fetchUserList",
  payload,
});

// 这里的any类型其实就是每个model的state类型
const mapStateToProps = ({ loading, user }: any) => {
  return {
    userinfo: get(user, ["userinfo"], {}),
    userinfoloading: get(loading, ["effects", "user/fetchUserList"], false),
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatchLogin({ email, passWord }: IUserProps) {
      return dispatch(loginAction({ payload: { email, passWord } }));
    },
  };
};

export type IConnectProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps);
