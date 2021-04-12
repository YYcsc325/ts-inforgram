/**
 * @name 介绍页面
 * @Auth CENSHICHAO
 */
import React, { Component } from "react";
import Container from "./dragTarget/Container";
import DragContext from "./DragContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

class Drag extends Component {
  render() {
    return (
      <DragContext.Provider value={{}}>
        <DndProvider backend={HTML5Backend}>
          <Container />
        </DndProvider>
      </DragContext.Provider>
    );
  }
}

export default Drag;
