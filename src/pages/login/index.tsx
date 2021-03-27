import React, { Component } from "react";
import Spins from "@/components/Spin";

import LeftComponent from "./components/LeftSilder";
import RightComponent from "./components/RightSilder";
import styles from "./index.less";

class Index extends Component<any> {
  render() {
    const { loginLoading = false } = this.props;
    return (
      <div className={styles["signup-form-container"]}>
        <Spins spinning={loginLoading} />
        <LeftComponent />
        <RightComponent history={this.props.history} />
      </div>
    );
  }
}

export default Index;
