import React from "react";
import { createPrefixClass } from "@/util/utils";
import { IRouteComponentProps, useModel } from "umi";

import styles from "./index.less";

const prefixCls = createPrefixClass("team", styles);

const Team: React.FC<IRouteComponentProps> = () => {
  const [_, globalActions] = useModel("useGlobalModel.index");
  const handleClick = () => {
    globalActions.changeShrinkage(false);
  };

  React.useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className={prefixCls()} onClick={handleClick}>
      team
    </div>
  );
};

export default Team;
