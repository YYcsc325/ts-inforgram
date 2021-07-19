import React, { FC } from "react";
import { Divider } from "antd";
import { ColorModifier } from "@/components";

import LabelInput from "../components/LabelInput";
import { boxChangeType } from "../utils";
import { editContextConsumer } from "../context";
import styles from "./index.less";
interface IEditDataProps {
  editConsumer?: any;
}

const EditData: FC<IEditDataProps> = (props) => {
  const {
    boxsData,
    pagesData,
    handleBoxChange,
    handleModifyPageStyle,
    checkedId,
  } = props.editConsumer;

  const allData = { ...pagesData, ...boxsData };
  const renderData = allData[checkedId] || {};

  const renderPageComponent = (data: any) => {
    return (
      <div className={styles["edit-data-add"]}>
        <LabelInput
          styleOne
          label="height: (px)"
          value={data.height}
          onChange={(value) =>
            handleModifyPageStyle(checkedId, { height: Number(value) })
          }
        />
        <LabelInput label="background: (fill)">
          <ColorModifier
            value={data.backgroundColor}
            onChange={(val) => {
              handleModifyPageStyle(checkedId, { backgroundColor: val });
            }}
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
            onChange={(value) =>
              handleBoxChange(boxChangeType.MODIFY_STYLE)(checkedId, {
                width: Number(value),
              })
            }
          />
          <Divider type="vertical" />
          <LabelInput
            label="height: (px)"
            value={renderData.height}
            styleOne
            onChange={(value) =>
              handleBoxChange(boxChangeType.MODIFY_STYLE)(checkedId, {
                height: Number(value),
              })
            }
          />
        </div>
        <div className={styles["edit-data-add"]}>
          <LabelInput
            label="left: (px)"
            value={renderData.left}
            styleOne
            onChange={(value) =>
              handleBoxChange(boxChangeType.MODIFY_STYLE)(checkedId, {
                left: Number(value),
              })
            }
          />
          <Divider type="vertical" />
          <LabelInput
            label="top: (px)"
            value={renderData.top}
            styleOne
            onChange={(value) =>
              handleBoxChange(boxChangeType.MODIFY_STYLE)(checkedId, {
                top: Number(value),
              })
            }
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
