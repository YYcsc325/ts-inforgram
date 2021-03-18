import React, {useState} from 'react';
import {IRouteComponentProps, Link} from 'umi';
import {Button} from 'antd';
import Context from '@/pages/layout/context';

const BasicLayOut = ({children, ...reset}: IRouteComponentProps) => {
  const [value, setValue] = useState(1);



  return (
    <Context.Provider value={{value}}>
      <span>这是layout</span>
      <Button onClick={() => setValue(Math.random())}>点击累加</Button>
      {children}
    </Context.Provider>
  )
}

export default BasicLayOut;
