import React, { Component, useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';

class CustomModal extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { visible = false, destroy = () => {} } = this.props;
        return (
            <Modal 
              visible={visible}
              onCancel={() => {
                destroy()
              }}
              onOk={() => {
                destroy()
              }}
            />
        )
    }
}

class StaticModal extends Component {

    static showModal = (props) => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const ref = React.createRef();
        ReactDOM.render(<CustomModal ref={ref} {...props} visible={true}/>, div);
        return {
            destroy: () => {
                const unmountResult = ReactDOM.unmountComponentAtNode(div);
                if (unmountResult && div.parentNode) {
                  div.parentNode.removeChild(div);
                }
              },
        }
    }
    render() {
        return (
            <CustomModal {...this.props} />
        )
    }
}

export default StaticModal;