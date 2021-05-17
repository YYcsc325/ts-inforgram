import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";

const Font = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1203735_8zvarf1pug6.js",
});

export interface IconFontProps {
  type: string;
  [x: string]: any;
}

const IconFont: React.FC<IconFontProps> = ({ type, ...reset }) => {
  return <Font type={`icon-${type}`} {...reset} />;
};

export default IconFont;
