import React, { FC, useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";
import { useSingleAndDoubleClick } from "@/util/useHook";

import styles from "./index.less";

const prefixCls = createPrefixClass("h-tag", styles);

interface IDragHTagProps {
  text: string;
  className?: string;
  width?: number;
  height?: number;
}

const DragHTag: FC<IDragHTagProps> = ({ text, className, width, height }) => {
  const [edit, setEdit] = useState(false);
  const targetRef: any = useRef(null);

  const doubleClick = () => {
    setEdit(true);
    targetRef?.current?.onfocus?.();
  };

  const handleClick = useSingleAndDoubleClick(() => {}, doubleClick);

  const setEditFlag = (e: any) => {
    if (e.target === targetRef.current) return;
    setEdit(false);
  };

  useEffect(() => {
    document.addEventListener("click", setEditFlag);
    return () => {
      document.removeEventListener("click", setEditFlag);
    };
  }, []);
  return (
    <h1
      ref={targetRef}
      contentEditable={edit}
      suppressContentEditableWarning
      className={classNames(
        prefixCls(),
        {
          [prefixCls("edit")]: edit,
        },
        className
      )}
      onClick={handleClick}
      style={{ width, height }}
      onMouseDown={(e) => {
        edit && e.stopPropagation();
      }}
    >
      {text}
    </h1>
  );
};

export default DragHTag;
