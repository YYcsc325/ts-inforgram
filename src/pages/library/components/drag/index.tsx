/**
 * @name 介绍页面
 * @Auth CENSHICHAO
 */
import React, { Component } from "react";
import Container from "./dragTarget/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

class Drag extends Component {
  render() {
    return (
      <div className="App">
        <DndProvider backend={HTML5Backend}>
          <Container />
        </DndProvider>
      </div>
    );
  }
}

export default Drag;
