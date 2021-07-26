import React, { Component } from "react";
import { childrenToArray } from "@/util/utils";

import DragItem from "./DragItem";
import createBaseClass from "./createBaseClass";
import { ContextProvider, ContextConsumer } from "./context";

interface IDragProps {
  drag: any;
}

export default class Drag extends Component<IDragProps, { [x: string]: any }> {
  static Item = DragItem;

  static create = createBaseClass;

  render() {
    const { children, drag } = this.props;

    return (
      <ContextProvider
        value={{
          _drag: drag,
        }}
      >
        {childrenToArray(children).map((child: any) => (
          <ContextConsumer>{child}</ContextConsumer>
        ))}
      </ContextProvider>
    );
  }
}
