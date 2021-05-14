import { connect, Dispatch } from "umi";

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export type IConnectProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps);
