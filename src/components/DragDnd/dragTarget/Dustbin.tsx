import React, { useState, forwardRef, ForwardRefRenderFunction } from "react";
import { useDrop } from "react-dnd";
import { dragConsts } from "@/consts";
import ScalableBox from "../components/ScalableBox";

import { DragConextCache } from "../DragContext/index";
import DragRnd from "../dragRnd/index";
import DragCanvas from "./DragCanvas";
import "./index.less";

/**
 * @name 渲染容器组件
 * @param {*} props
 * @param {*} ref
 */

interface IDustbinProps {}

const Dustbin: ForwardRefRenderFunction<HTMLDivElement, IDustbinProps> = (
  props,
  ref
) => {
  const [list, setList] = useState<Array<{ id: string; type: string }>>([]);

  // 放下拖拽元素的触发的事件
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: dragConsts.box,
    drop: (item: any, monitor) => {
      const isFind = list.find((keys) => keys.id === item.id);
      // 如果没找到就是添加一个新元素
      if (!isFind) {
        let { x, y }: any = monitor.getClientOffset(); // 获取位置有点问题
        setList(list.concat({ ...item, left: x, top: y }));
      }
      return { ...item };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={ref} className={"dragDustbin"}>
      <div ref={drop} className={"content"}>
        {list.map((item) => {
          const { type, ...reset } = item;
          const Element = getDragComponent(type);
          return (
            <DragRnd {...reset}>
              <ScalableBox>
                <Element {...item} />
              </ScalableBox>
            </DragRnd>
          );
        })}
      </div>
    </div>
  );
};
export default forwardRef(Dustbin);

function getDragComponent(type: any) {
  try {
    const component = require(`@/components/DragComponents/${type}`).default;
    return component;
  } catch (err) {
    return () => {};
  }
}
