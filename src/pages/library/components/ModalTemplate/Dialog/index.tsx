import React, { FC, useState } from "react";
import { createPrefixClass } from "@/util/utils";
import classNames from "classnames";
import { CloseOutlined, LeftOutlined } from "@ant-design/icons";

import styles from "./index.less";

const prefixCls = createPrefixClass("dialog", styles);

interface IDialogProps {
  [x: string]: any;
  onClose: () => void;
}

const Dialog: FC<IDialogProps> = () => {
  const [title, setTitle] = useState("Publish & Share");
  return (
    <div className={prefixCls()}>
      <div className={prefixCls("header")}>
        <span className={prefixCls("back")}>
          <LeftOutlined />
          Back
        </span>
        <span>{title}</span>
        <span className={prefixCls("close")}>
          <CloseOutlined />
        </span>
      </div>
      <div className={prefixCls("tab")}></div>
    </div>
  );
};

export default Dialog;
