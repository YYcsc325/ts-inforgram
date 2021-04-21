import {
  TeamOutlined,
  LineChartOutlined,
  CodeSandboxOutlined,
  LinkedinOutlined,
  DeleteOutlined,
  PlusOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

export const data = [
  {
    id: "1",
    icon: LineChartOutlined,
    name: "Analytics",
  },
  {
    id: "2",
    icon: TeamOutlined,
    name: "Manage teams",
  },
  {
    id: "3",
    icon: CodeSandboxOutlined,
    name: "Branding",
  },
  {
    id: "4",
    icon: LinkedinOutlined,
    name: "Content library",
  },
];

export const libraryItems = [
  {
    icon: AppstoreOutlined,
    name: "All Projects",
    needLine: true,
    backGround: "rl",
    needHover: true,
  },
  {
    icon: PlusOutlined,
    name: "New folder",
    type: "a",
    backGround: "rl",
    style: { color: "#3195CB", fonWeight: 500 },
  },
  {
    icon: DeleteOutlined,
    name: "Trash",
    needLine: true,
    backGround: "line",
  },
];
