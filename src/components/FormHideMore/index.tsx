import React, { Component } from "react";

export interface IHideMoreProps {
  text?: React.ReactNode;
  hide?: boolean;
  changeKeys: string[];
  changeHide: (params: string[]) => void;
}
interface IHideMoreState {
  hide: boolean;
}

class HideMore extends Component<IHideMoreProps, IHideMoreState> {
  constructor(props: IHideMoreProps) {
    super(props);
    this.state = {
      hide: props.hide === false ? false : true,
    };
  }

  componentDidMount() {
    const { changeKeys = [] } = this.props;
    this.props.changeHide(changeKeys);
  }

  handleHidemore() {
    const { hide } = this.state;
    const { changeKeys = [] } = this.props;
    this.setState({
      hide: !hide,
    });
    this.props.changeHide(!hide ? changeKeys : []);
  }

  render() {
    const { hide } = this.state;
    const { text = "更多选项" } = this.props;
    return (
      <div>
        <a onClick={this.handleHidemore.bind(this)}>
          {hide ? <span>{`展开${text}`}</span> : <span>{`收起${text}`}</span>}
        </a>
      </div>
    );
  }
}
export default HideMore;
