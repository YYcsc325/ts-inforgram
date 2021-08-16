import React, { useEffect, useState, FC, useRef, useReducer } from "react";
import { Redirect, IRouteComponentProps } from "umi";
import Cookies from "js-cookie";
import { parse } from "qs";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import EditHeader from "./editHeader";
import EditMenu from "./editMenu";
import EditContent from "./editContent";
import EditData from "./editData";

import { IConnectProps } from "./connect";
import { EditContextProvider } from "./context";
import { normalizePagesData, getParentNode } from "./utils";
import { pageReducer, boxReducer } from "./reducer";
import styles from "./index.less";

export interface IEditProps
  extends IConnectProps,
    IRouteComponentProps<{ id?: string }> {}

// 双击数据没有回显
// 那个id能不能用hook去做

const Edit: FC<IEditProps> = (props) => {
  const [pageStore, dispatchPageStore] = useReducer(pageReducer, {});
  const [boxStore, dispatchBoxStore] = useReducer(boxReducer, {});

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
        dispatchPageStore({
          payload: { data: normalize?.pages },
        });
        dispatchBoxStore({
          payload: { data: normalize?.boxs },
        });
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

  return (
    <EditContextProvider
      value={{
        checkedId,
        modifyId,
        pageStore,
        boxStore,
        editContentScrollTop,
        editContentRef,
        dispatchPageStore,
        dispatchBoxStore,
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
              {Object.values(pageStore).map((item: any, index) => {
                return (
                  <EditContent
                    {...item}
                    index={index}
                    key={item.id}
                    pageId={item.id}
                    dataSource={Object.values(boxStore).filter((val: any) =>
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
