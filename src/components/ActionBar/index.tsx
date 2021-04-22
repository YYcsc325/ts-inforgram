import React from "react";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";
import Odps from "./components/Odps";
import Shrinkage from "./components/Shrinkage";

const prefixCls = createPrefixClass("action-bar", styles);

interface IActionBarProps {
  showShrinkage: boolean;
}

interface IActionBarState {
  isShowShrinkage: boolean;
}

class ActionBar extends React.Component<IActionBarProps, IActionBarState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isShowShrinkage: props.showShrinkage || false,
    };
  }
  handleOpenShrinkage = (bol: boolean) => {
    this.setState({
      isShowShrinkage: bol,
    });
  };
  render() {
    const { isShowShrinkage } = this.state;
    return (
      <div className={prefixCls()}>
        <Odps onOpen={() => this.handleOpenShrinkage(true)} />
        <Shrinkage isOpen={isShowShrinkage} />
      </div>
    );
  }
}

export default ActionBar;
