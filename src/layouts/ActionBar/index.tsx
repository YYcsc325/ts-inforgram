import React from "react";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";
import Odps from "./Odps";
import Shrinkage from "./Shrinkage";

const prefixCls = createPrefixClass("action-bar", styles);

interface IActionBarProps {
  showShrinkage?: boolean;
}

interface IActionBarState {
  isShowShrinkage: boolean;
}

class ActionBar extends React.Component<IActionBarProps, IActionBarState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isShowShrinkage: false,
    };
  }
  componentDidUpdate(preProps: any) {
    const { showShrinkage } = this.props;
    if (preProps.showShrinkage !== showShrinkage) {
      this.setState({
        isShowShrinkage: showShrinkage as boolean,
      });
    }
  }

  handleChangeShrinkage = (isOpen: boolean) => {
    this.setState({
      isShowShrinkage: isOpen,
    });
  };

  render() {
    const { isShowShrinkage } = this.state;
    return (
      <div className={prefixCls()}>
        <Odps onOpen={() => this.setState({ isShowShrinkage: true })} />
        <Shrinkage isOpen={isShowShrinkage} />
      </div>
    );
  }
}

export default ActionBar;
