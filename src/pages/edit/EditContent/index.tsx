import React, { useEffect, useMemo, useState, useCallback, FC } from "react";
import { useDrop } from "react-dnd";
import { createPrefixClass } from "@/util/utils";
import { dragConsts } from "@/consts";
import { DragContainer } from "@/components";
import { getDragComponent } from "@/components/DragComponents";
import classNames from "classnames";
import { IEditContentResponse } from "@/service/edit";
import { CloseCircleOutlined } from "@ant-design/icons";

import { editContextConsumer } from "../context";
import styles from "./index.less";

const prefixCls = createPrefixClass("edit-page-warp", styles);

export interface IEditPageProps {
  pageId: string;
  editConsumer?: any;
  boxsData: IEditContentResponse;
  pageName: React.ReactNode;
  className?: string;
}

const EditPage: FC<IEditPageProps> = (props) => {
  const { editConsumer, boxsData = [], pageId } = props;
  const { handleAddBox, handleDeleteBox, handleModifyBox } = editConsumer;
  console.log(boxsData, "boxsData");
  const listIds = useMemo(() => {
    return boxsData.map((item) => item.id);
  }, [boxsData]);

  // 放下拖拽元素的触发的事件
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: dragConsts.box,
    drop: (item: any, monitor) => {
      const isFind = listIds.includes(item.id);
      if (!isFind) {
        let { x, y }: any = monitor.getClientOffset(); // 获取位置有点问题
        handleAddBox(pageId, item.id, {
          ...item,
          left: x,
          top: y,
        });
      }
      return { ...item };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleBoxMenuClick = (boxId: string) => {
    handleDeleteBox(pageId, boxId);
  };

  const handleBoxDrag = (e: any, boxId: string, data: any) => {
    handleModifyBox(boxId, data);
  };

  return (
    <div className={prefixCls()} ref={drop} style={{ marginTop: "10px" }}>
      <DragContainer
        className={classNames(prefixCls("edit-page"), {
          [prefixCls("isover")]: isOver,
        })}
        onMouseMove={handleBoxDrag}
      >
        {boxsData.map((item: any) => {
          const Element = getDragComponent(item.type as string);
          return (
            <DragContainer.Box
              key={item.id}
              id={item.id}
              left={item.left}
              top={item.top}
              width={item.width}
              height={item.height}
              contextMenuConfig={{
                options: [
                  {
                    title: "delete",
                    value: "delete",
                    icon: <CloseCircleOutlined />,
                  },
                ],
                onMemuClick: handleBoxMenuClick,
              }}
            >
              <Element {...item} />
            </DragContainer.Box>
          );
        })}
      </DragContainer>
    </div>
  );
};

export default editContextConsumer(EditPage) as typeof EditPage;
