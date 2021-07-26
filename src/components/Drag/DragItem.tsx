import React, { Component } from "react";
import { childrenClone, childrenOnly } from "@/util/utils";

interface IDragItemProps {
  readonly name: string;
  readonly _drag?: any;
  readonly initailValue?: any;
}

class DragItem extends Component<IDragItemProps> {
  componentDidMount() {
    const { _drag, initailValue, name } = this.props;
    _drag.setValue(name, initailValue);
  }

  render() {
    const { name, children, _drag } = this.props;

    const child: any = childrenOnly(children);

    const values = _drag.getValues();

    return (
      <div data-name={name}>
        {childrenClone(child, {
          value: values[name] || undefined,
          onChange: (val: any) => {
            child.props.onChange?.(val);
            _drag.setValue(name, val);
          },
        })}
      </div>
    );
  }
}

export default DragItem;
