import React, { FC, useRef } from "react";
import { Layout } from "antd";
import Cookies from "js-cookie";
import { parse } from "qs";
import { Redirect, IRouteComponentProps } from "umi";
import { createPrefixClass } from "@/util/utils";

import ActionBar from "./ActionBar";
import { ContextProvider } from "./context";
import styles from "./index.less";

const prefixCls = createPrefixClass("layout", styles);

const BasicLayOut: FC<IRouteComponentProps> = ({ children }) => {
  if (!parse(Cookies.get("userLogin") as string)?.login) {
    return <Redirect to="/login" />;
  }
  return (
    <Layout className={prefixCls()}>
      <ContextProvider>
        <ActionBar />
        {children}
      </ContextProvider>
    </Layout>
  );
};

export default BasicLayOut;
