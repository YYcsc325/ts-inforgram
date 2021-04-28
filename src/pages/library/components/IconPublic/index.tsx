import React, { FC } from "react";
import { createPrefixClass } from "@/util/utils";
import classNames from "classnames";
import { Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { TooltipPlacement } from "antd/lib/tooltip";

import styles from "./index.less";

const prefixCls = createPrefixClass("icon-public", styles);

interface IconPublicProps {
  className?: string;
  title?: string;
  position?: TooltipPlacement;
}

const IconPublic: FC<IconPublicProps> = ({
  className,
  position = "top",
  title = "Public",
  ...reset
}) => {
  return (
    <div {...reset} className={classNames(prefixCls(), className)}>
      <Tooltip placement={position} title={title} mouseEnterDelay={0.5}>
        <EditOutlined />
      </Tooltip>
    </div>
  );
};

export default IconPublic;
