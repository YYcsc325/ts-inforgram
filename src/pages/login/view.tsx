import React, { Component } from 'react';
import Spins from '@/components/Spin';

import LeftComponent from './components/LeftComponent';
import RightComponent from './components/RightComponent';
import styles from './index.less';

class Index extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    const { loginLoading = false } = this.props;
    return (
      <div className={styles['signup-form-container']}>
        <Spins spinning={loginLoading} />
        <LeftComponent />
        <RightComponent history={this.props.history} />
      </div>
    );
  }
}

// "react-dnd-html5-backend": "11.1.3",
// "react-dnd": "11.1.3",
// "react-rnd": "10.1.9",
// "immutability-helper": "^3.0.0"

export default Index;
