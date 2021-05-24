import React, { FC, useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";
import { useSingleAndDoubleClick } from "@/util/useHook";

import styles from "./index.less";

const prefixCls = createPrefixClass("h-tag", styles);

interface IDragHTagProps {
  text: string;
  className?: string;
}

const DragHTag: FC<IDragHTagProps> = ({ text, className }) => {
  const [edit, setEdit] = useState(false);
  const targetRef = useRef(null);

  const doubleClick = () => {
    setEdit(true);
  };

  const handleClick = useSingleAndDoubleClick(() => {}, doubleClick);

  const setEditFlag = () => {
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
    >
      {text}
    </h1>
  );
};

export default DragHTag;
