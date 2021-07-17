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
import { editContextConsumer } from "../context";
import styles from "./index.less";

const prefixCls = createPrefixClass("edit", styles);

export interface IEditPageProps {
  pageId: string;
  height?: string | number;
  backgroundColor?: string;
  editConsumer?: any;
  boxIdList: string[];
  pageName: React.ReactNode;
  className?: string;
  index: number;
}

const options = [
  {
    title: "delete",
    value: "delete",
    icon: <CloseCircleOutlined />,
  },
];

const EditPage: FC<IEditPageProps> = (props) => {
  const {
    editConsumer,
    pageId,
    index,
    boxIdList = [],
    height,
    backgroundColor,
  } = props;
  const {
    handleAddBox,
    handleDeleteBox,
    handleModifyBox,
    handleModifyPage,
    boxsData,
    checkedId,
    modifyId,
  } = editConsumer;

  const contentRef = useRef(null);

  const boxList = useMemo(() => {
    return boxIdList.map((item: string) => ({
      ...boxsData[item],
    }));
  }, [boxIdList, boxsData]);

  const boxIds = useMemo(() => {
    return boxList.map((item) => item.id);
  }, [boxList]);

  // 放下拖拽元素的触发的事件
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: dragConsts.box,
    drop: (item: any, monitor) => {
      const isFind = boxIds.includes(item.id);
      if (!isFind) {
        let { x, y }: any = monitor.getClientOffset(); // 获取位置有点问题
        handleAddBox(pageId, item.id, {
          ...item,
          parentId: pageId,
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

  const handleBoxMenuClick = (boxId: string) => (params: OptionsItem) => {
    handleDeleteBox(pageId, boxId);
  };

  const handleBoxMove = (e: any, boxId: string, data: any) => {
    handleModifyBox(boxId, data);
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
        height={height}
        backgroundColor={backgroundColor}
        className={classNames(prefixCls("page-content"), {
          [prefixCls("page-active")]: pageId === checkedId,
        })}
        onMouseMove={handleBoxMove}
        ref={contentRef}
      >
        {boxList.map((item: any) => {
          const Element = getDragComponent(item.type as string);
          return (
            <DragContainer.Box
              key={item.id}
              id={item.id}
              left={item.left}
              top={item.top}
              width={item.width}
              height={item.height}
              className={classNames(prefixCls("page-box"), {
                [prefixCls("box-active")]:
                  item.id === checkedId || item.id === modifyId,
              })}
              isDoubleClicked={item.id === modifyId}
            >
              <ContextMenu
                options={options}
                onMenuClick={handleBoxMenuClick(item.id)}
              >
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
        onMouseMove={(e: any) => {
          const top = contentRef?.current?.$nodeRef.offsetTop;
          handleModifyPage(pageId, { height: e.pageY - top });
        }}
      />
    </div>
  );
};

export default editContextConsumer(EditPage) as typeof EditPage;
