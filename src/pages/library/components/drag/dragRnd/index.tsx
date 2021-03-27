/**
 * @name  DragRnd
 * @auth  CENSHICHAO
 * @param { props , id必须 }
 * @description 渲染单个元素
 * @description { 性能缺点，onDrag, onResize的时候一直触发事件会很卡 }
 */

import React, { PureComponent } from "react";
import ImgBox from "./ImgBox";
import LineChart from "./LineChart";
import { spanRender } from "./position";
import className from "classnames";
import { Rnd } from "react-rnd";
import "./index.less";

// 渲染单个元素
const renderItem = (item) => {
  const { customType } = item;
  switch (customType) {
    case "img":
      return <ImgBox {...item} />;
    case "lineChart":
      return <LineChart {...item} />;
    default:
      return null;
  }
};
function noFunc() {}
class DragRnd extends PureComponent {
  constructor(props) {
    super(props);
    const { width, height, left, top } = props;
    this.state = {
      width: width || 550,
      height: height || 400,
      x: left - (width || 225),
      y: top - (height || 200),
    };
  }

  // 初始化记录4个角的坐标
  // componentDidMount(){
  //     const { setAllPosition = noFunc, id, allPosition = {}, width, height, left, top } = this.props;
  //     setAllPosition({
  //         ...allPosition,
  //         [id]: {
  //             left: left,
  //             top: top,
  //             right: left + (width || 550),
  //             bottom: top + (height || 400)
  //         }
  //     })
  // }
  render() {
    const { width, height, x, y } = this.state;

    const {
      id,
      isActive = false,
      allPosition = {},
      onHandleClick = noFunc,
      setAllPosition = noFunc,
    } = this.props;

    return (
      <Rnd
        key={id}
        size={{ width: width, height: height }}
        position={{ x: x, y: y }}
        className={className("dragWarpClass", {
          isActive: isActive,
        })}
        onMouseDown={(e) => {
          e.preventDefault();
          onHandleClick(id);
        }}
        onDrag={(e, d) => {
          // 拖动的时候记录4个点的位置
          setAllPosition({
            ...allPosition,
            [id]: {
              left: d.x,
              top: d.y,
              right: d.x + width,
              bottom: d.y + height,
              id: id,
            },
          });
        }}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          const { offsetWidth, offsetHeight } = ref;
          const { x, y } = position;
          // 缩放的时候记录4个点的位置
          setAllPosition({
            ...allPosition,
            [id]: {
              left: x,
              top: y,
              right: x + offsetWidth,
              bottom: y + offsetHeight,
              id: id,
            },
          });
          this.setState({
            width: offsetWidth,
            height: offsetHeight,
            ...position,
          });
        }}
      >
        {/* {
                    isActive && <div>
                        {
                            spanRender.map(item => <span className={className('defaultSpan', item.position)} key={item.position}></span>)
                        }
                    </div>
                } */}
        <div style={{ width: "100%", height: "100%" }}>
          {renderItem({ ...this.props, width, height })}
        </div>
      </Rnd>
    );
  }
}
export default DragRnd;
