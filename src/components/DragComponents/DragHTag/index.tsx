import React, { FC, useState, useRef } from "react";
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
  const [clicked, setClicked] = useState(false);
  const targetRef = useRef(null);

  const simpleClick = () => {
    setClicked(true);
  };
  const doubleClick = () => {
    setEdit(true);
  };

  const handleClick = useSingleAndDoubleClick(simpleClick, doubleClick);

  document.onclick = (e: any) => {
    if (e.target !== targetRef.current) {
      setClicked(false);
      setEdit(false);
    }
  };
  return (
    <h1
      ref={targetRef}
      contentEditable={edit}
      suppressContentEditableWarning
      className={classNames(
        prefixCls(),
        {
          [prefixCls("clicked")]: clicked,
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
