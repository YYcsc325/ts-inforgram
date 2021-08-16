import React, { ComponentType, Component } from "react";

type getValues = () => void;

type getValue = (key: string) => any;

type setValue = (key: string, value: any) => void;

export interface ICreateBaseStoreProps {
  getValue: getValue;
  getValues: getValues;
  setValue: setValue;
}

export default function createBaseDom(WarpedComponent: ComponentType<any>) {
  return class extends Component {
    state: any = {};

    getValues: getValues = () => this.state;
    getValue: getValue = (key) => this.state[key];
    setValue: setValue = (key, value) => {
      this.setState({
        [key]: value,
      });
    };

    render() {
      const dragForm = {
        getValue: this.getValue,
        getValues: this.getValues,
        setValue: this.setValue,
      };

      return <WarpedComponent {...this.props} dragForm={dragForm} />;
    }
  };
}
