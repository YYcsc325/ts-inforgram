import React, { Component } from "react";
import DtSpin from "@/components/DtSpin";
import { createPrefixClass } from "@/util/utils";

import LeftComponent from "./components/LeftSilder";
import RightComponent from "./components/RightSilder";
import styles from "./index.less";

const prefixCls = createPrefixClass("login", styles);

class Index extends Component<any> {
  render() {
    const { userinfoloading = false, history } = this.props;

    return (
      <div className={prefixCls()}>
        <DtSpin spinning={userinfoloading}>
          <LeftComponent />
          <RightComponent history={history} />
        </DtSpin>
      </div>
    );
  }
}

export default Index;
