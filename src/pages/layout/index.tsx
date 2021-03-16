import React, {useState} from 'react';
import {IRouteComponentProps, Link} from 'umi';
import {Button} from 'antd';
import styles from './index.less'
import {Menu} from 'antd';


const {SubMenu} = Menu;
import Context from '@/pages/layout/context';

const BasicLayOut = ({children, ...reset}: IRouteComponentProps) => {
  const [value, setValue] = useState(1);
  const [scrollTop, setScrollTop] = useState(0);
  const [current, setCurrent,] = useState('mail')
  const handleScroll = () => {
    // @ts-ignore
    let scrollTop = document.getElementById('bodyBox').scrollTop //滚动条滚动高度
    setScrollTop(scrollTop)
  }
  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key)
  };

  return (
    <Context.Provider value={{value}}>
      <div className={styles['infogramLayout']}>
        <div
          className={scrollTop > 0 ? `${styles['publicHeadComponentScroll']} ${styles['publicHeadComponent']}` : styles['publicHeadComponent']}>
          <a href="/"><img
            src="https://cdn-web.jifo.co/_next/static/images/logo-light-6a12d956b64625dbed69e989c9a86b03.svg"
            alt="Infogram"/></a>
          <div>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
              <SubMenu key="Create" title="Create">
                <Menu.ItemGroup>
                  <Menu.Item key="Infographics">Infographics</Menu.Item>
                  <Menu.Item key="Facebook posts">Facebook posts</Menu.Item>
                  <Menu.Item key="Reports">Reports</Menu.Item>
                  <Menu.Item key="Slides">Slides</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <Menu.Item key="Examples">
                Examples
              </Menu.Item>
              <SubMenu key="Solutions" title="Solutions">
                <Menu.ItemGroup>
                  <Menu.Item key="Marketing">Marketing</Menu.Item>
                  <Menu.Item key="Media">Media</Menu.Item>
                  <Menu.Item key="Education">Education</Menu.Item>
                  <Menu.Item key="Nonprofit">Nonprofit</Menu.Item>
                  <Menu.Item key="Government">Government</Menu.Item>
                  <Menu.Item key="Reporting">Reporting</Menu.Item>
                  <Menu.Item key="Teams">Teams</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <Menu.Item key="Pricing">
                Pricing
              </Menu.Item>
              <Menu.Item key="Customers">
                Customers
              </Menu.Item>
              <Menu.Item key="Blog">
                Blog
              </Menu.Item>
            </Menu>
          </div>
          <div className={styles['publicHeadComponentLogin']}>
            <Link to='/login'>Log in</Link>
          </div>
        </div>
        <div className={styles['componentBody']} onScroll={handleScroll} id="bodyBox">
          <span>这是layout</span>
          <Button onClick={() => setValue(Math.random())}>点击累加</Button>
          {children}
        </div>
      </div>
    </Context.Provider>
  )
}

export default BasicLayOut;
