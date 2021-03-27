import React, { Component } from "react";
import Spins from "@/components/Spin";
import { createPrefixClass } from "@/util/utils";

import LeftComponent from "./components/LeftSilder";
import RightComponent from "./components/RightSilder";
import styles from "./index.less";

const prefixCls = createPrefixClass("login", styles);

class Index extends Component<any> {
  render() {
    const { loginLoading = false, history } = this.props;
    return (
      <div className={prefixCls()}>
        <Spins spinning={loginLoading} />
        <LeftComponent />
        <RightComponent history={history} />
      </div>
    );
  }
}

export default Index;
