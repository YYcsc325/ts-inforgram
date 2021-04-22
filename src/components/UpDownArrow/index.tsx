import React, { FC } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

interface IUpDownArrowProps {
  type: "up" | "down";
  className?: string;
}

const UpDownArrow: FC<IUpDownArrowProps> = ({ type, ...reset }) => {
  const Icon = type === "up" ? UpOutlined : DownOutlined;

  return <Icon {...reset} />;
};

export default UpDownArrow;
