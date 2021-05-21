import { dragAllowConsts } from "@/consts";

const { E, W, S, N, NE, NW, SE, SW, ROTATE, MOVE } = dragAllowConsts;
/**
 * 元素变化。 方法放在组件外部或者其他地方。
 * @param direction  方向 // move 移动 / 'e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'
 * @param oriPos   鼠标按下时所记录的坐标
 * @param e        事件event
 */
export function transformScale(direction: any, oriPos: any, e: any) {
  const style = { ...oriPos };
  // 偏移量
  const offsetX = e.clientX - oriPos.cX;
  const offsetY = e.clientY - oriPos.cY;
  switch (direction) {
    // 拖拽移动
    case MOVE:
      // 元素当前位置 + 偏移量
      style.top = oriPos.top + (e.clientY - oriPos.cY);
      style.left = oriPos.left + (e.clientX - oriPos.cX);
      break;
    // 东 -> 右
    case E:
      style.width += offsetX;
      style.height = style.height + offsetX;

      // style.width += offsetX;
      break;
    // 西 -> 左
    case W:
      style.width -= offsetX;
      style.height = style.height - offsetX;
      style.left += offsetX;

      // style.width -= offsetX;
      // style.left += offsetX;
      break;
    // 南 -> 下
    case S:
      style.height += offsetY;
      style.width = style.width + offsetY;

      // style.height += offsetY;
      break;
    // 北 -> 上
    case N:
      style.height -= offsetY;
      style.width = style.width - offsetY;
      style.top += offsetY;

      // style.height -= offsetY;
      // style.top += offsetY;
      break;
    // 东北 -> 右上角 // 未完成
    case NE:
      style.width += offsetX + offsetY;
      style.height -= offsetY + offsetX;
      style.top += offsetY + offsetX;

      // style.width += offsetX;
      // style.height -= offsetY;
      // style.top += offsetY;
      break;
    // 西北 -> 左上角 -> 未完成
    case NW:
      style.width = style.width - (offsetX + offsetY);
      style.height = style.height - (offsetX + offsetY);
      if (style.width > 0 && style.height > 0) {
        style.cY = offsetX + offsetY;
        style.cX = offsetX + offsetY;
        style.left += offsetX + offsetY;
        style.top += offsetX + offsetY;
      }

      // style.width -= offsetX;
      // style.height -= offsetY;
      // style.left += offsetX;
      // style.top += offsetY;
      break;
    // 东南 -> 右下角
    case SE:
      style.width = style.width + (offsetX + offsetY);
      style.height = style.height + (offsetX + offsetY);

      // style.width += offsetX;
      // style.height += offsetY;
      break;
    // 西南 -> 左下角 // 未完成
    case SW:
      style.width = style.width + (offsetX + offsetY);
      style.height = style.height - (offsetX + offsetY);
      style.left += offsetX + offsetY;

      // style.width -= offsetX;
      // style.height += offsetY;
      // style.left += offsetX;
      break;
    // 旋转
    case ROTATE:
      // 先计算下元素的中心点, x，y 作为坐标原点
      const x = style.width / 2 + style.left;
      const y = style.height / 2 + style.top;
      // 当前的鼠标坐标
      const x1 = e.clientX;
      const y1 = e.clientY;
      // 三角函数
      style.transform = `rotate(${
        Math.atan2(y1 - y, x1 - x) * (180 / Math.PI) - 90
      }deg)`;
      break;
  }
  return style;
}

/**
 * 元素变化。 方法放在组件外部或者其他地方。
 * @param direction  方向 // move 移动 / 'e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'
 * @param oriPos   鼠标按下时所记录的坐标
 * @param e        事件event
 */
export function transform(direction: any, oriPos: any, e: any) {
  const style = { ...oriPos };
  const offsetX = e.clientX - oriPos.cX;
  const offsetY = e.clientY - oriPos.cY;
  switch (direction) {
    // 拖拽移动
    case MOVE:
      // 元素当前位置 + 偏移量
      style.top = oriPos.top + (e.clientY - oriPos.cY);
      style.left = oriPos.left + (e.clientX - oriPos.cX);
      break;
    // 东 -> 右
    case E:
      style.width += offsetX;
      break;
    // 西 -> 左
    case W:
      style.width -= offsetX;
      style.left += offsetX;
      break;
    // 南 -> 下
    case S:
      style.height += offsetY;
      break;
    // 北 -> 上
    case N:
      style.height -= offsetY;
      style.top += offsetY;
      break;
    // 东北 -> 右上角
    case NE:
      style.width += offsetX;
      style.height -= offsetY;
      style.top += offsetY;
      break;
    // 西北 -> 左上角
    case NW:
      style.width -= offsetX;
      style.height -= offsetY;
      style.left += offsetX;
      style.top += offsetY;
      break;
    // 东南 -> 右下角
    case SE:
      style.width += offsetX;
      style.height += offsetY;
      break;
    // 西南 -> 左下角
    case SW:
      style.width -= offsetX;
      style.height += offsetY;
      style.left += offsetX;
      break;
    // 拖拽移动
    case "rotate":
      // 先计算下元素的中心点, x，y 作为坐标原点
      const x = style.width / 2 + style.left;
      const y = style.height / 2 + style.top;
      // 当前的鼠标坐标
      const x1 = e.clientX;
      const y1 = e.clientY;
      // 运用高中的三角函数
      style.transform = `rotate(${
        Math.atan2(y1 - y, x1 - x) * (180 / Math.PI) - 90
      }deg)`;
      break;
  }
  return style;
}

export function unique(array: any, compare = (a: any, b: any) => a === b) {
  const result = [];
  for (let i = 0, len = array.length; i < len; i++) {
    const current = array[i];
    if (result.findIndex((v) => compare(v, current)) === -1) {
      result.push(current);
    }
  }
  return result;
}

export const checkArrayWithPush = (target: any, key: string, value: any) => {
  if (Array.isArray(target[key])) {
    target[key].push(value);
  } else {
    target[key] = [value];
  }
};

export const createCoreData = (
  { node, deltaX, deltaY }: any,
  { originX, originY, x, y }: any
) => {
  return {
    node,
    deltaY,
    deltaX,
    originX: originX || x,
    originY: originY || y,
    x,
    y,
  };
};

export const getMaxDistance = (arr: any = []) => {
  const num = arr.sort((a: number, b: number) => a - b);
  return num[num.length - 1] - num[0];
};
