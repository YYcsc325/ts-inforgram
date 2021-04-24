import React, { FC, useEffect } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

interface IAnalyticsProps {
  [x: string]: any;
}

const prefixCls = createPrefixClass("analytics", styles);

const Analytics: FC<IAnalyticsProps> = ({ consumer }) => {
  const handleClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };

  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  return (
    <div className={prefixCls()} onClick={handleClick}>
      <div className={prefixCls("top-warp")}>
        <div className={prefixCls("top")}>
          <img
            className={prefixCls("t-img")}
            src="https://cdn.jifo.co/js/dist/371cffe65a286109717147b4016a1b94.png"
            alt=""
          />
          <div className={prefixCls("t-engagement")}>Engagement analytics</div>
          <div className={prefixCls("t-message")}>
            Upgrade now to get detailed data from published projects and see
            what resonates with your audience.
          </div>
          <div className={prefixCls("t-btn")}>
            <a href="">Upgrade now</a>
          </div>
          <div className={prefixCls("t-jump")}>
            <a href="https://infogram.zendesk.com/hc/en-us/articles/360008797013-Engagement-Analytics">
              Find more about analytics
            </a>
          </div>
        </div>
      </div>
      <div className={prefixCls("bottom")}>
        <img
          src="https://cdn.jifo.co/js/dist/aec0c93ebc0798c323261afedb8aa7ab.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default contextConsumer(Analytics);
