import React, { FC, useEffect } from "react";
import { createPrefixClass } from "@/util/utils";
import { contextConsumer } from "@/layouts/context";

import Container from "./Container";
import styles from "./index.less";

const prefixCls = createPrefixClass("library", styles);

interface ILibraryProps {
  [x: string]: any;
}

const Library: FC<ILibraryProps> = ({ consumer }) => {
  useEffect(() => {
    consumer?.handleShowShrinkageChange(true);
  }, []);

  return (
    <div className={prefixCls()}>
      <Container />
    </div>
  );
};

export default contextConsumer(Library);
