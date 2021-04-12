import React from "react";
import { Checkbox } from "antd";
import Drag from "@/pages/library/components/drag/index";
import { createPrefixClass } from "@/util/utils";
import {
  UserOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  CopyOutlined,
  IdcardOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import RotateBox from "./components/rotateBox";
import styles from "./index.less";

const prefixCls = createPrefixClass("right-silder", styles);

const selectConfigure = [
  {
    name: "Infographics",
    width: 70,
    height: 100,
    backgroundColor: "rgb(125, 109, 189)",
    icon: <ContainerOutlined />,
  },
  {
    name: "Reports",
    width: 80,
    height: 100,
    backgroundColor: "rgb(113, 154, 186)",
    icon: <DatabaseOutlined />,
  },
  {
    name: "Slides",
    width: 100,
    height: 70,
    backgroundColor: "rgb(183, 110, 164)",
    icon: <FundProjectionScreenOutlined />,
  },
  {
    name: "Dashboards",
    width: 100,
    height: 70,
    backgroundColor: "rgb(133, 188, 153)",
    icon: <DesktopOutlined />,
  },
  {
    name: "Social media",
    width: 100,
    height: 80,
    backgroundColor: "rgb(77, 100, 165)",
    icon: <IdcardOutlined />,
  },
  {
    name: "Posters",
    width: 80,
    height: 100,
    backgroundColor: "rgb(156, 206, 238)",
    icon: <CopyOutlined />,
  },
  {
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

const RightSilder = () => {
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
          <div>
            <Checkbox />
            <span
              style={{ fontSize: "15px", color: "#fff", marginLeft: "10px" }}
            >
              Select all
            </span>
          </div>
          <div></div>
        </div>
      </div>
      <div className={prefixCls("content")}></div>
    </div>
  );
};

export default RightSilder;
