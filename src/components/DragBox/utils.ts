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
    case "move":
      // 元素当前位置 + 偏移量
      const top = oriPos.top + (e.clientY - oriPos.cY);
      const left = oriPos.left + (e.clientX - oriPos.cX);
      style.top = top;
      style.left = left;
      break;
    // 东 -> 右
    case "e":
      style.width += offsetX;
      return style;
    // 西 -> 左
    case "w":
      style.width -= offsetX;
      style.left += offsetX;
      return style;
    // 南 -> 下
    case "s":
      style.height += offsetY;
      return style;
    // 北 -> 上
    case "n":
      style.height -= offsetY;
      style.top += offsetY;
      break;
    // 东北 -> 右上角 // 未完成
    case "ne":
      // style.width += offsetX;
      // style.height -= offsetY;
      // style.top += offsetY;

      style.width = style.width - (offsetX + offsetY);
      style.height = style.height - (offsetX + offsetY);
      style.top += offsetY + offsetX;
      break;
    // 西北 -> 左上角 // 未完成
    case "nw":
      // style.width -= offsetX;
      // style.height -= offsetY;
      // style.left += offsetX;
      // style.top += offsetY;

      style.width = style.width - (offsetX + offsetY);
      style.height = style.height - (offsetX + offsetY);
      style.left += offsetX + offsetY;
      style.top += offsetX + offsetY;
      break;
    // 东南 -> 右下角
    case "se":
      style.width = style.width + (offsetX + offsetY);
      style.height = style.height + (offsetX + offsetY);
      break;
    // 西南 -> 左下角 // 未完成
    case "sw":
      // style.width -= offsetX;
      // style.height += offsetY;
      // style.left += offsetX;

      style.width = style.width + (offsetX + offsetY);
      style.height = style.height + (offsetX + offsetY);
      style.left += offsetX + offsetY;
      break;
    // 旋转
    case "rotate":
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
    case "move":
      // 元素当前位置 + 偏移量
      const top = oriPos.top + (e.clientY - oriPos.cY);
      const left = oriPos.left + (e.clientX - oriPos.cX);
      style.top = top;
      style.left = left;
      break;
    // 东 -> 右
    case "e":
      style.width += offsetX;
      return style;
    // 西 -> 左
    case "w":
      style.width -= offsetX;
      style.left += offsetX;
      return style;
    // 南 -> 下
    case "s":
      style.height += offsetY;
      return style;
    // 北 -> 上
    case "n":
      style.height -= offsetY;
      style.top += offsetY;
      break;
    // 东北 -> 右上角
    case "ne":
      style.width += offsetX;
      style.height -= offsetY;
      style.top += offsetY;
      break;
    // 西北 -> 左上角
    case "nw":
      style.width -= offsetX;
      style.height -= offsetY;
      style.left += offsetX;
      style.top += offsetY;
      break;
    // 东南 -> 右下角
    case "se":
      style.width += offsetX;
      style.height += offsetY;
      break;
    // 西南 -> 左下角
    case "sw":
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

// 上 下 左 右 等比例缩放
// // 东
// case "e":
//   // 向右拖拽添加宽度
//   style.width += offsetX;
//   style.height = style.height + offsetX;
//   return style;
// // 西
// case "w":
//   // 增加宽度、位置同步左移
//   style.width -= offsetX;
//   style.height = style.height - offsetX;
//   style.left += offsetX;
//   return style;
// // 南
// case "s":
//   style.height += offsetY;
//   style.width = style.width + offsetY;
//   return style;
// // 北
// case "n":
//   style.height -= offsetY;
//   style.width = style.width - offsetY;
//   style.top += offsetY;
//   break;
