import { connect, Dispatch } from "umi";
import { IEditContentParams } from "@/service/edit";
import { editActions } from "@/models/edit";
import type { AppStore } from "@/store";

const mapStateToProps = ({ edit }: AppStore) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatchEditContentDataSource({ id }: IEditContentParams) {
      return dispatch(editActions.fetchEditContentDataSource({ id }));
    },
  };
};

export type IConnectProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps);
