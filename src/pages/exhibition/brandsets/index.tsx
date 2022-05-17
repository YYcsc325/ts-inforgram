import React from "react";
import { createPrefixClass } from "@/util/utils";
import { IRouteComponentProps, useModel } from "umi";

import styles from "./index.less";

const prefixCls = createPrefixClass("brandsets", styles);

const Brandsets: React.FC<IRouteComponentProps> = (props) => {
  const [_, globalActions] = useModel("useGlobalModel.index");
  const handleClick = () => {
    globalActions.changeShrinkage(false);
  };

  React.useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className={prefixCls()} onClick={handleClick}>
      Brandsets
    </div>
  );
};

export default Brandsets;
