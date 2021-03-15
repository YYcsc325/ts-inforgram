import React, { Component } from 'react';

class HideMore extends Component {
  constructor(props) {
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
    const { text = '更多选项' } = this.props;
    return (
      <div>
        <a onClick={this.handleHidemore.bind(this)}>
          {hide ? (
            <span>
              {`展开${text}`}
            </span>
          ) : (
            <span>
               {`收起${text}`}
            </span>
          )}
        </a>
      </div>
    );
  }
}
export default HideMore;
