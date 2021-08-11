import React, { Component } from "react";
import { childrenToArray } from "@/util/utils";

import DragFormItem from "./DragFormItem";
import createBaseClass, { ICreateBaseStoreProps } from "./createBaseClass";
import { DragContextProvider, DragContextConsumer } from "./context";

export interface IDragFormProps {
  drag: ICreateBaseStoreProps;
}

export default class DragForm extends Component<IDragFormProps> {
  static Item = DragFormItem;

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
