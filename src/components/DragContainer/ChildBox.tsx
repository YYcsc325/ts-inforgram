import React, { Component, PropsWithChildren } from "react";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";
import { RedoOutlined } from "@ant-design/icons";
import { dragAllowConsts, eventButtons } from "@/consts";
import DragImg from "@/components/DragComponents/Img";
import { loadImg } from "@/util/utils";
import ContextMenu from "./ContextMenu";

import styles from "./ChildBox.less";
import { transform } from "./utils";

const { E, W, S, N, NE, NW, SE, SW, ROTATE, MOVE } = dragAllowConsts;

const prefixCls = createPrefixClass("dragable", styles);

const points = [E, W, S, N, NE, NW, SE, SW];

type IDragEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

type IDragData = {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  transform?: string;
};

export type handleDrag = (e: IDragEvent, id: string, data: IDragData) => void;

export interface IDragBoxProps {
  id: string; // 唯一标识
  scale?: boolean; // 是否开启等比例缩放
  left: number;
  top: number;
  width: number;
  height: number;
  isSingleClicked?: boolean;
  isDoubleClicked?: boolean;
  contextMenuConfig?: any;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove?: handleDrag;
  onMouseStart?: handleDrag;
  onMouseEnd?: handleDrag;
  onMemuClick?: (id: string, value: any) => void;
}

export type IDragBoxPropsWithChildren = PropsWithChildren<IDragBoxProps>;
export interface IDragBoxState {
  style: IDragData; // 内部存储样式 -> (left, top, width, height)
}
class ClassChildBox extends Component<
  IDragBoxPropsWithChildren,
  IDragBoxState
> {
  $node: any = null; // 当前组件最外层div的ref
  $direction: any = ""; // 记录拖拽的方位，是哪个方位引发的拖拽
  $isDown: boolean = false; // 记录鼠标是否按下
  $oriPos: any = {}; // 记录x,y坐标信息
  $parentNode: any = null; // 拖拽区域，父元素

  constructor(props: IDragBoxPropsWithChildren) {
    super(props);
    this.state = {
      style: {},
    };
  }

  // 鼠标被按下
  onMouseDown = (dir: string, e: any) => {
    // 鼠标右击按下取消事件
    if (e.button === eventButtons.EVENTBUTTON2) return;
    const { id } = this.props;

    const style = this.renderRealStyle();

    // 阻止事件冒泡
    e.stopPropagation();
    // 保存拖拽事件方向。
    this.$direction = dir;
    this.$isDown = true;
    this.$oriPos = { ...style, cX: e.clientX, cY: e.clientY };

    this.props.onMouseStart?.(e, id, style);
    // 在目标拖拽区域注册事件
    this.$parentNode?.addEventListener?.("mousemove", this.onMouseMove);
    this.$parentNode?.addEventListener?.("mouseup", this.onMouseUp);
  };

  // 鼠标移动
  onMouseMove = (e: any) => {
    e.stopPropagation();
    const { id } = this.props;
    // 判断鼠标是否按住
    if (!this.$isDown) return;

    const newStyle = transform(this.$direction, this.$oriPos, e);

    const { x, y }: any = this.props.onMouseMove?.(e, id, newStyle);

    this.setState({
      style: { ...newStyle, left: x, top: y },
    });
  };

  // 鼠标被抬起
  onMouseUp = (e: any) => {
    e.stopPropagation();
    this.$isDown = false;

    const { id } = this.props;

    const style = this.renderRealStyle();

    this.props.onMouseEnd?.(e, id, style);
    // 取消注册事件
    this.$parentNode?.removeEventListener?.("mousemove", this.onMouseMove);
    this.$parentNode?.removeEventListener?.("mouseup", this.onMouseUp);
  };

  /** 获取ref */
  handlePrivateRef = (node: any) => {
    this.$node = node;
    this.$parentNode = node?.parentNode;
  };

  handleChildStyle = () => {
    const { style } = this.state;
    const childNode = getComputedStyle(this.$node?.childNodes?.[0]);
    this.setState({
      style: {
        ...style,
        width: Number(childNode.width.replace(/px/g, "")),
        height: Number(childNode.height.replace(/px/g, "")),
      },
    });
  };

  componentDidMount() {
    // 获取子元素默认width跟height
    const { type, props }: any = this.props.children;
    if (type === DragImg) {
      loadImg(props.url, this.handleChildStyle);
    } else {
      this.handleChildStyle();
    }
  }

  /** 单击事件 */
  handleSingleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    this.props.onClick?.(e);
  };

  /** 双击事件 */
  handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    this.props.onDoubleClick?.(e);
  };

  /** 右击事件 */
  handleMemuClick = (id: string, { value }: any) => {
    this.props.contextMenuConfig?.onMemuClick?.(id, value);
  };

  renderRealStyle = () => {
    const { style } = this.state;
    const { width, height, left, top } = this.props;
    return {
      ...style,
      width: width ?? style.width,
      height: height ?? style.height,
      left: (left ?? style.left) || 0,
      top: (top ?? style.top) || 0,
    };
  };

  render() {
    const {
      id,
      children,
      contextMenuConfig,
      isSingleClicked,
      isDoubleClicked,
    } = this.props;

    const style = this.renderRealStyle();
    const child = React.Children.only(children) as any;

    return (
      <div
        style={style}
        data-id={id}
        data-x={style.left}
        data-y={style.top}
        data-width={style.width}
        data-heght={style.height}
        ref={this.handlePrivateRef}
        className={classNames(prefixCls(), {
          [prefixCls("clicked")]: isSingleClicked || isDoubleClicked,
        })}
        onMouseDown={this.onMouseDown.bind(this, MOVE)}
        onClick={this.handleSingleClick}
        onDoubleClick={this.handleDoubleClick}
      >
        {isDoubleClicked &&
          points.map((item) => (
            <div
              className={classNames(
                prefixCls("control-point"),
                prefixCls(`point-${item}`)
              )}
              key={item}
              onMouseDown={this.onMouseDown.bind(this, item)}
            ></div>
          ))}
        {isDoubleClicked && (
          <div
            className={classNames(prefixCls("rotate"))}
            onMouseDown={this.onMouseDown.bind(this, ROTATE)}
          >
            <RedoOutlined style={{ color: "#3494ce" }} />
          </div>
        )}
        <ContextMenu
          options={contextMenuConfig?.options || []}
          onMenuClick={this.handleMemuClick.bind(this, id)}
        >
          {React.cloneElement(child, { ...style, id })}
        </ContextMenu>
      </div>
    );
  }
}

export default ClassChildBox;
