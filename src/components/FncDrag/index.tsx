import React, {
  FC,
  CSSProperties,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import classNames from "classnames";
import { createPrefixClass, filterChildren } from "@/util/utils";

import { ContextProvider } from "./context";
import ChildBox, { IDragBoxProps } from "./ChildBox";
import { unique, checkArrayWithPush, getMaxDistance } from "./utils";
import styles from "./index.less";

const prefixCls = createPrefixClass("drag-container", styles);

export interface IDragContainerProps {
  className?: string;
  style?: CSSProperties;
  onChildClick?: (params: any) => void;
  onChildDrag?: (params: { string: any }) => void;
}

const DragContainer: FC<IDragContainerProps> & {
  Box: FC<IDragBoxProps>;
} = ({
  className,
  style,
  onChildClick,
  onChildDrag,
  children,
  ...resetProps
}) => {
  const childFilter = filterChildren(children, ChildBox);
  const dragAreaRef: any = useRef(null);

  const [clicked, setClicked] = useState<string | undefined>();
  const childPos = useRef([]);
  const [vhi, setVhi] = useState<any>({ vLines: [], hLines: [], indices: [] });

  const handleChildClick = useCallback(
    (e, props) => {
      e.stopPropagation();
      setClicked(props.id);
      onChildClick?.(props);
    },
    [onChildClick]
  );

  // 拖拽初始时 计算出所有元素的坐标信息，存储于childPos
  const handleChildStart = useCallback(() => {
    const pos: any = childFilter.map((item, i) => {
      const $ = dragAreaRef?.current?.childNodes?.[i];
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
    });
    childPos.current = pos;
  }, []);

  const handleChildEnd = () => {
    setVhi({ vLines: [], hLines: [], indices: [] });
  };

  const calcLineValues = (
    values: any,
    target: any,
    compare: any,
    key: string
  ) => {
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

  const calcPosValuesSingle = (
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
    const { origin, length } = calcLineValues({ x, y }, target, compare, key);

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

  const calcPosValues = (
    values: any,
    target: any,
    compares: any,
    key: string
  ) => {
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
        const { near, dist, value, origin, length }: any = calcPosValuesSingle(
          values,
          dire,
          target,
          compare,
          key
        );
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
  /**
   * @param {Object} values xy坐标
   * @param {Object} target 拖拽目标
   * @param {Array} compares 对照组
   */
  const calcAndDrawLines = (values: any, target: any, compares: any) => {
    const {
      v: x,
      indices: indices_x,
      lines: vLines,
    }: any = calcPosValues(values, target, compares, "x");
    const {
      v: y,
      indices: indices_y,
      lines: hLines,
    }: any = calcPosValues(values, target, compares, "y");

    const indices = unique(indices_x.concat(indices_y));

    if (vLines.length && hLines.length) {
      vLines.forEach((line: any) => {
        const compare = compares.find(({ i }: any) => i === line.i);
        const { length, origin } = calcLineValues(
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
        const { length, origin } = calcLineValues(
          { x, y },
          target,
          compare,
          "y"
        );

        line.length = length;
        line.origin = origin;
      });
    }

    setVhi({
      vLines,
      hLines,
      indices,
    });

    return { x, y };
  };
  // 拖动中计算是否吸附/显示辅助线
  const handleChildDrag = (index: number) => {
    return (x: number, y: number) => {
      const target = childPos.current?.[index];
      const compares = childPos.current.filter((_, i) => i !== index);

      if (compares.length === 0) {
        return { x, y };
      }

      return calcAndDrawLines({ x, y }, target, compares);
    };
  };

  const renderGuideLine = () => {
    const { vLines, hLines }: any = vhi || {};
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
              } as CSSProperties
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
              } as CSSProperties
            }
          />
        ))}
      </Container>
    );
  };

  const setHandleChildClicked = () => {
    setClicked("");
  };

  useEffect(() => {
    document.addEventListener("click", setHandleChildClicked);
    return () => {
      document.removeEventListener("click", setHandleChildClicked);
    };
  }, []);

  return (
    <ContextProvider value={{ clicked, dragArea: dragAreaRef.current }}>
      <div
        {...resetProps}
        style={style}
        className={classNames(prefixCls(), className)}
        ref={dragAreaRef}
      >
        {childFilter.map((child, index) => {
          return React.cloneElement(child, {
            _onDrag: handleChildDrag(index),
            _onStart: handleChildStart,
            _onEnd: handleChildEnd,
            onClick: (e: any) => handleChildClick(e, child.props),
          });
        })}
        {renderGuideLine()}
      </div>
    </ContextProvider>
  );
};

DragContainer.displayName = "DragContainer";
DragContainer.Box = ChildBox;

export default DragContainer;
