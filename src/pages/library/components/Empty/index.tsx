import React, { FC } from "react";
import { createPrefixClass } from "@/util/utils";
import classNames from "classnames";

import styles from "./index.less";

const prefixCls = createPrefixClass("empty", styles);

interface IEmptyProps {
  text: string;
  className?: string;
}

const Empty: FC<IEmptyProps> = ({ text, className }) => {
  return (
    <div className={classNames(prefixCls(), className)}>
      <div className={prefixCls("icon")}>Try Again</div>
      <div className={prefixCls("result")}>No results found for "{text}"</div>
      <div className={prefixCls("keyword")}>Please try different keywords.</div>
      <div className={prefixCls("create")}>Create a project</div>
    </div>
  );
};

export default Empty;
