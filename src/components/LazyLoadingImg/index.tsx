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
    img.src = url;
    img.onload = () => {
      setLoading(true);
    };
  }, []);
  const child = React.Children.only(children);
  return (
    <div {...reset} className={classNames(prefixCls(), className)}>
      {loading ? (
        <div
          className={prefixCls("ready")}
          style={{ backgroundImage: `url(${url})` }}
        >
          {child}
        </div>
      ) : (
        <div className={prefixCls("pedding")}>
          <Spin indicator={antIcon}>{child}</Spin>
        </div>
      )}
    </div>
  );
};

export default LazyLoadingImg;
