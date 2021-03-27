import React, { FC, useEffect } from "react";
import { Layout } from "antd";
import { IRouteComponentProps } from "umi";

import LayoutContext from "./context";

interface PageProps extends IRouteComponentProps {}

const BasicLayOut: FC<PageProps> = ({
  children,
  location,
  ...reset
}: IRouteComponentProps) => {
  const [value] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      <LayoutContext.Provider value={{ value }}>
        {children}
      </LayoutContext.Provider>
    </Layout>
  );
};

export default BasicLayOut;
