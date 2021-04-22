import { set } from "lodash";
import { Checkbox } from "antd";
import { createPrefixClass } from "@/util/utils";
import React, { useState, useMemo, useCallback } from "react";
import Drag from "@/pages/library/components/drag/index";
import {
  UserOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  CopyOutlined,
  IdcardOutlined,
  DeleteOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";

import styles from "./Container.less";
import RotateBox from "./components/rotateBox";
import Disgraceful from "./components/Disgraceful";

const prefixCls = createPrefixClass("right-silder", styles);

const selectConfigure = [
  {
    id: "1",
    name: "Infographics",
    width: 70,
    height: 100,
    backgroundColor: "rgb(125, 109, 189)",
    icon: <ContainerOutlined />,
  },
  {
    id: "2",
    name: "Reports",
    width: 80,
    height: 100,
    backgroundColor: "rgb(113, 154, 186)",
    icon: <DatabaseOutlined />,
  },
  {
    id: "3",
    name: "Slides",
    width: 100,
    height: 70,
    backgroundColor: "rgb(183, 110, 164)",
    icon: <FundProjectionScreenOutlined />,
  },
  {
    id: "4",
    name: "Dashboards",
    width: 100,
    height: 70,
    backgroundColor: "rgb(133, 188, 153)",
    icon: <DesktopOutlined />,
  },
  {
    id: "5",
    name: "Social media",
    width: 100,
    height: 80,
    backgroundColor: "rgb(77, 100, 165)",
    icon: <IdcardOutlined />,
  },
  {
    id: "6",
    name: "Posters",
    width: 80,
    height: 100,
    backgroundColor: "rgb(156, 206, 238)",
    icon: <CopyOutlined />,
  },
  {
    id: "7",
    name: "Social media",
    boxStyle: {
      padding: "0 20px",
      borderLeft: "2px solid #aaa",
      borderRight: "2px solid #aaa",
    },
    width: 70,
    height: 80,
    backgroundColor: "rgb(77, 50, 135)",
    icon: <IdcardOutlined />,
  },
];

const Container = () => {
  const [dataList, setDataList] = useState([
    {
      id: "1",
      checked: false,
      url:
        "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
    },
    {
      id: "2",
      checked: false,
      url:
        "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
    },
  ]);

  const checkedList = useMemo(() => {
    return dataList.filter((item) => item.checked).map((item) => item.id);
  }, [dataList]);

  const indeterminate = useMemo(() => {
    return !!checkedList.length && checkedList.length < dataList.length;
  }, [dataList, checkedList]);

  const checkAll = useMemo(() => {
    if (dataList.length) return checkedList.length === dataList.length;
    return false;
  }, [dataList, checkedList]);

  const handleDelete = useCallback(() => {
    const filterData = dataList.filter(
      (item) => !checkedList.includes(item.id)
    );
    setDataList(filterData);
  }, [dataList, checkedList]);

  return (
    <div className={prefixCls()}>
      <div className={prefixCls("header")}>
        <div className={prefixCls("intro")}>
          <div className={prefixCls("title")}>
            <div className={prefixCls("l-title")}>
              <div>
                <AppstoreOutlined />
                <span style={{ marginLeft: "15px" }}>All projects</span>
              </div>
              <div style={{ fontSize: "12px" }}>1 project</div>
            </div>
            <div className={prefixCls("r-title")}>
              <UserOutlined />
            </div>
          </div>
          <div className={prefixCls("select")}>
            {selectConfigure.map(
              ({
                id,
                width,
                height,
                name,
                backgroundColor,
                icon,
                boxStyle = {},
              }) => (
                <RotateBox
                  className={prefixCls("rotate-box")}
                  name={name}
                  style={boxStyle}
                  key={id}
                >
                  <RotateBox.Template
                    className={prefixCls("rotate-template")}
                    backgroundColor={backgroundColor}
                    width={width}
                    height={height}
                  >
                    <RotateBox.Icon backgroundColor={backgroundColor}>
                      {icon}
                    </RotateBox.Icon>
                  </RotateBox.Template>
                </RotateBox>
              )
            )}
          </div>
        </div>
        <div className={prefixCls("odps")}>
          <div className={prefixCls("odps-left")}>
            <Checkbox
              indeterminate={indeterminate}
              style={{ marginBottom: "4px" }}
              checked={checkAll}
              onChange={(e) =>
                setDataList([
                  ...dataList.map((item) => ({
                    ...item,
                    checked: e.target.checked,
                  })),
                ])
              }
            />
            {!checkedList.length ? (
              <span className={prefixCls("odps-select")}>Select all</span>
            ) : (
              <span className={prefixCls("odps-delete")} onClick={handleDelete}>
                <DeleteOutlined style={{ fontSize: "18px" }} />
              </span>
            )}
          </div>
          <div></div>
        </div>
      </div>
      <div className={prefixCls("content")}>
        {dataList.map(({ checked, url, id }) => (
          <Disgraceful
            url={url}
            key={id}
            checked={checked}
            onCheck={(checked) => {
              const item = dataList.find((item) => item.id === id);
              const index = dataList.findIndex((item) => item.id === id);
              setDataList([
                ...set(dataList, [index], {
                  ...item,
                  checked: checked,
                }),
              ]);
            }}
            className={prefixCls("content-item")}
          />
        ))}
      </div>
    </div>
  );
};

export default Container;
