import React, { useState } from "react";
import { IRouteComponentProps, Link } from "umi";
import { Button } from "antd";
import styles from "./index.less";

const HomePage = ({ children, ...reset }: IRouteComponentProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const handleScroll = () => {
    // @ts-ignore
    let scrollTop = document.getElementById("bodyBox").scrollTop; //滚动条滚动高度
    setScrollTop(scrollTop);
  };

  return (
    <div className={styles["infogramHome"]}>
      <div
        className={
          scrollTop > 0
            ? `${styles["publicHeadComponentScroll"]} ${styles["publicHeadComponent"]}`
            : styles["publicHeadComponent"]
        }
      >
        <a href="/">
          <img
            src="https://cdn-web.jifo.co/_next/static/images/logo-light-6a12d956b64625dbed69e989c9a86b03.svg"
            alt="Infogram"
          />
        </a>
        <div className={styles["infogramMenuAndLogin"]}>
          <div className={styles["infogramMenu"]}>
            <ul className={styles["infogramMenuUl"]}>
              <li className={styles["infogramMenuLi"]}>
                <a href="/">Create</a>
                <nav className={styles["infogramMenuNav"]}>
                  <ul className={styles["infogramMenuNavUl"]}>
                    <li>
                      <a href="/">Infographics</a>
                    </li>
                    <li>
                      <a href="/">Reports</a>
                    </li>
                    <li>
                      <a href="/">Slides</a>
                    </li>
                    <li>
                      <a href="/">Dashboards</a>
                    </li>
                    <li>
                      <a href="/">Posters</a>
                    </li>
                    <li>
                      <a href="/">Social media posts</a>
                    </li>
                    <li>
                      <a href="/">Email headers</a>
                    </li>
                    <li>
                      <a href="/">YouTube thumbnails</a>
                    </li>
                    <li>
                      <a href="/">Single map</a>
                    </li>
                    <li>
                      <a href="/">Single chart</a>
                    </li>
                  </ul>
                </nav>
              </li>
              <li className={styles["infogramMenuLi"]}>
                <a href="/">Examples</a>
              </li>
              <li className={styles["infogramMenuLi"]}>
                <a href="/">Solutions</a>
                <nav className={styles["infogramMenuNav"]}>
                  <ul className={styles["infogramMenuNavUl"]}>
                    <li>
                      <a href="/">Marketing</a>
                    </li>
                    <li>
                      <a href="/">Media</a>
                    </li>
                    <li>
                      <a href="/">Education</a>
                    </li>
                    <li>
                      <a href="/">Nonprofit</a>
                    </li>
                    <li>
                      <a href="/">Government</a>
                    </li>
                    <li>
                      <a href="/">Reporting</a>
                    </li>
                    <li>
                      <a href="/">Teams</a>
                    </li>
                  </ul>
                </nav>
              </li>
              <li className={styles["infogramMenuLi"]}>
                <a href="/">Pricing</a>
              </li>
              <li className={styles["infogramMenuLi"]}>
                <a href="/">Customers</a>
              </li>
              <li className={styles["infogramMenuLi"]}>
                <a href="/">Blog</a>
              </li>
            </ul>
          </div>
          <div className={styles["publicHeadComponentLogin"]}>
            <Link to="/login">Log in</Link>
            <Link to="/login">Get started</Link>
          </div>
        </div>
      </div>
      <div
        className={styles["componentBody"]}
        onScroll={handleScroll}
        id="bodyBox"
      >
        <div className={styles["componentBodyTitleBox"]}>
          <h1 className={styles["componentBodyTitle"]}>
            Create engaging infographics and reports in minutes
          </h1>
          <p className={styles["componentBodySubTitle"]}>
            Infogram is an intuitive visualization tool that empowers people and
            teams to create beautiful content.
          </p>
          <a className={styles["jionBtn"]}>Join Infogram now</a>
          <p className={styles["componentBodyTitleTip"]}>
            Design with ease <span />
            Collaborate in real-time <span />
            Download, share, and publish online
          </p>
        </div>
        <div className={styles["videoBox"]}>
          <video
            src="https://cdn-web.jifo.co/_next/static/9edb1fd731210835e562c426f23df553.mp4"
            muted
            playsInline
            loop
            autoPlay
            poster="https://cdn-web.jifo.co/_next/static/images/infogram_flex-d1d8a561a0e38ca37d9678062561218b.png"
          />
        </div>
        <div className={styles["introduceContent"]}>
          <div className={styles["introduceContentCardOne"]}>
            <div
              className={`${styles["introduceContentCardOnePic"]} ${styles["cardPicOne"]}`}
            />
            <div className={styles["introduceContentCardOneContent"]}>
              <div className={styles["introduceContentCardOneTitle"]}>
                Save time and stay on brand
              </div>
              <div
                className={`${styles["introduceContentCardOneText"]} ${styles["cardIconOne"]}`}
              >
                <h3>Start with our collection of designer templates</h3>
                <span>
                  Never stare at a blank screen again. Our ready-to-use
                  templates drive engagement, impress your audience, and look
                  perfectly polished.
                </span>
              </div>
              <div
                className={`${styles["introduceContentCardOneText"]} ${styles["cardIconTwo"]}`}
              >
                <h3>Stay on brand with company guidelines</h3>
                <span>
                  Get a custom template with your brand, colors, fonts, and
                  logo. Empower everyone on your team to create branded visuals
                  in minutes.
                </span>
              </div>
            </div>
          </div>
          <div className={styles["introduceContentCardOne"]}>
            <div
              className={styles["introduceContentCardOneContent"]}
              style={{ width: "48%" }}
            >
              <div className={styles["introduceContentCardOneTitle"]}>
                Wow your audience with interactive content
              </div>
              <div
                className={`${styles["introduceContentCardOneText"]} ${styles["cardIconThree"]}`}
              >
                <h3>Animations that amaze</h3>
                <span>
                  Take your stories to the next level with object animations.
                  Set objects to zoom, bounce, flip, fade, and slide
                  effortlessly into your work.
                </span>
              </div>
              <div
                className={`${styles["introduceContentCardOneText"]} ${styles["cardIconFour"]}`}
              >
                <h3>Interactive charts and maps</h3>
                <span>
                  We offer enhanced interactivity with tooltips, tabs, clickable
                  legends, linking, and so much more.
                </span>
              </div>
            </div>
            <div
              className={`${styles["introduceContentCardOnePic"]} ${styles["cardPicTwo"]}`}
            />
          </div>
          <div className={styles["introduceContentCardTwo"]}>
            <div className={styles["introduceContentCardTwoTitle"]}>
              Collaborate with your team in real time
            </div>
            <div
              className={`${styles["introduceContentCardTwoPic"]} ${styles["cardPicThree"]}`}
            />
            <div className={styles["introduceContentCardTwoContent"]}>
              <div
                className={`${styles["introduceContentCardTwoText"]} ${styles["cardIconFive"]}`}
              >
                <h3>Endless possibilities for collaboration</h3>
                <span>
                  Infogram is the perfect place for your company to visualize
                  data in real time. Create, edit, and publish projects from
                  your team library.
                </span>
              </div>
              <div
                className={`${styles["introduceContentCardTwoText"]} ${styles["cardIconSix"]}`}
              >
                <h3>Set permissions for your team</h3>
                <span>
                  Organize your team into groups and set permission levels by
                  role. Easily keep track of who is working on each project.
                </span>
              </div>
              <div
                className={`${styles["introduceContentCardTwoText"]} ${styles["cardIconSeven"]}`}
              >
                <h3>Version history</h3>
                <span>
                  Make changes without the stress. This feature lets you view
                  and restore earlier versions of your projects, so you’re free
                  to get creative.
                </span>
              </div>
            </div>
          </div>
          <div className={styles["introduceContentCardOne"]}>
            <div
              className={styles["introduceContentCardOneContent"]}
              style={{ width: "48%" }}
            >
              <div className={styles["introduceContentCardOneTitle"]}>
                Track how your work resonates with your audience
              </div>
              <div
                className={`${styles["introduceContentCardOneText"]} ${styles["cardIconEight"]}`}
              >
                <h3>Measure the metrics that matter</h3>
                <span>
                  Our powerful analytics gives you detailed viewer demographics,
                  average on-screen rate, and how many people shared your
                  content.
                </span>
              </div>
              <div
                className={`${styles["introduceContentCardOneText"]} ${styles["cardIconNine"]}`}
              >
                <h3>Interactivity you can count on</h3>
                <span>
                  Evaluate the tiniest of details. Keep track of how many people
                  hovered over your tooltips, or clicked on your tabs and
                  legends.
                </span>
              </div>
              <div
                className={`${styles["introduceContentCardOneText"]} ${styles["cardIconTen"]}`}
              >
                <h3>Custom tracking links</h3>
                <span>
                  Create individual tracking links and share them with clients
                  or others. See what parts they engage with most using
                  Infogram’s powerful analytics.
                </span>
              </div>
            </div>
            <div
              className={`${styles["introduceContentCardOnePic"]} ${styles["cardPicFour"]}`}
            />
          </div>
          <div className={styles["introduceContentCardOne"]}>
            <div
              className={`${styles["introduceContentCardOnePic"]} ${styles["cardPicFive"]}`}
            />
            <div className={styles["introduceContentCardOneContent"]}>
              <div className={styles["introduceContentCardOneTitle"]}>
                Create responsive content for web
              </div>
              <div
                className={`${styles["introduceContentCardOneText"]} ${styles["cardIconEleven"]}`}
              >
                <h3>Publish your content online</h3>
                <span>
                  Our fully responsive infographics look great across all
                  devices. Add them to Facebook Instant Articles, publish on
                  Medium, or use our Infogram WordPress plugin.
                </span>
              </div>
              <div
                className={`${styles["introduceContentCardOneText"]} ${styles["cardIconTwelve"]}`}
              >
                <h3>Optimized for mobile</h3>
                <span>
                  Infogram uses state-of-the-art technologies to offer the best
                  possible experience for the web and mobile devices.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["dataPresentation"]}>
          <p className={styles["dataPresentationTitle"]}>
            The simple way to make your data dazzle
          </p>
          <div className={styles["dataPresentationContent"]}>
            <div className={styles["dataPresentationCard"]}>
              <img
                src="https://cdn-web.jifo.co/_next/static/images/reports-62a6a609a1733d7282966334d01f912b.svg"
                alt={""}
                className={styles["dataPresentationCardPic"]}
              />
              <h3 className={styles["dataPresentationCardTitle"]}>
                Infographics
              </h3>
              <p className={styles["dataPresentationCardSubTitle"]}>
                Create stunning infographics that boost visitor engagement on
                your website or blog.
              </p>
            </div>
            <div className={styles["dataPresentationCard"]}>
              <img
                src="https://cdn-web.jifo.co/_next/static/images/pages-6c2912c447c8b70f7dbfc9531e80091e.svg"
                alt={""}
                className={styles["dataPresentationCardPic"]}
              />
              <h3 className={styles["dataPresentationCardTitle"]}>Reports</h3>
              <p className={styles["dataPresentationCardSubTitle"]}>
                Stand out with interactive marketing reports, sales figures, and
                more.
              </p>
            </div>
            <div className={styles["dataPresentationCard"]}>
              <img
                src="https://cdn-web.jifo.co/_next/static/images/slides-f3d4914356c3bffff8d2ab443f33128c.svg"
                alt={""}
                className={styles["dataPresentationCardPic"]}
              />
              <h3 className={styles["dataPresentationCardTitle"]}>Slides</h3>
              <p className={styles["dataPresentationCardSubTitle"]}>
                Present your ideas and showcase your data with our striking
                slide templates.
              </p>
            </div>
            <div className={styles["dataPresentationCard"]}>
              <img
                src="https://cdn-web.jifo.co/_next/static/images/dashboards-7a61be396e84728511f6be3ee29282c1.svg"
                alt={""}
                className={styles["dataPresentationCardPic"]}
              />
              <h3 className={styles["dataPresentationCardTitle"]}>
                Dashboards
              </h3>
              <p className={styles["dataPresentationCardSubTitle"]}>
                Connect your data to build live, easily shareable dashboards
                that visually track your business.
              </p>
            </div>
            <div className={styles["dataPresentationCard"]}>
              <img
                src="https://cdn-web.jifo.co/_next/static/images/maps-2c581649254b80179fc2c19d16f1db1a.svg"
                alt={""}
                className={styles["dataPresentationCardPic"]}
              />
              <h3 className={styles["dataPresentationCardTitle"]}>Maps</h3>
              <p className={styles["dataPresentationCardSubTitle"]}>
                Use our map maker to publish professional-quality interactive
                maps that impress and inform.
              </p>
            </div>
            <div className={styles["dataPresentationCard"]}>
              <img
                src="https://cdn-web.jifo.co/_next/static/images/sharing-5e6c72fcd4b364bced88518eeab84776.svg"
                alt={""}
                className={styles["dataPresentationCardPic"]}
              />
              <h3 className={styles["dataPresentationCardTitle"]}>
                Social media visuals
              </h3>
              <p className={styles["dataPresentationCardSubTitle"]}>
                Browse our extensive library of photos and icons to create
                stunning visuals for Facebook, Instagram, and Twitter.
              </p>
            </div>
          </div>
        </div>
        <div className={styles["possibilities"]}>
          <p className={styles["possibilitiesTitle"]}>
            Visualize endless possibilities
          </p>
          <div className={styles["possibilitiesLinksBox"]}>
            <div className={styles["possibilitiesLinks"]}>
              <img
                src="https://cdn-web.jifo.co/_next/static/images/marketing-03ca339dc5f8093495c0538cff928a62.svg"
                alt=""
                className={styles["possibilitiesLinksPic"]}
              />
              <p className={styles["possibilitiesLinksTitle"]}>Marketing</p>
            </div>
            <div className={styles["possibilitiesLinks"]}>
              <img
                src="https://cdn-web.jifo.co/_next/static/images/onlinepublishing-0d9eeeea6601ebc59a393a312d16719f.svg"
                alt=""
                className={styles["possibilitiesLinksPic"]}
              />
              <p className={styles["possibilitiesLinksTitle"]}>
                Online Publishing
              </p>
            </div>
            <div className={styles["possibilitiesLinks"]}>
              <img
                src="https://cdn-web.jifo.co/_next/static/images/education-fabf551fcedf630378599ea10a204841.svg"
                alt=""
                className={styles["possibilitiesLinksPic"]}
              />
              <p className={styles["possibilitiesLinksTitle"]}>Education</p>
            </div>
            <div className={styles["possibilitiesLinks"]}>
              <img
                src="https://cdn-web.jifo.co/_next/static/images/reporting-9a126afad53185d5b33025baa5fef934.svg"
                alt=""
                className={styles["possibilitiesLinksPic"]}
              />
              <p className={styles["possibilitiesLinksTitle"]}>Reporting</p>
            </div>
            <div className={styles["possibilitiesLinks"]}>
              <img
                src="https://cdn-web.jifo.co/_next/static/images/government-556639d33cb3d89fdbe882bc747da7d7.svg"
                alt=""
                className={styles["possibilitiesLinksPic"]}
              />
              <p className={styles["possibilitiesLinksTitle"]}>Government</p>
            </div>
            <div className={styles["possibilitiesLinks"]}>
              <img
                src="https://cdn-web.jifo.co/_next/static/images/nonprofit-b14e78e36f2676efc2eb781309d76ea7.svg"
                alt=""
                className={styles["possibilitiesLinksPic"]}
              />
              <p className={styles["possibilitiesLinksTitle"]}>Nonprofit</p>
            </div>
          </div>
        </div>
        <div className={styles["usingCompany"]}>
          <p className={styles["usingCompanyText"]}>
            Here are just a few of the 30,000+ companies that use Infogram
          </p>
          <img
            src="https://cdn-web.jifo.co/_next/static/images/logos-b54aff5d777e6ddf1952ed76e623d666.png"
            alt=""
            className={styles["usingCompanyPic"]}
          />
          <p className={styles["usingCompanyText"]}>
            Infogram has everything you need to create captivating visuals that
            impress and inform your audience.
          </p>
          <a className={styles["jionBtn"]}>Join Infogram now</a>
        </div>
        <div className={styles["moreLinksBoxBackground"]}>
          <div className={styles["moreLinksBox"]}>
            <div className={styles["moreLinks"]}>
              <h3 className={styles["moreLinksTitle"]}>Company</h3>
              <ul className={styles["moreLinksList"]}>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    About Us
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Careers
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles["moreLinks"]}>
              <h3 className={styles["moreLinksTitle"]}>Product</h3>
              <ul className={styles["moreLinksList"]}>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Features
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Interactive Content
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Integrations
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Pricing
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Customer Stories
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Templates
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Examples
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles["moreLinks"]}>
              <h3 className={styles["moreLinksTitle"]}>Use Cases</h3>
              <ul className={styles["moreLinksList"]}>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Media
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Marketing
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Education
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Government
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Nonprofit
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Reporting
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Teams
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles["moreLinks"]}>
              <h3 className={styles["moreLinksTitle"]}>Resources</h3>
              <ul className={styles["moreLinksList"]}>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Help & Tutorials
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Best Resources
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    eBooks
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Webinars
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Developer API
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Sitemap
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    Schedule a Demo
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles["moreLinks"]}>
              <h3 className={styles["moreLinksTitle"]}>Learn</h3>
              <ul className={styles["moreLinksList"]}>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    What is an Infographic?
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    How to choose the right chart or graph for your data?
                  </a>
                </li>
                <li className={styles["moreLinksLi"]}>
                  <a href="/" className={styles["moreLink"]}>
                    What is Data Visualization?
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles["publicFooterComponent"]}>
          <div className={styles["publicFooterBox"]}>
            <div className={styles["thirdPartyLinks"]}>
              <a href="/">
                <img
                  src="https://cdn-web.jifo.co/_next/static/images/facebook-grey-43a8d806c6bdaf4219f70f94195a1dbb.svg"
                  alt=""
                />
              </a>
              <a href="/">
                <img
                  src="https://cdn-web.jifo.co/_next/static/images/twitter-grey-b5366151e51804cdabf3bd4f90ea129b.svg"
                  alt=""
                />
              </a>
              <a href="/">
                <img
                  src="https://cdn-web.jifo.co/_next/static/images/linkedin-grey-e0ab450954cb8e8f3c961047acdf30e3.svg"
                  alt=""
                />
              </a>
            </div>
            <div className={styles["contactInformation"]}>
              <a href="/" className={styles["contactInformationInfo"]}>
                Contact Us
              </a>
              <a href="/" className={styles["contactInformationTel"]}>
                +1 650-729-1672
              </a>
              <a href="/" className={styles["contactInformationChat"]}>
                Chat now
              </a>
            </div>
            <div className={styles["languagesList"]}>
              <a data-language="en">English</a>
              <a data-language="de">Deutsch</a>
              <a data-language="pt">Português</a>
              <a data-language="es">Español</a>
              <a data-language="fr">Français</a>
            </div>
            <div className={styles["statementContent"]}>
              <p>
                <span>All rights reserved © 2021 Infogram.</span>
                <a href="">Terms</a>
                <span> & </span>
                <a href="">Privacy</a>
                <small>
                  Infogram and Infogr.am are registered trademarks of Prezi,
                  Inc.
                </small>
              </p>
            </div>
            <img
              src="https://cdn-web.jifo.co/_next/static/images/logo-trademark-a1bb3fdf1541073346cbee1239acc0c6.svg"
              alt=""
              className={styles["footerPic"]}
            />
          </div>
        </div>
      </div>
      <div className={styles["supportBtn"]}>
        <Button>支持</Button>
      </div>
    </div>
  );
};

export default HomePage;
