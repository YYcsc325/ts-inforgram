import React from "react";
import { Spin } from "antd";
import { useModel } from "umi";
import { createPrefixClass } from "@/util/utils";

import LeftComponent from "./components/LeftSilder";
import RightComponent from "./components/RightSilder";
import styles from "./index.less";

const prefixCls = createPrefixClass("login", styles);

const Login = () => {
  const [userStore] = useModel("useUserModel.index");
  return (
    <div className={prefixCls()}>
      <Spin spinning={userStore.loading} tip={"Loading..."}>
        <LeftComponent />
        <RightComponent />
      </Spin>
    </div>
  );
};

export default Login;
