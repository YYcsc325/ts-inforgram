import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { createPrefixClass } from "@/util/utils";
import { dragConsts } from "@/consts";
import { DragContainer } from "@/components";
import { getDragComponent } from "@/components/DragComponents";
import classNames from "classnames";
import { IEditContentResponse } from "@/service/edit";
import { CloseCircleOutlined } from "@ant-design/icons";

import styles from "./index.less";

const prefixCls = createPrefixClass("edit-page-warp", styles);

export interface IEditPageProps {
  editPageData: IEditContentResponse;
  className?: string;
}

const EditPage = (props: IEditPageProps) => {
  const [list, setList] = useState(props.editPageData);

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
    setList(props.editPageData);
  }, [props.editPageData]);

  const handleBoxMenuClick = useCallback(
    (id: string, type: any) => {
      const typeList: any = {
        delete: () => {
          setList(list.filter((item) => item.id !== id));
        },
      };
      typeList[type] && typeList[type]();
    },
    [list]
  );

  return (
    <div className={prefixCls()} ref={drop} style={{ marginTop: "10px" }}>
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
              defaultPostion={item.defaultPostion}
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

export default EditPage;
