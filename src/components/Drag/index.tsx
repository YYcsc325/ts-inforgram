import React, { Component } from "react";

import DragItem from "./components/DragItem";
import { createBaseDom } from "./utils";

interface IDragState {
  a: string;
  b: string;
}

interface IDragProps {
  drag: any;
}

export default class Drag extends Component<IDragProps, IDragState> {
  static Item = DragItem;

  static create = createBaseDom;

  render() {
    const { children, drag } = this.props;

    const childList = React.Children.toArray(children);

    return (
      <div>
        {childList.map((child: any) =>
          React.cloneElement(child, {
            _setValue: (value: any) => drag.setValue(child.props.name, value),
          })
        )}
      </div>
    );
  }
}
