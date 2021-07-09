import React, { FC, useEffect } from "react";

import { editContextConsumer } from "../context";
import styles from "./index.less";

interface IEditDataProps {
  editConsumer?: any;
  checkedId: string;
}

const EditData: FC<IEditDataProps> = (props) => {
  const { checkedId } = props;
  const { boxsData } = props.editConsumer;
  const data = boxsData[checkedId] || {};

  const listenMouseDown = (e: any) => {
    console.log(e.target, "e");
  };

  useEffect(() => {
    document.addEventListener("mousedown", listenMouseDown);
    return () => {
      document.removeEventListener("mousedown", listenMouseDown);
    };
  }, []);

  return (
    <div className={styles["editData"]}>
      <div>
        <span>选中了</span>
        <span>{checkedId}</span>
      </div>
      <div>
        <span>宽度</span>
        <span>{data.width}px</span>
      </div>
      <div>
        <span>高度</span>
        <span>{data.height}px</span>
      </div>
      <div>
        <span>距离左边</span>
        <span>{data.left}px</span>
      </div>
      <div>
        <span>距离上面</span>
        <span>{data.top}px</span>
      </div>
    </div>
  );
};

export default editContextConsumer(EditData) as typeof EditData;
