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
import { normalizePagesData, getParentNode } from "./utils";
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
        setPagesData(normalize.get("pages") as any);
        setBoxsData(normalize.get("boxs") as any);
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

  useEffect(() => {
    editContentRef.current?.addEventListener("mousedown", listenMouseDown);
    editContentRef.current.addEventListener("dblclick", listenDbClick);
    return () => {
      editContentRef.current?.removeEventListener("mousedown", listenMouseDown);
      editContentRef.current.removeEventListener("dblclick", listenDbClick);
    };
  }, []);

  /** 修改page数据 */
  const handleModifyPage = (pageId: string, data: any) => {
    const datas = { ...pagesData, [pageId]: { ...pagesData[pageId], ...data } };
    setPagesData({ ...pagesData, [pageId]: { ...pagesData[pageId], ...data } });
  };

  // 修改box数据
  const handleModifyBox = (boxId: string, data: any) => {
    setBoxsData({ ...boxsData, [boxId]: { ...boxsData[boxId], ...data } });
  };

  // 删除box数据
  const handleDeleteBox = (pageId: string, boxId: string) => {
    const childrenList = pagesData[pageId]?.children || [];
    setPagesData(
      set(
        pagesData,
        [pageId, "children"],
        childrenList.filter((item: any) => item !== boxId)
      )
    );
    setBoxsData(omit(boxsData, [boxId]));
  };

  // 增加box数据
  const handleAddBox = (pageId: string, boxId: string, data: any) => {
    const childrenList = pagesData[pageId]?.children || [];
    setPagesData(
      set(pagesData, [pageId, "children"], [...childrenList, boxId])
    );
    setBoxsData({ ...boxsData, [boxId]: data });
  };

  return (
    <EditContextProvider
      value={{
        checkedId,
        modifyId,
        pagesData,
        boxsData,
        handleAddBox,
        handleDeleteBox,
        handleModifyBox,
        handleModifyPage,
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
                const { children = [], id } = item;
                return (
                  <EditContent
                    {...item}
                    boxIdList={children}
                    index={index}
                    pageId={id}
                    key={id}
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
