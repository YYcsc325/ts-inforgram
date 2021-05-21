import React, { Component, PropsWithChildren } from "react";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";
import { RedoOutlined } from "@ant-design/icons";
import { dragAllowConsts } from "@/consts";

import styles from "./ChildBox.less";
import { transform, transformScale } from "./utils";
import { contextConsumer } from "./context";

const { E, W, S, N, NE, NW, SE, SW, ROTATE, MOVE } = dragAllowConsts;

const prefixCls = createPrefixClass("dragable", styles);

const points = [E, W, S, N, NE, NW, SE, SW];

type IDragEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

type IDragData = { left: number; top: number; width: number; height: number };

type handleDrag = (e: IDragEvent, id: string, data: IDragData) => void;

export interface IDragBoxProps {
  id: string; // 唯一标识
  scale?: boolean; // 是否开启等比例缩放
  defaultPostion?: Pick<IDragData, "left" | "top">;
  defaultStyle?: Pick<IDragData, "width" | "height">;
  onDrag?: handleDrag;
  onStart?: handleDrag;
  onEnd?: handleDrag;
  [x: string]: any;
}

export type IDragBoxPropsWithChildren = PropsWithChildren<IDragBoxProps>;
export interface IDragBoxState {
  style: IDragData;
  targetArea: Document | Element;
}
class ClassChildBox extends Component<
  IDragBoxPropsWithChildren,
  IDragBoxState
> {
  $direction: any = "";
  $isDown: boolean = false;
  oriPos: any = {};

  constructor(props: IDragBoxPropsWithChildren) {
    super(props);
    this.state = {
      style: {
        ...{
          left: props?.defaultPostion?.left ?? 0,
          top: props?.defaultPostion?.top ?? 0,
        },
        ...{
          width: props?.defaultStyle?.width ?? 100,
          height: props?.defaultStyle?.height ?? 100,
        },
      },
      targetArea: props._dragArea || document,
    };
  }

  // 鼠标被按下
  onMouseDown = (dir: string, e: any) => {
    const { id } = this.props;
    const { targetArea, style } = this.state;
    // 阻止事件冒泡
    e.stopPropagation();
    // 阻止默认行为
    e.preventDefault();
    // 保存拖拽事件方向。
    this.$direction = dir;
    this.$isDown = true;
    this.oriPos = { ...style, cX: e.clientX, cY: e.clientY };

    this.props._onStart?.(e, id, style);
    // 在目标拖拽区域注册事件
    targetArea?.addEventListener?.("mousemove", this.onMouseMove);
    targetArea?.addEventListener?.("mouseup", this.onMouseUp);
  };

  // 鼠标移动
  onMouseMove = (e: any) => {
    e.stopPropagation();

    const { scale } = this.props;
    // 判断鼠标是否按住
    if (!this.$isDown) return;

    const newStyle = scale
      ? transformScale(this.$direction, this.oriPos, e)
      : transform(this.$direction, this.oriPos, e);
    const { x, y } = this.props._onDrag?.(newStyle.left, newStyle.top);
    this.setState({
      style: { ...newStyle, left: x, top: y },
    });
  };

  // 鼠标被抬起
  onMouseUp = (e: any) => {
    e.stopPropagation();
    const { id } = this.props;
    const { style, targetArea } = this.state;
    this.$isDown = false;

    this.props._onEnd?.(e, id, style);
    // 取消注册事件
    targetArea?.removeEventListener?.("mousemove", this.onMouseMove);
    targetArea?.removeEventListener?.("mouseup", this.onMouseUp);
  };

  /** 更新指定拖拽区域 */
  componentDidUpdate(preProps: any) {
    if (preProps?.consumer?._dragArea !== this.props.consumer?._dragArea) {
      this.setState({
        targetArea: this.props.consumer?._dragArea,
      });
    }
  }
  render() {
    const { children, id, consumer } = this.props;
    const { style } = this.state;
    const isClicked = consumer?._clickId === id;
    return (
      <div
        style={style}
        data-id={id}
        data-x={style.left}
        data-y={style.top}
        data-width={style.width}
        data-heght={style.height}
        className={classNames(prefixCls(), {
          [prefixCls("clicked")]: isClicked,
        })}
        onMouseDown={(e) => this.onMouseDown(MOVE, e)}
        onClick={(e) => {
          this.props._onClick?.(e);
          this.props.onClick?.(e);
        }}
      >
        {isClicked &&
          points.map((item) => (
            <div
              className={classNames(
                prefixCls("control-point"),
                prefixCls(`point-${item}`)
              )}
              key={item}
              onMouseDown={(e) => this.onMouseDown(item, e)}
            ></div>
          ))}
        {isClicked && (
          <div
            className={classNames(prefixCls("rotate"))}
            onMouseDown={(e) => this.onMouseDown(ROTATE, e)}
          >
            <RedoOutlined style={{ color: "#3494ce" }} />
          </div>
        )}
        {children}
      </div>
    );
  }
}

export default contextConsumer(ClassChildBox);
