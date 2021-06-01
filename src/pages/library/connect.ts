import { connect, Dispatch } from "umi";
import { get } from "lodash";

const queryProjectList = (payload: any) => ({
  type: "library/fetchProjectList",
  payload,
});

const mapStateToProps = ({ library }: any) => {
  return {
    projectList: get(library, ["projectList"], []),
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    /** 获取library项目列表数据 */
    dispatchProjectList() {
      return dispatch(queryProjectList({}));
    },
  };
};

export type IConnectProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps);
