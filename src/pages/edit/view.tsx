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
import { normalizePagesData } from "./utils";
import styles from "./index.less";

export interface IEditProps
  extends IConnectProps,
    IRouteComponentProps<{ id?: string }> {}

// 双击数据没有回显
// 那个id能不能用hook去做

const Edit: FC<IEditProps> = (props) => {
  const [targetId] = useState(props.match?.params?.id);

  const [pagesData, setPagesData] = useState<any>({});
  const [boxsData, setBoxsData] = useState<any>({});

  const checkedId = useRef("");

  if (!parse(Cookies.get("userLogin") as string)?.login) {
    return <Redirect to="/login" />;
  }

  useEffect(() => {
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

  // 修改page数据
  const handleModifyPage = () => {};
  // 删除page数据
  const handleDeletePage = () => {};
  // 增加page数据
  const handleAddPage = () => {};

  // 修改box数据
  const handleModifyBox = (boxId: string, data: any) => {
    checkedId.current = boxId;
    setBoxsData({ ...boxsData, [boxId]: { ...boxsData[boxId], ...data } });
  };
  // 删除box数据
  const handleDeleteBox = (pageId: string, boxId: string) => {
    checkedId.current = boxId;
    setPagesData(
      set(
        pagesData,
        [pageId, "children"],
        [...pagesData[pageId].children.filter((item: any) => item.id !== boxId)]
      )
    );
    setBoxsData(omit(boxsData, [boxId]));
  };
  // 增加box数据
  const handleAddBox = (pageId: string, boxId: string, data: any) => {
    checkedId.current = boxId;
    setPagesData(
      set(
        pagesData,
        [pageId, "children"],
        [...pagesData[pageId].children, boxId]
      )
    );
    setBoxsData({ ...boxsData, [boxId]: data });
  };

  return (
    <EditContextProvider
      value={{
        pagesData,
        boxsData,
        handleAddBox,
        handleDeleteBox,
        handleModifyBox,
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <div className={styles["edit"]}>
          <EditHeader />
          <div className={styles["editContentWarp"]}>
            <EditMenu />
            <div className={styles["editContent"]}>
              {Object.values(pagesData).map(
                ({ id, name, children = [] }: any) => {
                  const boxsList = children.map((item: string) => ({
                    ...boxsData[item],
                  }));
                  return (
                    <EditContent
                      boxsData={boxsList || []}
                      pageId={id}
                      pageName={name}
                      key={id}
                    />
                  );
                }
              )}
            </div>
            <EditData checkedId={checkedId.current} />
          </div>
        </div>
      </DndProvider>
    </EditContextProvider>
  );
};

export default Edit;
