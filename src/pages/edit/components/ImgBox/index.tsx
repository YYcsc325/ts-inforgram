import React, { FC, useState } from "react";
import { useDrag } from "react-dnd";
import { dragConsts } from "@/consts";
import { createPrefixClass } from "@/util/utils";
import classNames from "classnames";
import { v4 } from "uuid";

import styles from "./index.less";

const prefixCls = createPrefixClass("target-box", styles);
interface IImgBoxProps {
  name: string;
  url: string;
  type: string;
  className?: string;
}

const ImgBox: FC<IImgBoxProps> = ({ name, url, type, className, ...reset }) => {
  const [isEnter, setIsEnter] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: dragConsts.box,
    item: { ...reset, name, type, url, id: v4() },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log("您已经放下了", dropResult);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={drag}
      style={{ opacity } as React.CSSProperties}
      className={classNames(prefixCls(), className)}
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
          [prefixCls("disgrace-display")]: !isEnter,
        })}
      >
        <div className={prefixCls("insert")}>Insert</div>
      </div>
      <img src={url} alt="" className={prefixCls("img")} />
    </div>
  );
};

export default ImgBox;
