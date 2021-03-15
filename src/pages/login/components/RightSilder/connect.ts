import { connect } from "dva";
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
const mapDispatchToProps = (dispatch) => {
  return {
    login({ email, passWord }: IUserProps) {
      return dispatch(loginAction({ payload: { email, passWord } }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
