import React, { Component, PropsWithChildren } from "react";
import classNames from "classnames";
import { createPrefixClass, filterChildren } from "@/util/utils";

import ChildBox from "./ChildBox";
import ShrinkLine from "./ShrinkLine";
import { ContextProvider } from "./context";
import { unique, checkArrayWithPush, getMaxDistance } from "./utils";
import styles from "./index.less";

const prefixCls = createPrefixClass("drag-container", styles);

interface IDragContainerProps {
  className?: string;
  style?: React.CSSProperties;
  onChildClick?: (params: any) => void;
  onChildDrag?: (params: { string: any }) => void;
}

type IDragContainerPropsWithChildren = PropsWithChildren<IDragContainerProps>;

interface IDragContainerState {
  singleClickId?: string;
  doubleClickId?: string;
  style?: React.CSSProperties;
  vLines: string[];
  hLines: string[];
  indices: string[];
}

class DragContainer extends Component<
  IDragContainerPropsWithChildren,
  IDragContainerState
> {
  static Box: any = ChildBox;
  $nodeRef: any = null;
  $children: any = [];

  constructor(props: IDragContainerPropsWithChildren) {
    super(props);
    const { style } = props;
    this.state = {
      singleClickId: undefined,
      doubleClickId: undefined,
      vLines: [],
      hLines: [],
      indices: [],
      style: {
        ...style,
        width: style?.width || "100%",
        height: style?.height || "800px",
      },
    };
  }

  privateClick = () => {
    this.setState({
      singleClickId: "",
      doubleClickId: "",
    });
  };

  componentDidMount() {
    document.addEventListener("click", this.privateClick);
  }
  componentDidUpdate(preProps: IDragContainerProps) {
    if (preProps.style !== this.props.style) {
      this.setState({ style: this.props.style });
    }
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.privateClick);
  }

  /** 存储当前组件的ref */
  handleRoot = (node: any) => {
    this.$nodeRef = node;
  };

  handleChildClick = (e: any, props: any = {}) => {
    event?.stopImmediatePropagation();
    this.setState({
      singleClickId: props.id,
    });
  };

  handleChildDoubleClick = (e: any, props: any = {}) => {
    event?.stopImmediatePropagation();
    this.setState({
      doubleClickId: props.id,
    });
  };

  // 拖拽初始时 计算出所有元素的坐标信息，存储于childPos
  handleChildStart = () => {
    this.$children = filterChildren(this.props.children, ChildBox).map(
      (item, i) => {
        const $ = this.$nodeRef?.childNodes?.[i];
        const x = Number($.getAttribute("data-x"));
        const y = Number($.getAttribute("data-y"));
        const w = $.clientWidth;
        const h = $.clientHeight;

        return {
          $,
          i,
          x,
          y,
          w,
          h,
          l: x,
          r: x + w,
          t: y,
          b: y + h,
          lr: x + w / 2,
          tb: y + h / 2,
        };
      }
    );
  };

  /** 拖拽结束 */
  handleChildEnd = () => {
    this.setState({ vLines: [], hLines: [], indices: [] });
  };

  // 拖动中计算是否吸附/显示辅助线
  handleChildDrag = (index: number) => {
    return (x: any, y: any) => {
      const target = this.$children?.[index];
      const compares = this.$children?.filter(
        (_: any, i: number) => i !== index
      );

      if (compares.length === 0) {
        return { x, y };
      }

      return this.calcAndDrawLines({ x, y }, target, compares);
    };
  };
  /**
   * @param {Object} values xy坐标
   * @param {Object} target 拖拽目标
   * @param {Array} compares 对照组
   */
  calcAndDrawLines = (values: any, target: any, compares: any) => {
    const {
      v: x,
      indices: indices_x,
      lines: vLines,
    }: any = this.calcPosValues(values, target, compares, "x");
    const {
      v: y,
      indices: indices_y,
      lines: hLines,
    }: any = this.calcPosValues(values, target, compares, "y");

    const indices = unique(indices_x.concat(indices_y));

    if (vLines.length && hLines.length) {
      vLines.forEach((line: any) => {
        const compare = compares.find(({ i }: any) => i === line.i);
        const { length, origin } = this.calcLineValues(
          { x, y },
          target,
          compare,
          "x"
        );

        line.length = length;
        line.origin = origin;
      });

      hLines.forEach((line: any) => {
        const compare = compares.find(({ i }: any) => i === line.i);
        const { length, origin } = this.calcLineValues(
          { x, y },
          target,
          compare,
          "y"
        );

        line.length = length;
        line.origin = origin;
      });
    }

    this.setState({
      vLines,
      hLines,
      indices,
    });

    return { x, y };
  };

  calcLineValues = (values: any, target: any, compare: any, key: string) => {
    const { x, y } = values;
    const { h: H, w: W } = target;
    const { l, r, t, b } = compare;
    const T = y,
      B = y + H,
      L = x,
      R = x + W;

    const direValues: any = {
      x: [t, b, T, B],
      y: [l, r, L, R],
    };

    const length = getMaxDistance(direValues[key]);
    const origin = Math.min(...direValues[key]);
    return { length, origin };
  };

  calcPosValues = (values: any, target: any, compares: any, key: string) => {
    const results = {};

    const directions: any = {
      x: ["ll", "rr", "lr"],
      y: ["tt", "bb", "tb"],
    };
    const propsDirections = ["tt", "bb", "ll", "rr", "tb", "lr"];
    // filter unnecessary directions
    const validDirections = directions[key].filter((dire: any) =>
      propsDirections.includes(dire)
    );

    compares.forEach((compare: any) => {
      validDirections.forEach((dire: any) => {
        const { near, dist, value, origin, length }: any =
          this.calcPosValuesSingle(values, dire, target, compare, key);
        if (near) {
          checkArrayWithPush(results, dist, {
            i: compare.i,
            $: compare.$,
            value,
            origin,
            length,
          });
        }
      });
    });

    const resultArray = Object.entries(results);
    if (resultArray.length) {
      const [minDistance, activeCompares]: any = resultArray.sort(
        ([dist1], [dist2]) => Math.abs(Number(dist1)) - Math.abs(Number(dist2))
      )[0];
      const dist = parseInt(minDistance);
      return {
        v: values[key] - dist,
        dist: dist,
        lines: activeCompares,
        indices: activeCompares.map(({ i }: any) => i),
      };
    }

    return {
      v: values[key],
      dist: 0,
      lines: [],
      indices: [],
    };
  };

  calcPosValuesSingle = (
    values: any,
    dire: any,
    target: any,
    compare: any,
    key: string
  ) => {
    const { x, y } = values;
    const W = target.w;
    const H = target.h;
    const { l, r, t, b, lr, tb } = compare;
    const { origin, length } = this.calcLineValues(
      { x, y },
      target,
      compare,
      key
    );

    const result = {
      // 距离是否达到吸附阈值
      near: false,
      // 距离差
      dist: Number.MAX_SAFE_INTEGER,
      // 辅助线坐标
      value: 0,
      // 辅助线长度
      length,
      // 辅助线起始坐标（对应绝对定位的top/left）
      origin,
    };

    switch (dire) {
      case "lr":
        result.dist = x + W / 2 - lr;
        result.value = lr;
        break;
      case "ll":
        result.dist = x - l;
        result.value = l;
        break;
      case "rr":
        result.dist = x + W - r;
        result.value = r;
        break;
      case "tt":
        result.dist = y - t;
        result.value = t;
        break;
      case "bb":
        result.dist = y + H - b;
        result.value = b;
        break;
      case "tb":
        result.dist = y + H / 2 - tb;
        result.value = tb;
        break;
    }
    /** 小于5px自动吸附 */
    if (Math.abs(result.dist) < 5 + 1) {
      result.near = true;
    }

    return result;
  };

  /** 渲染children */
  renderChildren = () => {
    const childList = filterChildren(this.props.children, ChildBox);
    return childList.map((child, index) =>
      React.cloneElement(child, {
        // @ts-ignore
        _onDrag: this.handleChildDrag(index),
        _onStart: this.handleChildStart,
        _onEnd: this.handleChildEnd,
        _onClick: (e: any) => this.handleChildClick(e, child.props),
        _onDoubleClick: (e: any) => this.handleChildDoubleClick(e, child.props),
      })
    );
  };

  /** 画辅助线 */
  renderGuideLine = () => {
    const { vLines, hLines }: any = this.state;
    const commonStyle = {
      position: "absolute",
      backgroundColor: "#3494ce",
    };

    const Container = React.Fragment || "div";
    return (
      <Container>
        {vLines.map(({ length, value, origin }: any, i: number) => (
          <span
            className="v-line"
            key={`v-${i}`}
            style={
              {
                left: value,
                top: origin,
                height: length,
                width: 1,
                ...commonStyle,
              } as React.CSSProperties
            }
          />
        ))}
        {hLines.map(({ length, value, origin }: any, i: number) => (
          <span
            className="h-line"
            key={`h-${i}`}
            style={
              {
                top: value,
                left: origin,
                width: length,
                height: 1,
                ...commonStyle,
              } as React.CSSProperties
            }
          />
        ))}
      </Container>
    );
  };

  render() {
    const { className } = this.props;
    const { singleClickId, doubleClickId, style } = this.state;
    return (
      <ContextProvider
        value={{
          _singleClickId: singleClickId,
          _doubleClickId: doubleClickId,
          _dragArea: this.$nodeRef,
        }}
      >
        <div
          style={{ ...style }}
          className={classNames(prefixCls(), className)}
          ref={this.handleRoot}
        >
          {this.renderChildren()}
          {this.renderGuideLine()}
          <ShrinkLine className={prefixCls("shrink-line")} />
        </div>
      </ContextProvider>
    );
  }
}

export default DragContainer;
