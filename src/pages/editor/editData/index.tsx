import React, { FC } from "react";
import { Divider } from "antd";
import { useModel } from "umi";
import { ColorModifier } from "react-dtcomponents";

import LabelInput from "../components/LabelInput";
import { editContextConsumer } from "../context";
import styles from "./index.less";

interface IEditDataProps {
  editConsumer?: any;
}

const EditData: FC<IEditDataProps> = (props) => {
  const [editorStore, editorActions] = useModel("useEditorModel.index");
  const { checkedId } = editorStore;

  const allData = { ...editorStore.pages, ...editorStore.pageBoxs };
  const renderData = allData[checkedId] || {};

  // page修改统一处理
  const handlePageModify = (data: any) => {
    editorActions.modifyPage(checkedId, data);
  };

  // box修改统一处理
  const handleBoxModify = (data: any) => {
    editorActions.modifyPageBox(checkedId, data);
  };

  const renderPageComponent = (data: any) => {
    return (
      <div className={styles["edit-data-add"]}>
        <LabelInput
          styleOne
          label="height: (px)"
          value={data.height}
          onChange={(value) => handlePageModify({ height: Number(value) })}
        />
        <LabelInput label="background: (fill)">
          <ColorModifier
            value={data.backgroundColor}
            onChange={(val) => handlePageModify({ backgroundColor: val })}
          />
        </LabelInput>
      </div>
    );
  };

  const renderBoxComponent = (data: any) => {
    return (
      <div>
        <div className={styles["edit-data-add"]}>
          <LabelInput
            label="width: (px)"
            value={renderData.width}
            styleOne
            onChange={(value) => handleBoxModify({ width: Number(value) })}
          />
          <Divider type="vertical" />
          <LabelInput
            label="height: (px)"
            value={renderData.height}
            styleOne
            onChange={(value) => handleBoxModify({ height: Number(value) })}
          />
        </div>
        <div className={styles["edit-data-add"]}>
          <LabelInput
            label="left: (px)"
            value={renderData.left}
            styleOne
            onChange={(value) => handleBoxModify({ left: Number(value) })}
          />
          <Divider type="vertical" />
          <LabelInput
            label="top: (px)"
            value={renderData.top}
            styleOne
            onChange={(value) => handleBoxModify({ top: Number(value) })}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles["edit-data"]}>
      <div>
        <span>选中了</span>
        <span>{checkedId}</span>
        {renderData.name === "page" && renderPageComponent(renderData)}
        {renderData.name === "box" && renderBoxComponent(renderData)}
      </div>
    </div>
  );
};

export default editContextConsumer(EditData) as typeof EditData;
