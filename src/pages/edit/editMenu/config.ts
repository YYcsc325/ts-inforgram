import { TransforObjectToArray } from "@/util/useType";

export const menuNavConsts = {
  /** 文本 */
  TEXT: "TEXT",
  /** 图表 */
  CHART: "CHART",
  /** 地图 */
  MAP: "MAP",
  /** 组件 */
  ELEMENT: "ELEMENT",
  /** 区域 */
  GRAPHICS: "GRAPHICS",
  /** shape */
  SHAPE: "SHAPE",
  /** integration */
  INTEGRATION: "INTEGRATION",
} as const;

export type IMenuNavConsts = TransforObjectToArray<typeof menuNavConsts>;

export type IMenuNavItem = {
  key: IMenuNavConsts;
  title: string;
  class: string;
};

export const menuNav: Array<IMenuNavItem> = [
  {
    key: "TEXT",
    title: "Add text",
    class: "addText",
  },
  {
    key: "CHART",
    title: "Add chart",
    class: "addChart",
  },
  {
    key: "MAP",
    title: "Add map",
    class: "addMap",
  },
  {
    key: "ELEMENT",
    title: "Add element",
    class: "addElement",
  },
  {
    key: "GRAPHICS",
    title: "Add graphics",
    class: "addGraphics",
  },
  {
    key: "SHAPE",
    title: "Add shape",
    class: "addShape",
  },
  {
    key: "INTEGRATION",
    title: "Add integration",
    class: "addIntegration",
  },
];
