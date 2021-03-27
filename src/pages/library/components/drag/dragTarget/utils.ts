/**
 * @name 获取list最大值
 * @param {*} arr
 */
function Max(arr) {
  return Math.max(...arr);
}

/**
 * @name 获取list最小值
 * @param {*} arr
 */
function Min(arr = []) {
  return Math.min(...arr);
}

/**
 * @name 返回数组最大最小值
 * @param {*} target 拖拽目标元素
 * @param {*} arr 坐标匹配到的元素
 * @param {*} position 所有元素的坐标
 * @param {*} xy  需要比较哪个方位的
 */
export function getMaxMin(target, arr = [], position = {}, x, y) {
  let list = [];
  arr.map((key) => {
    list.push(position[key][x]);
    list.push(position[key][y]);
  });
  list.push(target[x]);
  list.push(target[y]);
  return {
    min: Min(list),
    max: Max(list),
  };
}
