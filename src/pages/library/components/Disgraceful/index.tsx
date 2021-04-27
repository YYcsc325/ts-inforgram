import React, { FC, useState, useCallback } from "react";
import { createPrefixClass } from "@/util/utils";
import { Checkbox } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import classNames from "classnames";

import styles from "./index.less";

const prefixCls = createPrefixClass("container", styles);

interface IDisgracefulProps {
  url: string;
  id: string;
  name: string;
  checked?: boolean;
  className?: string;
  onCheck: (e: boolean) => void;
  onClick?: (id: string) => void;
}

const Disgraceful: FC<IDisgracefulProps> & {
  Icon: FC<IDisgracefulIconProps>;
} = ({ url, checked, onCheck, className, onClick, id, name }) => {
  const [isEnter, setIsEnter] = useState(false);

  const handleClick = useCallback(() => {
    onClick?.(id);
  }, [onClick]);

  const handleCheck = useCallback(
    (e) => {
      e.stopPropagation();
      onCheck?.(e.target.checked);
    },
    [onCheck]
  );

  return (
    <div className={classNames(prefixCls(), className)} onClick={handleClick}>
      <div
        className={prefixCls("disgrace-ful")}
        style={{
          backgroundImage: `url(${url})`,
        }}
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
          })}
        >
          {!isEnter && <div className={prefixCls("title")}>Public</div>}
          {(isEnter || checked) && (
            <div className={prefixCls("title-checkbox")}>
              <Checkbox onClick={handleCheck} checked={checked} />
            </div>
          )}
          {isEnter && (
            <div className={prefixCls("hover-title")}>
              <DisgracefulIcon>
                <EditOutlined />
              </DisgracefulIcon>
              <DisgracefulIcon style={{ marginLeft: "10px" }}>
                <EllipsisOutlined />
              </DisgracefulIcon>
            </div>
          )}
          {isEnter && <div className={prefixCls("edit")}>Edit</div>}
          <div className={prefixCls("footer")}>
            <div>{name}</div>
            <div>
              <EditOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IDisgracefulIconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const DisgracefulIcon: FC<IDisgracefulIconProps> = ({
  className,
  style,
  children,
  onClick,
}) => {
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      onClick?.();
    },
    [onClick]
  );
  return (
    <div
      className={classNames(prefixCls("icon"), className)}
      style={style}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

Disgraceful.Icon = DisgracefulIcon;

export default Disgraceful;

const data = [
  {
    title: "中国",
    id: "1",
    children: [
      {
        title: "北京",
        id: "1-1",
      },
      {
        title: "上海",
        id: "1-2",
      },
    ],
  },
];

const option = [
  {
    title: "中国-北京",
    id: "1-1",
  },
  {
    title: "中国-上海",
    id: "1-2",
  },
];

option.find((item) => item.title);
