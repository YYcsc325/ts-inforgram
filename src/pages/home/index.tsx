import React, {useState} from 'react';
import {IRouteComponentProps, Link} from 'umi';
import {Button} from 'antd';
import styles from './index.less'

const HomePage = ({children, ...reset}: IRouteComponentProps) => {
  const [scrollTop, setScrollTop] = useState(0)
  const handleScroll = () => {
    // @ts-ignore
    let scrollTop = document.getElementById('bodyBox').scrollTop //滚动条滚动高度
    setScrollTop(scrollTop)
  }


  return (
    <div className={styles['infogramHome']}>
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
        <div className={styles['componentBodyTitleBox']}>
          <h1  className={styles['componentBodyTitle']}>Create engaging infographics and reports in minutes</h1>
          <p  className={styles['componentBodySubTitle']}>Infogram is an intuitive visualization tool that empowers people and teams to create beautiful content.</p>
          <a className={styles['jionBtn']}>Join Infogram now</a>
          <p className={styles['componentBodyTitleTip']}>Design with ease <span/>Collaborate in real-time <span/>Download,
            share, and publish online</p>
        </div>

        <div>3</div>

        <div className={styles['dataPresentation']}>
          <p className={styles['dataPresentationTitle']}>The simple way to make your data dazzle</p>
          <div className={styles['dataPresentationContent']}>
            <div className={styles['dataPresentationCard']}>
              <img src='https://cdn-web.jifo.co/_next/static/images/reports-62a6a609a1733d7282966334d01f912b.svg' alt={''} className={styles['dataPresentationCardPic']}/>
              <h3 className={styles['dataPresentationCardTitle']}>Infographics</h3>
              <p className={styles['dataPresentationCardSubTitle']}>Create stunning infographics that boost visitor engagement on your website or blog.</p>
            </div>
            <div className={styles['dataPresentationCard']}>
              <img src='https://cdn-web.jifo.co/_next/static/images/pages-6c2912c447c8b70f7dbfc9531e80091e.svg' alt={''} className={styles['dataPresentationCardPic']}/>
              <h3 className={styles['dataPresentationCardTitle']}>Reports</h3>
              <p className={styles['dataPresentationCardSubTitle']}>Stand out with interactive marketing reports, sales figures, and more.</p>
            </div>
            <div className={styles['dataPresentationCard']}>
              <img src='https://cdn-web.jifo.co/_next/static/images/slides-f3d4914356c3bffff8d2ab443f33128c.svg' alt={''} className={styles['dataPresentationCardPic']}/>
              <h3 className={styles['dataPresentationCardTitle']}>Slides</h3>
              <p className={styles['dataPresentationCardSubTitle']}>Present your ideas and showcase your data with our striking slide templates.</p>
            </div>
            <div className={styles['dataPresentationCard']}>
              <img src='https://cdn-web.jifo.co/_next/static/images/dashboards-7a61be396e84728511f6be3ee29282c1.svg' alt={''} className={styles['dataPresentationCardPic']}/>
              <h3 className={styles['dataPresentationCardTitle']}>Dashboards</h3>
              <p className={styles['dataPresentationCardSubTitle']}>Connect your data to build live, easily shareable dashboards that visually track your business.</p>
            </div>
            <div className={styles['dataPresentationCard']}>
              <img src='https://cdn-web.jifo.co/_next/static/images/maps-2c581649254b80179fc2c19d16f1db1a.svg' alt={''} className={styles['dataPresentationCardPic']}/>
              <h3 className={styles['dataPresentationCardTitle']}>Maps</h3>
              <p className={styles['dataPresentationCardSubTitle']}>Use our map maker to publish professional-quality interactive maps that impress and inform.</p>
            </div>
            <div className={styles['dataPresentationCard']}>
              <img src='https://cdn-web.jifo.co/_next/static/images/sharing-5e6c72fcd4b364bced88518eeab84776.svg' alt={''} className={styles['dataPresentationCardPic']}/>
              <h3 className={styles['dataPresentationCardTitle']}>Social media visuals</h3>
              <p className={styles['dataPresentationCardSubTitle']}>Browse our extensive library of photos and icons to create stunning visuals for Facebook, Instagram, and Twitter.</p>
            </div>
          </div>
        </div>
        <div className={styles['possibilities']}>
          <p className={styles['possibilitiesTitle']}>Visualize endless possibilities</p>
          <div className={styles['possibilitiesLinksBox']}>
            <div className={styles['possibilitiesLinks']}>
              <img src="https://cdn-web.jifo.co/_next/static/images/marketing-03ca339dc5f8093495c0538cff928a62.svg" alt="" className={styles['possibilitiesLinksPic']}/>
              <p className={styles['possibilitiesLinksTitle']}>Marketing</p>
            </div>
            <div className={styles['possibilitiesLinks']}>
              <img src="https://cdn-web.jifo.co/_next/static/images/onlinepublishing-0d9eeeea6601ebc59a393a312d16719f.svg" alt=""  className={styles['possibilitiesLinksPic']}/>
              <p className={styles['possibilitiesLinksTitle']}>Online Publishing</p>
            </div>
            <div className={styles['possibilitiesLinks']}>
              <img src="https://cdn-web.jifo.co/_next/static/images/education-fabf551fcedf630378599ea10a204841.svg" alt=""  className={styles['possibilitiesLinksPic']}/>
              <p className={styles['possibilitiesLinksTitle']}>Education</p>
            </div>
            <div className={styles['possibilitiesLinks']}>
              <img src="https://cdn-web.jifo.co/_next/static/images/reporting-9a126afad53185d5b33025baa5fef934.svg" alt=""  className={styles['possibilitiesLinksPic']}/>
              <p className={styles['possibilitiesLinksTitle']}>Reporting</p>
            </div>
            <div className={styles['possibilitiesLinks']}>
              <img src="https://cdn-web.jifo.co/_next/static/images/government-556639d33cb3d89fdbe882bc747da7d7.svg" alt=""  className={styles['possibilitiesLinksPic']}/>
              <p className={styles['possibilitiesLinksTitle']}>Government</p>
            </div>
            <div className={styles['possibilitiesLinks']}>
              <img src="https://cdn-web.jifo.co/_next/static/images/nonprofit-b14e78e36f2676efc2eb781309d76ea7.svg" alt=""  className={styles['possibilitiesLinksPic']}/>
              <p className={styles['possibilitiesLinksTitle']}>Nonprofit</p>
            </div>
          </div>
        </div>
        <div className={styles['usingCompany']}>
          <p  className={styles['usingCompanyText']}>Here are just a few of the 30,000+ companies that use Infogram</p>
          <img src="https://cdn-web.jifo.co/_next/static/images/logos-b54aff5d777e6ddf1952ed76e623d666.png" alt="" className={styles['usingCompanyPic']}/>
          <p  className={styles['usingCompanyText']}>Infogram has everything you need to create captivating visuals that impress and inform your audience.</p>
          <a className={styles['jionBtn']}>Join Infogram now</a>
        </div>

        <div>7</div>

        <div>8</div>

      </div>
    </div>
  )
}

export default HomePage;
