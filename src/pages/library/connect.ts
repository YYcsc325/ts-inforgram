import { connect, Dispatch } from "umi";

// 这里的any类型其实就是每个model的state类型
const mapStateToProps = ({ loading, user }: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export type IConnectProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps);
