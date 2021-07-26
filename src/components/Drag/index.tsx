import React, { Component } from "react";
import { childrenToArray } from "@/util/utils";

import DragItem from "./DragItem";
import createBaseClass from "./createBaseClass";
import { DragContextProvider, DragContextConsumer } from "./context";

interface IDragProps {
  drag: any;
}

export default class Drag extends Component<IDragProps> {
  static Item = DragItem;

  static create = createBaseClass;

  render() {
    const { children, drag } = this.props;
    return (
      <DragContextProvider
        value={{
          _drag: drag,
          _dragValues: drag.getValues(),
        }}
      >
        {childrenToArray(children).map((child: any) => (
          <DragContextConsumer key={child.props.name}>
            {child}
          </DragContextConsumer>
        ))}
      </DragContextProvider>
    );
  }
}
