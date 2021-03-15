import React, { Component } from "react";
import styles from "./index.less";

interface IRedicretComponentProps {
  name: string;
  rel: string;
  title: string;
  style: React.CSSProperties;
}

class RedicretComponent extends Component<IRedicretComponentProps> {
  render() {
    const { name = "", rel = "", title = "", style = {} } = this.props;
    const { backgroundColorHover, opacity, ...reset } = style;
    return (
      <a
        rel={rel}
        ref={(ref) => {
          this.aRef = ref;
        }}
        title={title}
        style={{ ...reset }}
        className={styles[rel]}
        onMouseOver={() => {
          this.aRef.style.backgroundColor = backgroundColorHover;
          this.aRef.style.opacity = opacity;
        }}
        onMouseOut={() => {
          this.aRef.style.backgroundColor = style.backgroundColor;
          this.aRef.style.opacity = 1;
        }}
      >
        {name}
      </a>
    );
  }
}
export default RedicretComponent;
