import { Checkbox } from "antd";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";
import React, { FC, useState, useCallback } from "react";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { LazyLoadingImg, CustomModal } from "@/components";
import IconPublic from "@/pages/library/components/IconPublic";
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
  const handleIconPublicClick = (e: any) => {
    e.stopPropagation();
    const modal = CustomModal.showModal({
      footer: null,
      onCancel: () => {
        modal.destroy();
      },
      onOk: () => {
        modal.destroy();
      },
      children: (
        <div>
          <div>奥术大师多</div>
          <div>按时肯定会啊</div>
        </div>
      ),
    });
  };
  return (
    <LazyLoadingImg
      className={classNames(prefixCls(), className)}
      onClick={handleClick}
      url={url}
    >
      <div>
        <div
          className={prefixCls("disgrace-ful")}
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
                <IconPublic onClick={handleIconPublicClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LazyLoadingImg>
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
