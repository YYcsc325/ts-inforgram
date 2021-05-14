import React, { Component } from "react";
import { createPrefixClass } from "@/util/utils";
import { Spin } from "antd";

import LeftComponent from "./components/LeftSilder";
import RightComponent from "./components/RightSilder";
import styles from "./index.less";
import { IConnectProps } from "./connect";

const prefixCls = createPrefixClass("login", styles);
class Index extends Component<IConnectProps> {
  render() {
    const { userinfoloading = false } = this.props;

    return (
      <div className={prefixCls()}>
        <Spin spinning={userinfoloading} tip={"Loading..."}>
          <LeftComponent />
          <RightComponent />
        </Spin>
      </div>
    );
  }
}

export default Index;
