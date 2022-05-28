import React, { FC, useEffect } from "react";
import { createPrefixClass } from "@/util/utils";
import classNames from "classnames";
import { Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { TooltipPlacement } from "antd/lib/tooltip";
import { CustomModal } from "react-dtcomponents";
import Dialog from "@/pages/exhibition/library/components/ModalTemplate/Dialog";

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
  const handleIconPublicClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const modal = CustomModal.showModal({
      footer: null,
      customModalBody: true,
      width: 600,
      onCancel: () => {
        modal.destroy();
      },
      children: <Dialog onClose={() => modal.destroy()} />,
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
