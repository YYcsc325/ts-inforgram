import React, { useEffect, useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { createPrefixClass } from "@/util/utils";
import { dragConsts } from "@/consts";
import { DragContainer } from "@/components";
import { getDragComponent } from "@/components/DragComponents";
import classNames from "classnames";
import { IEditContentResponse } from "@/service/edit";

import styles from "./index.less";

const prefixCls = createPrefixClass("edit-content", styles);

export interface IEditContentProps {
  editContentDataSource: IEditContentResponse;
}

const EditContent = (props: IEditContentProps) => {
  const [list, setList] = useState(props.editContentDataSource);

  const listIds = useMemo(() => {
    return list.map((item) => item.id);
  }, [list]);

  // 放下拖拽元素的触发的事件
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: dragConsts.box,
    drop: (item: any, monitor) => {
      const isFind = listIds.includes(item.id);
      if (!isFind) {
        let { x, y }: any = monitor.getClientOffset(); // 获取位置有点问题
        setList(list.concat({ ...item, defaultPostion: { left: x, top: y } }));
      }
      return { ...item };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    setList(props.editContentDataSource);
  }, [props.editContentDataSource]);

  const handleTargetChange = (odps, id) => {
    console.log(odps, "odps");
    console.log(id, "id");
  };

  return (
    <div className={prefixCls()} ref={drop}>
      <DragContainer
        className={classNames(prefixCls("edit-page"), {
          [prefixCls("isover")]: isOver,
        })}
      >
        {list.map((item) => {
          const Element = getDragComponent(item.type as string);
          return (
            <DragContainer.Box
              key={item.id}
              id={item.id}
              scale={item.scale}
              defaultPostion={item.defaultPostion}
            >
              <Element {...item} />
            </DragContainer.Box>
          );
        })}
      </DragContainer>
    </div>
  );
};

export default EditContent;
