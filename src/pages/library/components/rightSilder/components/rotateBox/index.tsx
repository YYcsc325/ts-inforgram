import React, { FC, forwardRef, useState, useEffect } from "react";
import { createPrefixClass } from "@/util/utils";
import classNames from "classnames";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.less";

interface IRotateBoxProps {
  [x: string]: any;
  name?: string;
  className?: string;
}

interface IRotateBoxTemplateProps {
  width?: number;
  height?: number;
  className?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

interface IRotateBoxIconProps {
  backgroundColor?: string;
  iconType?: string;
}

interface IRotateAddIconProps {
  backgroundColor?: string;
}

const prefixCls = createPrefixClass("rotate-box", styles);

const RotateBox: FC<IRotateBoxProps> & {
  Icon: FC<IRotateBoxIconProps>;
  Template: FC<IRotateBoxTemplateProps>;
} = ({ className, name, style, children }) => {
  return (
    <div className={classNames(prefixCls(), className)} style={style}>
      {children}
      {name}
    </div>
  );
};

const RotateBoxTemplate: FC<IRotateBoxTemplateProps> = ({
  style,
  width,
  height,
  className,
  backgroundColor,
  children,
}) => {
  const [isEnter, setIsEnter] = useState(false);
  const child = React.Children.only(children);
  return (
    <div
      className={classNames(prefixCls("template"), className)}
      style={{ ...style, width: width || 70, height: height || 100 }}
      onMouseEnter={() => setIsEnter(true)}
      onMouseLeave={() => setIsEnter(false)}
    >
      {child}
      {isEnter && <RotateAddIcon backgroundColor={backgroundColor} />}
    </div>
  );
};

const RotateBoxIcon: FC<IRotateBoxIconProps> = ({
  backgroundColor,
  children,
}) => {
  return (
    <div className={prefixCls("icon")} style={{ backgroundColor }}>
      {children}
    </div>
  );
};

const RotateAddIcon: FC<IRotateAddIconProps> = ({ backgroundColor }) => {
  return (
    <div className={prefixCls("template-add")} style={{ backgroundColor }}>
      <PlusOutlined />
    </div>
  );
};

RotateBoxTemplate.displayName = "RotateBoxTemplate";
RotateBoxIcon.displayName = "RotateBoxIcon";
RotateBox.displayName = "RotateBox";

RotateBox.Icon = RotateBoxIcon;
RotateBox.Template = RotateBoxTemplate;

export default RotateBox;
