import React, { FC, useEffect } from "react";
import { createPrefixClass } from "@/util/utils";
import { contextConsumer } from "@/layouts/context";

import Container from "./Container";
import { IConnectProps } from "./connect";
import styles from "./index.less";

const prefixCls = createPrefixClass("library", styles);

interface ILibraryProps extends IConnectProps {
  [x: string]: any;
}

const Library: FC<ILibraryProps> = ({ consumer, dispatchProjectList }) => {
  useEffect(() => {
    consumer?.handleShowShrinkageChange(true);
    dispatchProjectList();
  }, []);

  return (
    <div className={prefixCls()}>
      <Container />
    </div>
  );
};

export default contextConsumer(Library);
