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
    key: menuNavConsts.TEXT,
    title: "Add text",
    class: "addText",
  },
  {
    key: menuNavConsts.CHART,
    title: "Add chart",
    class: "addChart",
  },
  {
    key: menuNavConsts.MAP,
    title: "Add map",
    class: "addMap",
  },
  {
    key: menuNavConsts.ELEMENT,
    title: "Add element",
    class: "addElement",
  },
  {
    key: menuNavConsts.GRAPHICS,
    title: "Add graphics",
    class: "addGraphics",
  },
  {
    key: menuNavConsts.SHAPE,
    title: "Add shape",
    class: "addShape",
  },
  {
    key: menuNavConsts.INTEGRATION,
    title: "Add integration",
    class: "addIntegration",
  },
];
