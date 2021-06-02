import { connect, Dispatch } from "umi";
import { get } from "lodash";
import { IEditContentParams } from "@/service/edit";

const queryEditContentDaraSource = (payload: any) => ({
  type: "edit/fetchEditContentDataSource",
  payload,
});

const mapStateToProps = ({ edit }: any) => {
  return {
    editContentDataSource: get(edit, ["editContentDataSource"], []),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    /** 获取edit中的初始数据 */
    dispatchEditContentDataSource({ id }: IEditContentParams) {
      return dispatch(queryEditContentDaraSource({ id }));
    },
  };
};

export type IConnectProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps);
