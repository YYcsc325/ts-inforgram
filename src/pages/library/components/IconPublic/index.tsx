import React, { FC } from "react";
import { createPrefixClass } from "@/util/utils";
import classNames from "classnames";
import { Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { TooltipPlacement } from "antd/lib/tooltip";
import { CustomModal } from "@/components";

import styles from "./index.less";

const prefixCls = createPrefixClass("icon-public", styles);

interface IconPublicProps {
  [x: string]: any;
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
  const handleIconPublicClick = (e: any) => {
    e.stopPropagation();
    const modal = CustomModal.showModal({
      footer: null,
      customModalBody: true,
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
    <div
      {...reset}
      className={classNames(prefixCls(), className)}
      onClick={handleIconPublicClick}
    >
      <Tooltip placement={position} title={title} mouseEnterDelay={0.5}>
        <EditOutlined />
      </Tooltip>
    </div>
  );
};

export default IconPublic;
