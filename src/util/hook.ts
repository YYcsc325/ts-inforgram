react的hook

useState:

     Const [ a, setA ] = useState(‘1’);
     Const [ b, setB ] = useState(() => { return 1 });

useEffect:

     useEffect(() => {})  或者 useEffect(() => {}, [])  // didmount
     useEffect(() => {}, [a])  // componentDidUpdate
     useEffect(() => {
         setA(‘1’);
         return () => {  // componentWillUnmount的callback
             // 组件卸载需要做点什么
         }
     })

useCallBack:

内部可能实现方式: 
const res = function useCallBack(callback){  // res 返回一个callback（函数）
    return function(…args){
        return callback(…args)
    }
}
useCallBack(() => {}, [a]);

内部可能实现方式:  
const res = function useMemo(callback){ // res 返回传入callback的return值
   return callback()
}
useMemo(() => {
    return ‘1’
})

useContext:

import React, {  useContext, useState } from 'react';
const  Context = react.createContext() 

// 上层组件
const Father = () => {  
    const [value, setValue] = useState({})  
    return (
       <Context.Provider value={{age: ‘123’}}>
   <AD />
</Context.Provider>
    )
}
const Ad = () => {
   return (
       <>
          <AdComponent />
       </>
   )
}
const AdComponent(){
    Const { value } = useContext();
    return <span></span>
} 

自定义hook ： https://react.docschina.org/docs/hooks-custom.html
    1： 在react函数式组件中使用它（也可以在自定义hook中调用其它hook）。
    2： 在最顶层调用它， 确保执行顺序。
    3： 函数式组件中hook不要放在循环中，跟hook嵌套。