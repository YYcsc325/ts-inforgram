import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IRouteComponentProps, useModel, useLocation } from "umi";

import EditHeader from "./editHeader";
import EditMenu from "./editMenu";
import EditContent from "./editContent";
import EditData from "./editData";

import { EditContextProvider } from "./context";
import { getParentNode } from "./utils";
import styles from "./index.less";

export interface IEditProps extends IRouteComponentProps<{ id?: string }> {}

// 双击数据没有回显
// 那个id能不能用hook去做

const Editor: React.FC<IEditProps> = (props) => {
  const location: any = useLocation();
  const targetId = location?.query?.id;

  const [editorStore, editorActions] = useModel("useEditorModel.index");

  const editContentRef = React.useRef<any>(null);
  const editContentScrollTop = React.useRef<number>(0);

  React.useEffect(() => {
    editorActions.fetchEditData?.({
      id: targetId as string,
    });
  }, []);

  /** 监听页面的单击事件 */
  const listenMouseDown = (e: any) => {
    // 找到第一个parentNode 有data-id的属性
    const checkedId = getParentNode(e.target, (node) =>
      node?.getAttribute("data-id")
    );
    editorActions.updateCheckedId(checkedId);
  };

  /** 监听页面的双击事件 */
  const listenDbClick = (e: any) => {
    const modifyId = getParentNode(e.target, (node) =>
      node?.getAttribute("data-id")
    );
    editorActions.updateModifyId(modifyId);
  };

  /** 监听页面滚动 */
  const listenPageScroll = (e: any) => {
    editContentScrollTop.current = e.srcElement.scrollTop;
  };

  React.useEffect(() => {
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
        editContentScrollTop,
        editContentRef,
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
              {Object.values(editorStore.pages).map((item: any, index) => {
                return (
                  <EditContent
                    {...item}
                    index={index}
                    key={item.id}
                    pageId={item.id}
                    dataSource={Object.values(editorStore.pageBoxs).filter(
                      (val: any) => (item.children || []).includes(val.id)
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

export default Editor;
