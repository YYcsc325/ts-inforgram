/**
 * @name  DragRnd
 * @auth  CENSHICHAO
 * @param { props , id必须 }
 * @description 渲染单个元素
 * @description { 性能缺点，onDrag, onResize的时候一直触发事件会很卡 }
 */

import React, { PureComponent } from "react";
import { Rnd } from "react-rnd";
import className from "classnames";
import { noop } from "lodash";

import { spanRender } from "./position";
import "./index.less";

export interface IDragRndProps {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  id?: string | number;
}

interface IDragRndState {
  x: number;
  y: number;
  width: number;
  height: number;
}

class DragRnd extends PureComponent<IDragRndProps, IDragRndState> {
  constructor(props: IDragRndProps) {
    super(props);
    const { width = 0, height = 0, left = 0, top = 0 } = props;
    this.state = {
      width: width || 550,
      height: height || 400,
      x: left - (width || 225),
      y: top - (height || 200),
    };
  }

  render() {
    const { width, height, x, y } = this.state;
    const { id, children } = this.props;
    return (
      <Rnd
        key={id}
        size={{ width: width, height: height }}
        default={{ x, y, width, height }}
        className={className("dragWarpClass")}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        onDrag={(e, d) => {}}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          const { offsetWidth, offsetHeight } = ref;
          const { x, y } = position;
          this.setState({
            width: offsetWidth,
            height: offsetHeight,
            ...position,
          });
        }}
      >
        {React.Children.map(children, (child: any) =>
          React.cloneElement(child, {
            x,
            y,
            width,
            height,
          })
        )}
      </Rnd>
    );
  }
}
export default DragRnd;
