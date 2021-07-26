import React, { ComponentType, Component } from "react";

export default function createBaseDom(WarpedComponent: ComponentType<any>) {
  return class extends Component {
    state: any = {
      store: {},
    };

    getValues = () => this.state.store;
    getValue = (key: string) => this.state.store[key];
    setValue = (key: string, value: any) =>
      this.setState({
        store: {
          ...this.state.store,
          [key]: value,
        },
      });
    setInitailValue = (value: any) => {
      this.setState({ store: value });
    };

    render() {
      const drag = {
        getValue: this.getValue,
        getValues: this.getValues,
        setValue: this.setValue,
        setInitailValue: this.setInitailValue,
      };

      return <WarpedComponent {...this.props} drag={drag} />;
    }
  };
}
