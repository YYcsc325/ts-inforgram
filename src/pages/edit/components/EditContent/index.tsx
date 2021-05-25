import ClassDrag from "@/components/ClassDrag";
import React, { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { createPrefixClass } from "@/util/utils";
import { dragConsts } from "@/consts";
import { getDragComponent } from "@/components/DragComponents";

import styles from "./index.less";

const prefixCls = createPrefixClass("edit-content", styles);

const config = [
  {
    id: "key1",
    type: "Img",
    defaultPostion: { left: 200, top: 200 },
    url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
    scale: true,
  },
  {
    id: "key2",
    type: "Img",
    defaultPostion: { left: 300, top: 300 },
    url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
    scale: false,
  },
];

const EditContent = () => {
  const [list, setList] = useState(config);
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

  return (
    <div className={prefixCls()} ref={drop}>
      <ClassDrag className={prefixCls("edit-page")}>
        {list.map((item) => {
          const Element = getDragComponent(item.type as string);
          return (
            <ClassDrag.Box
              key={item.id}
              id={item.id}
              scale={item.scale}
              defaultPostion={item.defaultPostion}
            >
              <Element {...item} />
            </ClassDrag.Box>
          );
        })}
      </ClassDrag>
    </div>
  );
};

export default EditContent;
