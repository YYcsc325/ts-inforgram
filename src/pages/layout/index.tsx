import React, {useState} from 'react';
import {IRouteComponentProps, Link} from 'umi';
import {Button} from 'antd';
import styles from './index.less'
import Context from '@/pages/layout/context';

const BasicLayOut = ({children, ...reset}: IRouteComponentProps) => {
  const [value, setValue] = useState(1);
  const [scrollTop, setScrollTop] = useState(0)
  const handleScroll = () => {
    // @ts-ignore
    let scrollTop = document.getElementById('bodyBox').scrollTop //滚动条滚动高度
    setScrollTop(scrollTop)
  }


  return (
    <Context.Provider value={{value}}>
      <div className={styles['infogramLayout']}>
        <div
          className={scrollTop > 0 ? `${styles['publicHeadComponentScroll']} ${styles['publicHeadComponent']}` : styles['publicHeadComponent']}>
          <a href="/"><img
            src="https://cdn-web.jifo.co/_next/static/images/logo-light-6a12d956b64625dbed69e989c9a86b03.svg"
            alt="Infogram"/></a>
          <div className={styles['infogramMenuAndLogin']}>
            <div className={styles['infogramMenu']}>
              <ul className={styles['infogramMenuUl']}>
                <li className={styles['infogramMenuLi']}>
                  <a href="/">Create</a>
                  <nav className={styles['infogramMenuNav']}>
                    <ul className={styles['infogramMenuNavUl']}>
                      <li><a href="/">Infographics</a></li>
                      <li><a href="/">Reports</a></li>
                      <li><a href="/">Slides</a></li>
                      <li><a href="/">Dashboards</a></li>
                      <li><a href="/">Posters</a></li>
                      <li><a href="/">Social media posts</a></li>
                      <li><a href="/">Email headers</a></li>
                      <li><a href="/">YouTube thumbnails</a></li>
                      <li><a href="/">Single map</a></li>
                      <li><a href="/">Single chart</a></li>
                    </ul>
                  </nav>
                </li>
                <li className={styles['infogramMenuLi']}><a href="/">Examples</a></li>
                <li className={styles['infogramMenuLi']}>
                  <a href="/">Solutions</a>
                  <nav className={styles['infogramMenuNav']}>
                    <ul className={styles['infogramMenuNavUl']}>
                      <li><a href="/">Marketing</a></li>
                      <li><a href="/">Media</a></li>
                      <li><a href="/">Education</a></li>
                      <li><a href="/">Nonprofit</a></li>
                      <li><a href="/">Government</a></li>
                      <li><a href="/">Reporting</a></li>
                      <li><a href="/">Teams</a></li>
                    </ul>
                  </nav>
                </li>
                <li className={styles['infogramMenuLi']}><a href="/">Pricing</a></li>
                <li className={styles['infogramMenuLi']}><a href="/">Customers</a></li>
                <li className={styles['infogramMenuLi']}><a href="/">Blog</a></li>
              </ul>
            </div>
            <div className={styles['publicHeadComponentLogin']}>
              <Link to='/login'>Log in</Link>
              <Link to='/login'>Get started</Link>
            </div>
          </div>
        </div>
        <div className={styles['componentBody']} onScroll={handleScroll} id="bodyBox">
          <div style={{height:'1000px',background:'#ccc'}}>xxx</div>
          <span>这是layout</span>
          <Button onClick={() => setValue(Math.random())}>点击累加</Button>
          {children}
        </div>
      </div>
    </Context.Provider>
  )
}

export default BasicLayOut;
