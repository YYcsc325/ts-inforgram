import React, { FC, useEffect, useState } from "react";
import { Layout } from "antd";
import { IRouteComponentProps } from "umi";

import { ContextProvider } from "./context";

interface PageProps extends IRouteComponentProps {}

const BasicLayOut: FC<PageProps> = ({
  children,
  location,
  ...reset
}: IRouteComponentProps) => {
  const [value] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      <ContextProvider value={{ value }}>{children}</ContextProvider>
    </Layout>
  );
};

export default BasicLayOut;
