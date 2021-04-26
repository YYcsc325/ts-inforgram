import React from "react";
import {
  CopyOutlined,
  IdcardOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  ContainerOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";

export const initailDataList = [
  {
    id: "1",
    checked: false,
    name: "info_one",
    date: "2021/01/03",
    url:
      "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
  },
  {
    id: "2",
    checked: false,
    name: "info_two",
    date: "2021/01/04",
    url:
      "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
  },
  {
    id: "3",
    checked: false,
    name: "info_three",
    date: "2021/01/05",
    url:
      "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
  },
  {
    id: "4",
    checked: false,
    name: "info_four",
    date: "2021/01/06",
    url:
      "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
  },
];

export const selectConfigure = [
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
