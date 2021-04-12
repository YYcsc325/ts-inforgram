// 组合容器
const fnCombination = (x: any) => ({
  map: (f: Function) => fnCombination(f(x)),
  fold: (f: Function) => f(x),
  inspect: () => `fnCombination(${x})`,
});

const getnames = (params: any) => {
  return {
    ...params,
    name: "cen",
  };
};
const getages = (params: any) => {
  return {
    ...params,
    age: "30",
  };
};

const data = {};
const result: any = fnCombination(data)
  .map((val: any) => getnames(val))
  .map((val: any) => getages(val))
  .fold((val: any) => val);
