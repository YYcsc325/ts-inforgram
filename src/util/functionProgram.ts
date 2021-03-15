let bookStore = [
    [
        { id: '1232adad123dda12ga', name: '红楼梦', rating: 7.2, type: '小说类' },
        { id: '1232adad1fvahag2ga', name: '东游记', rating: 5, type: '小说类' },
        { id: '1232ad78896kll12ga', name: '西游记', rating: 7.9, type: '小说类' },
    ],
    [
        { id: '1232adad12663822gb', name: '精通html', rating: 3.2, type: '前端技术类' },
        { id: '1232adad12263582ga', name: '移动端布局', rating: 2, type: '前端技术类' },
        { id: '1232adad12lmcx12ga', name: 'js函数式编程', rating: 8, type: '前端技术类' },
        { id: '1232adad120kouy7ga', name: '数据结构与算法', rating: 7.3, type: '前端技术类' },
        { id: '1232adad123vmzliea', name: 'css权威指南', rating: 6, type: '前端技术类' },
    ]
]
const curry = (fn, ...args) => {
    let argLens = fn.length
    return (...args2) => {
        let _args = args.concat(args2)
        if ((argLens > 0 && _args.length < argLens) || (argLens === 0 && args2.length !== 0)) {
            return curry.call(null, fn, ..._args)
        } else {
            return fn.apply(this, _args)
        }
    }
}
const partial = (fn, ...argsInit) => {
    return (..._args) => {
        let index = 0, args = argsInit.slice(0)
        for (arg of args) {
            if (arg === undefined) {
                args[index] = _args[0]
                _args.splice(0, 1)
            }
            index++
        }
        args = _args.length ? args.concat(_args) : args
        return fn(...args)
    }
}

// 从右向左组合
const compose = (...fns) => {
    return (arg) => {
        let fnArr = fns.reverse(), result = arg
        for (const fn of fnArr) {
            result = fn(result)
        }
        return result
    }
}
// 从左向右组合
const pipe = (...fns) => {
    return (arg) => {
        let result = arg
        for (const fn of fns) {
            result = fn(result)
        }
        return result
    }
}
const filter = (fn, arr) => {
    let newArr = []
    for (const val of arr) {
        if (fn(val)) {
            newArr.push(val)
        }
    }
    return newArr
}
const concatAll = (arr) => {
    let newArr = []
    for (val of arr) {
        if (Array.isArray(val)) {
            newArr.push.apply(newArr, concatAll(val))
        } else {
            newArr.push(val)
        }
    }
    return newArr
}

const reduce = (fn, arr, init) => {
    let total = init
    if (!Array.isArray(arr)) return undefined
    if (total === undefined) {
        total = arr[0]
        arr = arr.slice(1)
    }
    if (arr.length) {
        for (val of arr) {
            total = fn(total, val)
        }
    } else {
        total = fn(arr[0])
    }
    return total
}

let curryFilter = curry(filter, book => book.type === '前端技术类') // 把 filter 函数柯里化，同时，预设过滤条件处理函数

let curryReduce = partial(reduce, (total, book) => total + book.rating, undefined, 0) // 通过偏函数给 reduce 预设逻辑处理函数和初始值

let totalRating = pipe(concatAll, curryFilter, curryReduce)(bookStore)

console.log('totalRating:', totalRating)







const sortBy = (property, fn) => {
    return (a, b) => {
        if (typeof fn === 'function') {
            return fn(a[property]) < fn(b[property]) ? -1 : fn(a[property]) > fn(b[property]) ? 1 : 0
        } else {
            return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
        }
    }
}

let items = [
    { name: 'Edward', value: 21 },
    { name: 'Sharpe', value: 37 },
    { name: 'And', value: 45 },
    { name: 'The', value: -12 },
    { name: 'Magnetic' },
    { name: 'Zeros', value: 37 }
]

// sort by value
items.sort(sortBy('value'))
// sort by name
items.sort(sortBy('name', name => name.toUpperCase()))

function menory(fn) {
    let arr = [];
    return function (arg) {
        if (arr.includes(arg)) {
            return fn.call(this, arg)
        } else {
            arr.push(arg)
            return 0;
        }
    }
}
const memorized = menory(num => num);
let list = [1, 1, 2, 2, 3, 3, 4, 5];
let togle = 0;
list.forEach(item => {
    togle = togle + memorized(item)
});
console.log(togle, 'togle')
Array.prototype.filters = function (fn) {
    let _this = this || [];
    let list = [];
    for(let i of _this){
        if(fn(_this[i])){
            list.push(_this[i])
        }
    }
    return list;
}
let data = list.filters(item => item === 1);
console.log(data, 'data')


// 第一次的函数式编程
import { marketStepMap, planStepMap, groupStepMap, creativeStepMap } from './const';

// 组合容器
const fnCombination = (x) => ({
  map: (f) => fnCombination(f(x)),
  fold: (f) => f(x),
  inspect: () => `fnCombination(${x})`,
});

/**
 * @name 侧边栏（营销目标）的step获取
 * @param { sceneCode, stepList }
 */
function marketStepBySceneCode(stepList = [], sceneCode) {
  const marketStepConfig = marketStepMap(sceneCode);
  return stepList.concat(marketStepConfig);
}
/**
 * @name 侧边栏（计划部分）的step获取
 * @param { sceneCode, stepList }
 */
function planStepBySceneCode(stepList = [], sceneCode) {
  const planStepConfig = planStepMap(sceneCode);
  return stepList.concat(planStepConfig);
}
/**
 * @name 侧边栏（单元部分）的step获取
 * @param { sceneCode, stepList }
 */
function groupStepBySceneCode(stepList = [], sceneCode) {
  const groupStepConfig = groupStepMap(sceneCode);
  return stepList.concat(groupStepConfig);
}
/**
 * @name 侧边栏（创意部分）的step获取
 * @param { sceneCode, stepList }
 */
function creativeStepBySceneCode(stepList = [], sceneCode) {
  const creativeStepConfig = creativeStepMap(sceneCode);
  return stepList.concat(creativeStepConfig);
}

export function getStepListBysceneCode(sceneCode) {
  return function (list = []) {
    return fnCombination(list)
      .map((data) => marketStepBySceneCode(data, sceneCode)) // 获取营销目标
      .map((data) => planStepBySceneCode(data, sceneCode)) // 获取计划
      .map((data) => groupStepBySceneCode(data, sceneCode)) // 获取单元
      .map((data) => creativeStepBySceneCode(data, sceneCode)) // 获取创意
      .fold((stepList) => stepList);
  };
}