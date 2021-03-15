import React, { useContext } from 'react';
import Context from '@/pages/layout/context';

const Crowd = () => {
    const { value } = useContext<any>(Context);
    return (
        <div>
            <div>这是Crowd {value}</div>
            <div><CrowdChildren/></div>
        </div>
    )
}

function CrowdChildren(){
  return (
    <Context.Consumer>
        {({ value }: any) => {
            return (
            <div>这是CrowdChildren {value}</div>
            )
        }}
    </Context.Consumer>
  )
}

export default Crowd