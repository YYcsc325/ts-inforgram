import React, { useEffect, useState, FC, useRef } from "react";
import { Redirect, IRouteComponentProps } from "umi";
import Cookies from "js-cookie";
import { parse } from "qs";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { set, omit } from "lodash";

import EditHeader from "./editHeader";
import EditMenu from "./editMenu";
import EditContent from "./editContent";
import EditData from "./editData";

import { IConnectProps } from "./connect";
import { EditContextProvider } from "./context";
import {
  normalizePagesData,
  getParentNode,
  boxChangeType,
  IBoxChangeType,
} from "./utils";
import styles from "./index.less";

export interface IEditProps
  extends IConnectProps,
    IRouteComponentProps<{ id?: string }> {}

// 双击数据没有回显
// 那个id能不能用hook去做

const Edit: FC<IEditProps> = (props) => {
  const [pagesData, setPagesData] = useState<any>({});
  const [boxsData, setBoxsData] = useState<any>({});
  const [checkedId, setCheckedId] = useState("");
  const [modifyId, setModifyId] = useState("");

  const editContentRef = useRef<any>(null);
  const editContentScrollTop = useRef<number>(0);

  if (!parse(Cookies.get("userLogin") as string)?.login) {
    return <Redirect to="/login" />;
  }

  useEffect(() => {
    const targetId = props.match?.params?.id;
    props
      .dispatchEditContentDataSource?.({
        id: targetId as string,
      })
      .then((res: any) => {
        const normalize = normalizePagesData(res.result || []);
        setPagesData((normalize?.pages as any) || {});
        setBoxsData((normalize?.boxs as any) || {});
      });
  }, []);

  /** 监听页面的单击事件 */
  const listenMouseDown = (e: any) => {
    // 找到第一个parentNode 有data-id的属性
    const checkedId = getParentNode(e.target, (node) =>
      node?.getAttribute("data-id")
    );
    setCheckedId(checkedId);
  };

  /** 监听页面的双击事件 */
  const listenDbClick = (e: any) => {
    const modifyId = getParentNode(e.target, (node) =>
      node?.getAttribute("data-id")
    );
    setModifyId(modifyId);
  };

  /** 监听页面滚动 */
  const listenPageScroll = (e: any) => {
    editContentScrollTop.current = e.srcElement.scrollTop;
  };

  useEffect(() => {
    editContentRef.current?.addEventListener("mousedown", listenMouseDown);
    editContentRef.current?.addEventListener("dblclick", listenDbClick);
    editContentRef.current?.addEventListener("scroll", listenPageScroll);
    return () => {
      editContentRef.current?.removeEventListener("mousedown", listenMouseDown);
      editContentRef.current?.removeEventListener("dblclick", listenDbClick);
      editContentRef.current?.removeEventListener("scroll", listenPageScroll);
    };
  }, []);

  /** 修改page样式 */
  const handleModifyPageStyle = (
    pageId: string,
    style: React.CSSProperties
  ) => {
    setPagesData({
      ...set(pagesData, [pageId], { ...pagesData[pageId], ...style }),
    });
  };

  // 修改box样式
  const handleModifyBoxStyle = (boxId: string, style: React.CSSProperties) => {
    setBoxsData({
      ...set(boxsData, [boxId], { ...boxsData[boxId], ...style }),
    });
  };

  // 删除box
  const handleDeleteBox = (pageId: string, boxId: string) => {
    const childrenList = pagesData[pageId]?.children || [];
    setPagesData({
      ...set(
        pagesData,
        [pageId, "children"],
        childrenList.filter((item: any) => item !== boxId)
      ),
    });
    setBoxsData({ ...omit(boxsData, [boxId]) });
  };

  // 增加box
  const handleAddBox = (pageId: string, boxId: string, data: any) => {
    const childrenList = pagesData[pageId]?.children || [];
    setPagesData({
      ...set(pagesData, [pageId, "children"], [...childrenList, boxId]),
    });
    setBoxsData({
      ...set(boxsData, [boxId], data),
    });
  };

  const handleBoxChange =
    (type: IBoxChangeType) =>
    (...args: any) => {
      const map = {
        [boxChangeType.ADD]: handleAddBox,
        [boxChangeType.DELETE]: handleDeleteBox,
        [boxChangeType.MODIFY_STYLE]: handleModifyBoxStyle,
      };
      const func = map[type] as Function | undefined;
      if (!func) return;
      func(...args);
    };
  return (
    <EditContextProvider
      value={{
        checkedId,
        modifyId,
        pagesData,
        boxsData,
        editContentScrollTop,
        handleBoxChange,
        handleModifyPageStyle,
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <div className={styles["edit"]}>
          <EditHeader />
          <div className={styles["editContentWarp"]}>
            <EditMenu />
            <div
              className={styles["editContent"]}
              data-id="editContent"
              ref={editContentRef}
            >
              {Object.values(pagesData).map((item: any, index) => {
                return (
                  <EditContent
                    {...item}
                    index={index}
                    key={item.id}
                    pageId={item.id}
                    dataSource={Object.values(boxsData).filter((val: any) =>
                      (item.children || []).includes(val.id)
                    )}
                  />
                );
              })}
            </div>
            <EditData />
          </div>
        </div>
      </DndProvider>
    </EditContextProvider>
  );
};

export default Edit;
