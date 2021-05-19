import React, {
  FC,
  CSSProperties,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import classNames from "classnames";
import { createPrefixClass, filterChildren } from "@/util/utils";
import { set } from "lodash";

import { ContextProvider } from "./context";
import ChildBox, { IDragBoxProps } from "./ChildBox";
import { initailPos } from "./utils";
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
} = ({ className, style, onChildClick, onChildDrag, children, ...reset }) => {
  const childFilter = filterChildren(children, ChildBox);
  const dragAreaRef = useRef(null);
  const [clicked, setClicked] = useState<string | undefined>();
  const [childPos, setChildPos] = useState(initailPos(childFilter));

  const handleChildClick = useCallback(
    (e, props) => {
      e.stopPropagation();
      setClicked(props.id);
      onChildClick?.(props);
    },
    [onChildClick]
  );

  const handleChildDrag = useCallback(
    (e, id, data) => {
      setChildPos(set(childPos, [id], data) as any);
      onChildDrag?.({ [id]: data } as any);
    },
    [childPos]
  );

  // const renderGuideLine = () => {
  //   const { vLines, hLines } = this.state
  //   const { lineStyle } = this.props
  //   const commonStyle = {
  //     position: 'absolute',
  //     backgroundColor: '#FF00CC',
  //     ...lineStyle,
  //   }

  //   // support react 15
  //   const Container = React.Fragment || 'div'
  //   return (
  //     <Container>
  //       {vLines.map(({ length, value, origin }, i) => (
  //         <span
  //           className="v-line"
  //           key={`v-${i}`}
  //           style={{ left: value, top: origin, height: length, width: 1, ...commonStyle }}
  //         />
  //       ))}
  //       {hLines.map(({ length, value, origin }, i) => (
  //         <span
  //           className="h-line"
  //           key={`h-${i}`}
  //           style={{ top: value, left: origin, width: length, height: 1, ...commonStyle }}
  //         />
  //       ))}
  //     </Container>
  //   )
  // }

  document.onclick = (e) => {
    handleChildClick(e, {});
  };

  return (
    <ContextProvider value={{ clicked, dragArea: dragAreaRef.current }}>
      <div
        {...reset}
        style={style}
        className={classNames(prefixCls(), className)}
        ref={dragAreaRef}
      >
        {childFilter.map((child) => {
          return React.cloneElement(child, {
            onDrag: handleChildDrag,
            onClick: (e: any) => handleChildClick(e, child.props),
          });
        })}
        {/* {renderGuideLine()} */}
      </div>
    </ContextProvider>
  );
};

DragContainer.displayName = "DragContainer";
DragContainer.Box = ChildBox;

export default DragContainer;
