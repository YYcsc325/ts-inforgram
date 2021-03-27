import { connect } from "dva";

const mapStateToProps = (state, props) => {
  return {
    initialValue: "",
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    handleValue(values) {
      console.log(values);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
