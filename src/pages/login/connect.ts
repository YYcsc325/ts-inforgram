import { connect, Dispatch } from "umi";
import { get } from "lodash";
import { IRequestUserParams } from "@/service/user";
import { AppStore } from "@/store";
import { userActions } from "@/models/user";

// 这里的any类型其实就是每个model的state类型
const mapStateToProps = ({ loading, user }: AppStore) => {
  return {
    userinfo: get(user, ["userinfo"], {}),
    userinfoloading: get(loading, ["effects", "user/fetchUserList"], false),
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatchLogin(params: IRequestUserParams) {
      return dispatch(userActions.fetchUserList(params));
    },
  };
};

export type IConnectProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps);
