import React, { ComponentType, Component } from "react";

export default function createBaseDom(WarpedComponent: ComponentType<any>) {
  return class extends Component {
    state: any = {};

    getValues = () => this.state;
    getValue = (key: string) => this.state[key];
    setValue = (key: string, value: any) => {
      this.setState({
        [key]: value,
      });
    };

    render() {
      const drag = {
        getValue: this.getValue,
        getValues: this.getValues,
        setValue: this.setValue,
      };

      return <WarpedComponent {...this.props} drag={drag} />;
    }
  };
}
