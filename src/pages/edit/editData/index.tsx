import React, { FC, useEffect } from "react";
import { Divider } from "antd";

import LabelInput from "../components/LabelInput";
import { editContextConsumer } from "../context";
import styles from "./index.less";

interface IEditDataProps {
  editConsumer?: any;
  checkedId: string;
}

const EditData: FC<IEditDataProps> = (props) => {
  const { checkedId } = props;
  const { boxsData, handleModifyBox } = props.editConsumer;
  const data = boxsData[checkedId] || {};

  const listenMouseDown = (e: any) => {
    // console.log(e.target, "e");
  };

  useEffect(() => {
    document.addEventListener("mousedown", listenMouseDown);
    return () => {
      document.removeEventListener("mousedown", listenMouseDown);
    };
  }, []);

  return (
    <div className={styles["edit-data"]}>
      <div>
        <span>选中了</span>
        <span>{checkedId}</span>
      </div>
      <div className={styles["edit-data-add"]}>
        <LabelInput
          label="width: (px)"
          value={data.width}
          styleOne
          onChange={(value) =>
            handleModifyBox(checkedId, { width: Number(value) })
          }
        />
        <Divider type="vertical" />
        <LabelInput
          label="height: (px)"
          value={data.height}
          styleOne
          onChange={(value) =>
            handleModifyBox(checkedId, { height: Number(value) })
          }
        />
      </div>
      <div className={styles["edit-data-add"]}>
        <LabelInput
          label="left: (px)"
          value={data.left}
          styleOne
          onChange={(value) =>
            handleModifyBox(checkedId, { left: Number(value) })
          }
        />
        <Divider type="vertical" />
        <LabelInput
          label="top: (px)"
          value={data.top}
          styleOne
          onChange={(value) =>
            handleModifyBox(checkedId, { top: Number(value) })
          }
        />
      </div>
    </div>
  );
};

export default editContextConsumer(EditData) as typeof EditData;
