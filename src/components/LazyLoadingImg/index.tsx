import { Spin } from "antd";
import classNames from "classnames";
import React, {
  FC,
  useState,
  useEffect,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";

const prefixCls = createPrefixClass("lazy-loading", styles);

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface ILazyLoadingImgProps {
  [x: string]: any;
  url: string;
  className?: string;
}

const LazyLoadingImg: ForwardRefRenderFunction<
  HTMLDivElement,
  ILazyLoadingImgProps
> = ({ url, className, children, ...reset }, ref) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoading(true);
    };
    img.onerror = () => {
      throw new Error("Could not load image at " + url);
    };
    img.src = url;
    return () => {
      img.onload = null;
    };
  }, []);

  return (
    <div {...reset} className={classNames(prefixCls(), className)} ref={ref}>
      <Spin indicator={antIcon} spinning={!loading}>
        <div
          className={prefixCls("ready")}
          style={{ backgroundImage: `url(${url})` }}
        >
          {children}
        </div>
      </Spin>
    </div>
  );
};

LazyLoadingImg.displayName = "LazyLoadingImg";

export default forwardRef(LazyLoadingImg);
