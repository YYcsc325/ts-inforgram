import React, {useEffect} from 'react'
// import styles from './index.less'
import {Layout} from 'antd'
import {IRouteComponentProps} from 'umi'


interface PageProps extends IRouteComponentProps {
}

const Index = ({children, location}: PageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])


  return (
    <Layout>
      <div>{children}</div>
    </Layout>
  )
}

export default Index
