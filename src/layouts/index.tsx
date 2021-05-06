import React, { FC, useEffect, useRef } from "react";
import { Layout } from "antd";
import ActionBar from "./ActionBar";
import { createPrefixClass } from "@/util/utils";

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
