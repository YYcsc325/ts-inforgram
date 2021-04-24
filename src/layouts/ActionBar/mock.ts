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
import { actionBarConsts } from "@/consts";

export const actionBarList = [
  {
    id: actionBarConsts.ANALYTICS,
    icon: LineChartOutlined,
    name: "Analytics",
    link: "/analytics",
  },
  {
    d: actionBarConsts.TEAMS,
    icon: TeamOutlined,
    name: "Manage teams",
    link: "/teams",
  },
  {
    id: actionBarConsts.BRANDSETS,
    icon: CodeSandboxOutlined,
    name: "Branding",
    link: "/brandsets",
  },
  {
    id: actionBarConsts.CONTENT,
    icon: LinkedinOutlined,
    name: "Content library",
    link: "/content",
  },
];

export const actionBarItems = [
  {
    id: actionBarConsts.LIBRARY,
    icon: MedicineBoxOutlined,
    name: "Library",
    link: "/library",
  },
  {
    id: actionBarConsts.ANALYTICS,
    icon: LineChartOutlined,
    name: "Analytics",
    link: "/analytics",
  },
  {
    id: actionBarConsts.TEAMS,
    icon: TeamOutlined,
    name: "Manage teams",
    link: "/teams",
  },
  {
    id: actionBarConsts.BRANDSETS,
    icon: CodeSandboxOutlined,
    name: "Branding",
    link: "/brandsets",
  },
  {
    id: actionBarConsts.CONTENT,
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
