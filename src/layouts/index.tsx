import React, { FC, useEffect, useRef } from "react";
import { Layout } from "antd";
import { IRouteComponentProps } from "umi";
import ActionBar from "@/components/ActionBar";
import { createPrefixClass } from "@/util/utils";

import { ContextProvider } from "./context";
import styles from "./index.less";

const prefixCls = createPrefixClass("layout", styles);

interface PageProps extends IRouteComponentProps {}

const BasicLayOut: FC<PageProps> = ({
  children,
  location,
}: IRouteComponentProps) => {
  const actionBarRef = useRef<any>(null);

  /** 是否展开用户信息 */
  const handleShowShrinkageChange = (check: boolean) => {
    actionBarRef?.current?.handleChangeShrinkage(check);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
