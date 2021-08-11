import React, { Component } from "react";
import { childrenClone, childrenOnly } from "@/util/utils";

interface IDragFormItemProps {
  readonly name: string;
  readonly _drag?: any;
  readonly _dragValues?: any;
  readonly initailValue?: any;
}

class DragFormItem extends Component<IDragFormItemProps> {
  componentDidMount() {
    const { _drag, initailValue, name } = this.props;
    _drag.setValue(name, initailValue);
  }

  render() {
    const { name, children, _drag, _dragValues, initailValue } = this.props;

    const child: any = childrenOnly(children);

    return (
      <div data-name={name}>
        {childrenClone(child, {
          value: _dragValues[name] ?? initailValue,
          onChange: (val: any) => {
            let value = val;
            let targetValue = val?.target?.value;
            if (targetValue) {
              value = targetValue;
            }
            child.props.onChange?.(value);
            _drag.setValue(name, value);
          },
        })}
      </div>
    );
  }
}

export default DragFormItem;
