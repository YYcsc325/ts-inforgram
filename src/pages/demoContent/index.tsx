import React, { useState } from "react";
import { IRouteComponentProps, Link } from "umi";
import styles from "./index.less";
import ContentVisualization from './components/ContentVisualization';
import DataVisualization from './components/DataVisualization';
const Demo = ({ children, ...reset }: IRouteComponentProps) => {

  return (
    <div className={styles['demo']}>
      123
      <ContentVisualization />
      <DataVisualization dataList={['1', '2']} />
    </div>
  );
};

export default Demo;
