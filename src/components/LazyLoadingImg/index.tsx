import { Spin } from "antd";
import classNames from "classnames";
import React, { FC, useState, useEffect } from "react";
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

const LazyLoadingImg: FC<ILazyLoadingImgProps> = ({
  url,
  className,
  children,
  ...reset
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoading(true);
    };
    img.src = url;
  }, []);

  const renderChildren = () => {
    return (
      <div
        className={prefixCls("ready")}
        style={{ backgroundImage: `url(${url})` }}
      >
        {children}
      </div>
    );
  };

  return (
    <div {...reset} className={classNames(prefixCls(), className)}>
      <Spin indicator={antIcon} spinning={!loading}>
        {renderChildren()}
      </Spin>
    </div>
  );
};

export default LazyLoadingImg;
