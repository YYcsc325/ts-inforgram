import React, { Component } from "react";
import { Spin } from "antd";
import className from "classnames";
import styles from "./index.less";

class Spins extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
