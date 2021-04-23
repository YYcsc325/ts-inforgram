import { connect, Dispatch } from "umi";
import { get } from "lodash";
import { IUserProps } from "@/service/user";

const loginAction = ({ payload }: any) => ({
  type: "user/fetchUserList",
  payload,
});

const mapStateToProps = ({ adloading }: any) => {
  return {
    loginLoading: get(adloading, ["user", "inforgram", "user"], false),
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatchLogin({ email, passWord }: IUserProps) {
      return dispatch(loginAction({ payload: { email, passWord } }));
    },
  };
};

export type ILoginMapProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps);
