import React, { FC } from "react";
import { Spin } from "antd";
import className from "classnames";
import { createPrefixClass } from "@/util/utils";
import styles from "./index.less";

const prefixCls = createPrefixClass("spin", styles);

interface ISpinsProps {
  spinning: boolean;
}

const DtSpin: FC<ISpinsProps> = ({ spinning = false, children }) => {
  return (
    <div
      className={className(prefixCls(), {
        [prefixCls("hasSpins")]: spinning,
      })}
    >
      <Spin tip={"Loading..."} spinning={spinning}>
        {React.Children.map(children, (child) => child)}
      </Spin>
    </div>
  );
};

DtSpin.displayName = "DtSpin";

export default DtSpin;
