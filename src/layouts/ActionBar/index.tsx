import React from "react";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";
import Odps from "./Odps";
import Shrinkage from "./Shrinkage";
import { actionBarItems } from "./mock";

const prefixCls = createPrefixClass("action-bar", styles);

interface IActionBarState {
  isShowShrinkage: boolean;
}

class ActionBar extends React.Component<any, IActionBarState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isShowShrinkage: false,
    };
  }

  handleChangeShrinkage = (isOpen: boolean) => {
    this.setState({
      isShowShrinkage: isOpen,
    });
  };

  render() {
    const { isShowShrinkage } = this.state;
    const key = window.location.hash?.split("#/docs")?.[1];
    const selectedBarId = actionBarItems.find((item) => item.link === key)?.id;

    return (
      <div className={prefixCls()}>
        <Odps
          onOpen={() => this.setState({ isShowShrinkage: true })}
          selectId={selectedBarId}
        />
        <Shrinkage isOpen={isShowShrinkage} selectId={selectedBarId} />
      </div>
    );
  }
}

export default ActionBar;
