import React, { FC, useRef } from "react";
import { Layout } from "antd";
import Cookies from "js-cookie";
import { parse } from "qs";
import { Redirect } from "umi";

import { createPrefixClass } from "@/util/utils";

import ActionBar from "./ActionBar";
import { ContextProvider } from "./context";
import styles from "./index.less";

const prefixCls = createPrefixClass("layout", styles);

interface PageProps {}

const BasicLayOut: FC<PageProps> = ({ children }) => {
  const actionBarRef = useRef<any>(null);

  /** 是否展开用户信息 */
  const handleShowShrinkageChange = (check: boolean) => {
    actionBarRef?.current?.handleChangeShrinkage(check);
  };

  if (!parse(Cookies.get("userLogin") as string)?.login) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout className={prefixCls()}>
      <ContextProvider value={{ handleShowShrinkageChange }}>
        <ActionBar ref={actionBarRef} />
        {children}
      </ContextProvider>
    </Layout>
  );
};

export default BasicLayOut;
