import { connect, Dispatch } from "umi";
import { get } from "lodash";
import { libraryActions } from "@/models/library";
import type { AppStore } from "@/store";

const mapStateToProps = ({ library }: AppStore) => {
  return {
    projectList: get(library, ["projectList"], []),
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatchProjectList() {
      return dispatch(libraryActions.fetchProjectList({}));
    },
  };
};

export type IConnectProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps);
