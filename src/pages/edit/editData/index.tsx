import React, { FC } from "react";
import { Divider } from "antd";
import { ColorModifier } from "@/components";

import LabelInput from "../components/LabelInput";
import { editContextConsumer } from "../context";
import styles from "./index.less";
interface IEditDataProps {
  editConsumer?: any;
}

const EditData: FC<IEditDataProps> = (props) => {
  const { boxsData, pagesData, handleModifyBox, handleModifyPage, checkedId } =
    props.editConsumer;

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
            handleModifyPage(checkedId, { height: Number(value) })
          }
        />
        <ColorModifier
          value={data.backgroundColor}
          onChange={(val) => {
            handleModifyPage(checkedId, { backgroundColor: val });
          }}
        />
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
              handleModifyBox(checkedId, { width: Number(value) })
            }
          />
          <Divider type="vertical" />
          <LabelInput
            label="height: (px)"
            value={renderData.height}
            styleOne
            onChange={(value) =>
              handleModifyBox(checkedId, { height: Number(value) })
            }
          />
        </div>
        <div className={styles["edit-data-add"]}>
          <LabelInput
            label="left: (px)"
            value={renderData.left}
            styleOne
            onChange={(value) =>
              handleModifyBox(checkedId, { left: Number(value) })
            }
          />
          <Divider type="vertical" />
          <LabelInput
            label="top: (px)"
            value={renderData.top}
            styleOne
            onChange={(value) =>
              handleModifyBox(checkedId, { top: Number(value) })
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
