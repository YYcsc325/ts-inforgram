import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";
import React, { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { LazyLoadingImg } from "@/components";

import styles from "./index.less";

const prefixCls = createPrefixClass("template-card", styles);

interface ITemplateCardProps {
  title: React.ReactNode;
  url?: string;
  width: number | string;
  height: number | string;
  className?: string;
}

const TemplateCard: ForwardRefRenderFunction<
  HTMLDivElement,
  ITemplateCardProps
> = ({ width, height, url, className, title }, ref) => {
  const [isEnter, setIsEnter] = useState(false);
  return (
    <div className={classNames(prefixCls(), className)}>
      <LazyLoadingImg
        className={prefixCls("lazy-img")}
        style={{ width, height }}
        url={url}
        onMouseEnter={() => {
          setIsEnter(true);
        }}
        onMouseLeave={() => {
          setIsEnter(false);
        }}
      >
        <div
          className={classNames(prefixCls("disgrace"), {
            [prefixCls("disgrace-hover")]: isEnter,
            [prefixCls("disgrace-display")]: !isEnter,
          })}
          style={{ width, height }}
        >
          <div className={prefixCls("content")}>
            <div className={prefixCls("preview")}>Preview</div>
            <div className={prefixCls("use")}>Use</div>
          </div>
        </div>
      </LazyLoadingImg>
      <div className={prefixCls("title")}>{title}</div>
    </div>
  );
};

export default forwardRef(TemplateCard);
