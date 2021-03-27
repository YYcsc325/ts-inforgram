import { Component, Fragment } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import classNames from "classnames";
import "./index.less";

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  totleMask = (isOpen) => {
    this.setState({
      isOpen,
    });
  };
  renderShow = (linkConfig) => {
    const { style, icon, content = "还没添加文案", linkType } = linkConfig;
    switch (linkType) {
      case "button":
        return (
          <Button
            style={style}
            type="primary"
            icon={icon}
            onClick={() => this.totleMask(true)}
          >
            {content}
          </Button>
        );
      default:
        return (
          <a style={style} onClick={() => this.totleMask(true)}>
            {content}
          </a>
        );
    }
  };
  render() {
    const { isOpen } = this.state;
    const { customClickRender, customMask, linkConfig = {} } = this.props;
    let finishRender = null;
    if (customClickRender) {
      finishRender = (
        <div onClick={() => this.totleMask(true)} style={{ cursor: "pointer" }}>
          {customClickRender}
        </div>
      );
    } else {
      finishRender = this.renderShow(linkConfig);
    }
    return (
      <Fragment>
        {finishRender}
        <div
          className={classNames("container", {
            needShow: !isOpen ? true : false,
          })}
        >
          <div className={"body"}>{customMask}</div>
          <div className={"close"}>
            <CloseOutlined onClick={() => this.totleMask(false)} />
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Preview;
