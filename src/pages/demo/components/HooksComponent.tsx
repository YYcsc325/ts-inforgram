/**
 * @name hooks的用例
 * @desc 对useEffect, useCallback, useMemo的解释
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// useMemo跟useCallback 跟 useEffect使用方式一样
// useMemo 返回一个返回缓存的变量
// useCallback返回一个函数，如果数据发生变化，重新返回一个函数。
// useEffect  不监听任何数据 [] 相当于didmount只执行一次
// useEffect返回一个函数，返回函数内的代码只在改useEffect在次执行的时候先行执行return 返回函数内的代码，
// 返回return函数相当于， 重新执行这个useEffect的时候，先执行return函数内的东西。

function Child({ callback }) {
  const [count, setCount] = useState(() => callback(0));
  useEffect(() => {
    setCount(callback(1));
  }, [callback]);
  return <div>{count}</div>;
}

const HooksComponent = (props = {}) => {
  const [count, setCount] = useState(1);
  const [val, setVal] = useState('');
  const [vals, setVals] = useState(1);

  // 传递给子组件， 父子间count发生变化，子组件进行更新，子组件监听这个函数
  const callback = useCallback(
    (val) => {
      return count + val;
    },
    [count],
  );

  const valueData = useMemo(() => {
    return vals * 123;
  }, [vals]);

  return (
    <div>
      <h4>{count}</h4>
      <h4>{valueData}</h4>
      <Child callback={callback} />
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <input
          value={val}
          onChange={(e) => {
            setVals(e.target.value);
            setVal(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
export default HooksComponent;
