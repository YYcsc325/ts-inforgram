import {
  TeamOutlined,
  PlusOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  LinkedinOutlined,
  LineChartOutlined,
  CodeSandboxOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

export const actionBarList = [
  {
    id: "1",
    icon: LineChartOutlined,
    name: "Analytics",
    link: "/analytics",
  },
  {
    id: "2",
    icon: TeamOutlined,
    name: "Manage teams",
    link: "/teams",
  },
  {
    id: "3",
    icon: CodeSandboxOutlined,
    name: "Branding",
    link: "/brandsets",
  },
  {
    id: "4",
    icon: LinkedinOutlined,
    name: "Content library",
    link: "/content",
  },
];

export const actionBarItems = [
  {
    id: "1",
    icon: MedicineBoxOutlined,
    name: "Library",
    link: "/library",
  },
  {
    id: "2",
    icon: LineChartOutlined,
    name: "Analytics",
    link: "/analytics",
  },
  {
    id: "3",
    icon: TeamOutlined,
    name: "Manage teams",
    link: "/teams",
  },
  {
    id: "4",
    icon: CodeSandboxOutlined,
    name: "Branding",
    link: "/brandsets",
  },
  {
    id: "5",
    icon: LinkedinOutlined,
    name: "Content library",
    link: "/content",
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
