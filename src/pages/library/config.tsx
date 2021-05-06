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
      "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/06b42df5-fcb9-49fd-958f-442fd8c9bae5.jpg?v=1620309274000",
  },
  {
    id: "3",
    checked: false,
    name: "info_three",
    date: "2021/01/05",
    url:
      "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/067b0dc1-0d88-48d0-8420-015405f11dc1.jpg?v=1620309310000",
  },
  {
    id: "4",
    checked: false,
    name: "info_four",
    date: "2021/01/06",
    url:
      "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/06b42df5-fcb9-49fd-958f-442fd8c9bae5.jpg?v=1620309274000",
  },
  {
    id: "5",
    checked: false,
    name: "info_five",
    date: "2021/01/07",
    url:
      "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/ee336bd4-3d99-4771-9c1b-77c288674b42.jpg?v=1619533038000",
  },
  {
    id: "6",
    checked: false,
    name: "info_six",
    date: "2021/01/08",
    url:
      "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/ee336bd4-3d99-4771-9c1b-77c288674b42.jpg?v=1619533038000",
  },
  {
    id: "7",
    checked: false,
    name: "info_seven",
    date: "2021/01/09",
    url:
      "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/ee336bd4-3d99-4771-9c1b-77c288674b42.jpg?v=1619533038000",
  },
];

export const selectConfigure = [
  {
    id: "1",
    name: "Infographics",
    path: "/templates",
    width: 70,
    height: 100,
    backgroundColor: "rgb(125, 109, 189)",
    icon: <ContainerOutlined />,
  },
  {
    id: "2",
    name: "Reports",
    path: "/templates/report",
    width: 80,
    height: 100,
    backgroundColor: "rgb(113, 154, 186)",
    icon: <DatabaseOutlined />,
  },
  {
    id: "3",
    name: "Slides",
    path: "/templates/slides",
    width: 100,
    height: 70,
    backgroundColor: "rgb(183, 110, 164)",
    icon: <FundProjectionScreenOutlined />,
  },
  {
    id: "4",
    name: "Dashboards",
    path: "/templates/dashboards",
    width: 100,
    height: 70,
    backgroundColor: "rgb(133, 188, 153)",
    icon: <DesktopOutlined />,
  },
  {
    id: "5",
    name: "Social media",
    path: "/templates/posts",
    width: 100,
    height: 80,
    backgroundColor: "rgb(77, 100, 165)",
    icon: <IdcardOutlined />,
  },
  {
    id: "6",
    name: "Posters",
    path: "/templates/poster",
    width: 80,
    height: 100,
    backgroundColor: "rgb(156, 206, 238)",
    icon: <CopyOutlined />,
  },
  {
    id: "7",
    name: "Social media",
    path: "/templates/poster",
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
