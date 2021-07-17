import React, { Component, PropsWithChildren } from "react";
import classNames from "classnames";
import { createPrefixClass, filterChildren } from "@/util/utils";

import ChildBox, { handleDrag } from "./ChildBox";
import { unique, checkArrayWithPush, getMaxDistance } from "./utils";
import styles from "./index.less";

const prefixCls = createPrefixClass("drag-container", styles);
interface IDragContainerProps {
  id: string;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  className?: string;
  onMouseUp?: handleDrag;
  onMouseMove?: handleDrag;
  onMouseDown?: handleDrag;
}

type IDragContainerPropsWithChildren = PropsWithChildren<IDragContainerProps>;

interface IDragContainerState {
  vLines: string[];
  hLines: string[];
  indices: string[];
}

class DragContainer extends Component<
  IDragContainerPropsWithChildren,
  IDragContainerState
> {
  static Box = ChildBox;
  $nodeRef: any = null;
  $children: any = [];
  constructor(props: IDragContainerPropsWithChildren) {
    super(props);
    this.state = {
      vLines: [],
      hLines: [],
      indices: [],
    };
  }

  /** 存储当前组件的ref */
  handleRoot = (node: any) => {
    this.$nodeRef = node;
  };

  // 拖拽初始时 计算出所有元素的坐标信息，存储于childPos
  handleChildMouseDown: handleDrag = (e, id, data) => {
    event?.stopImmediatePropagation();
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
    this.props.onMouseDown?.(e, id, data);
  };

  /** 拖拽结束 */
  handleChildMouseUp: handleDrag = (e, id, data) => {
    this.setState({ vLines: [], hLines: [], indices: [] });
    this.props.onMouseUp?.(e, id, data);
  };

  // 拖动中计算是否吸附/显示辅助线
  handleChildMouseMove = (index: number) => {
    return (e: any, id: any, data: any) => {
      const target = this.$children?.[index];
      const { left, top } = data || {};
      const compares = this.$children?.filter(
        (_: any, i: number) => i !== index
      );

      if (compares.length === 0) {
        this.props.onMouseMove?.(e, id, data);
        return { x: left, y: top };
      }

      const endPosition = this.calcAndDrawLines(
        { x: left, y: top },
        target,
        compares
      );
      this.props.onMouseMove?.(e, id, {
        ...data,
        left: endPosition.x,
        top: endPosition.y,
      });
      return endPosition;
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
    return childList.map((child: any, index) =>
      React.cloneElement(child, {
        // @ts-ignore
        onMouseMove: this.handleChildMouseMove(index),
        onMouseDown: this.handleChildMouseDown,
        onMouseUp: this.handleChildMouseUp,
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

  renderRealStyle = () => {
    const { width, height, backgroundColor } = this.props;
    return {
      backgroundColor: backgroundColor ?? "#303030",
      width: width ?? "100%",
      height: height ?? 800,
    };
  };

  render() {
    const { className, id } = this.props;
    return (
      <div
        data-id={id}
        style={this.renderRealStyle()}
        className={classNames(prefixCls(), className)}
        ref={this.handleRoot}
      >
        {this.renderChildren()}
        {this.renderGuideLine()}
      </div>
    );
  }
}

export default DragContainer;
