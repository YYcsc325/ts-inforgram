import React, { Component } from "react";
import { Spin } from "antd";
import className from "classnames";

import styles from "./index.less";

interface ISpinsProps {
  spinning: boolean;
}

class Spins extends Component<ISpinsProps> {
  render() {
    const { spinning = false } = this.props;
    return (
      <div
        className={className(styles.spinWarp, {
          [styles.hasSpins]: spinning,
        })}
      >
        <Spin tip={"Loading..."} spinning={spinning} />
      </div>
    );
  }
}

export default Spins;
