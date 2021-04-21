import React from "react";
import { createPrefixClass } from "@/util/utils";

import ActionBar from "@/components/ActionBar";
import Container from "./Container";
import styles from "./index.less";

const prefixCls = createPrefixClass("library", styles);

const Library = () => {
  return (
    <div className={prefixCls()}>
      <ActionBar />
      <Container />
    </div>
  );
};

export default Library;
