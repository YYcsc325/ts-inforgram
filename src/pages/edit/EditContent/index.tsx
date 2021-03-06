import React, { useMemo, FC, useRef } from "react";
import { useDrop } from "react-dnd";
import { createPrefixClass } from "@/util/utils";
import { dragConsts } from "@/consts";
import { DragContainer } from "@/components";
import { getDragComponent } from "@/components/DragComponents";
import classNames from "classnames";
import ContextMenu, {
  OptionsItem,
} from "@/components/DragContainer/ContextMenu";
import {
  CloseCircleOutlined,
  CopyOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ShrinkLine from "@/components/DragContainer/ShrinkLine";

import { pageReducerTypes, boxReducerTypes } from "../reducer";
import { editContextConsumer } from "../context";
import styles from "./index.less";

const prefixCls = createPrefixClass("edit", styles);

export interface IEditPageProps {
  index: number;
  pageId: string;
  name?: string;
  height: number;
  backgroundColor?: string;
  editConsumer?: any;
  dataSource: any[];
  className?: string;
}

const options = [
  {
    title: "delete",
    value: "delete",
    icon: <CloseCircleOutlined />,
  },
];

const EditPage: FC<IEditPageProps> = ({
  index,
  pageId,
  height,
  backgroundColor,
  dataSource = [],
  editConsumer,
}) => {
  const {
    checkedId,
    modifyId,
    editContentScrollTop,
    dispatchPageStore,
    dispatchBoxStore,
  } = editConsumer;

  const contentRef = useRef<any>(null);

  const boxIds = useMemo(() => {
    return dataSource.map((item) => item.id);
  }, [dataSource]);

  // 放下拖拽元素的触发的事件
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: dragConsts.box,
    drop: (item: any, monitor) => {
      const isFind = boxIds.includes(item.id);
      if (!isFind) {
        let { x, y }: any = monitor.getClientOffset(); // 获取位置有点问题
        dispatchPageStore({
          type: pageReducerTypes.ADD_CHILDREN,
          payload: { pageId, boxId: item.id },
        });
        dispatchBoxStore({
          type: boxReducerTypes.ADD,
          payload: {
            boxId: item.id,
            data: {
              ...item,
              parentId: pageId,
              left: x,
              top: y,
            },
          },
        });
      }
      return { ...item };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleBoxMenuClick = (_p: OptionsItem) => {
    dispatchPageStore({
      type: pageReducerTypes.DELETE_CHILDREN,
      payload: { pageId },
    });
    dispatchBoxStore({
      type: boxReducerTypes.DELETE,
      payload: { boxId: checkedId },
    });
  };

  const handleBoxMove = (_e: any, _id: string, data: any) => {
    dispatchBoxStore({
      type: boxReducerTypes.MODIFY,
      payload: { boxId: _id, data },
    });
  };

  return (
    <div className={prefixCls()} ref={drop} style={{ marginTop: "10px" }}>
      <div className={prefixCls("page-title")}>
        <div className={prefixCls("page-num")}>Page {index}</div>
        <div className={prefixCls("page-odps")}>
          <CopyOutlined className={prefixCls("page-copy")} />
          <DeleteOutlined className={prefixCls("page-delete")} />
        </div>
      </div>
      <DragContainer
        id={pageId}
        style={{ height, backgroundColor }}
        className={classNames(prefixCls("page-content"), {
          [prefixCls("page-active")]: pageId === checkedId,
        })}
        onMouseMove={handleBoxMove}
        nodeRef={(node) => (contentRef.current = node)}
      >
        {dataSource.map((item: any = {}, index) => {
          const Element = getDragComponent(item.type as string);
          return (
            <DragContainer.Box
              {...item}
              key={item.id ?? index}
              className={classNames(prefixCls("page-box"), {
                [prefixCls("box-active")]: item.id === checkedId,
              })}
              isDoubleClicked={item.id === modifyId && modifyId === checkedId}
            >
              <ContextMenu options={options} onMenuClick={handleBoxMenuClick}>
                <Element
                  {...item.data}
                  width={item.width}
                  height={item.height}
                />
              </ContextMenu>
            </DragContainer.Box>
          );
        })}
      </DragContainer>
      <ShrinkLine
        id={pageId}
        onMouseMove={(e: any) => {
          const offsetTop = contentRef?.current?.offsetTop ?? 0;
          const editScrollTop = Number(editContentScrollTop?.current) ?? 0;
          const height = e.pageY + editScrollTop - offsetTop;
          dispatchPageStore({
            type: pageReducerTypes.MODIFY,
            payload: { pageId, data: { height } },
          });
        }}
      />
    </div>
  );
};

export default editContextConsumer(EditPage) as typeof EditPage;
