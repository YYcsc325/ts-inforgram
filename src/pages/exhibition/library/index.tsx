import React from "react";
import { createPrefixClass } from "@/util/utils";
import { useModel, IRouteComponentProps } from "umi";

import Container from "./Container";
import styles from "./index.less";

const prefixCls = createPrefixClass("library", styles);

const Library: React.FC<IRouteComponentProps> = () => {
  const [_e, exhibitionActions] = useModel("useExhibitionModel.index");
  const [_g, globalActions] = useModel("useGlobalModel.index");

  React.useEffect(() => {
    globalActions.changeShrinkage(true);
    exhibitionActions.fetchProjectList();
    return () => {
      exhibitionActions.initStore();
    };
  }, []);

  return (
    <div className={prefixCls()}>
      <Container />
    </div>
  );
};

export default Library;
