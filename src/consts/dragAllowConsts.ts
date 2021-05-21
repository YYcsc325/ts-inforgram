const dragAllowConsts = {
  /** 移动 */
  MOVE: "move",
  /** 旋转 */
  ROTATE: "rodate",
  /** 东 - 右 */
  E: "e",
  /** 西 - 左 */
  W: "w",
  /** 南 - 下 */
  S: "s",
  /** 北 - 上 */
  N: "n",
  /** 东北 - 右上 */
  NE: "ne",
  /** 西北 - 左上 */
  NW: "nw",
  /** 东南 - 右下 */
  SE: "se",
  /** 西南 - 左下 */
  SW: "sw",
} as const;

export default dragAllowConsts;
