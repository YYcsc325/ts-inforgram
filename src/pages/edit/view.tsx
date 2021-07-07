import React, { useEffect, useState, FC, useCallback } from "react";
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
import { normalizePagesData } from "./utils";
import styles from "./index.less";

export interface IEditProps
  extends IConnectProps,
    IRouteComponentProps<{ id?: string }> {}

const Edit: FC<IEditProps> = (props) => {
  const [targetId] = useState(props.match?.params?.id);
  const [pagesData, setPagesData] = useState<any>({});
  const [boxsData, setBoxsData] = useState<any>({});

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
  const handleModifyBox = () => {};
  // 删除box数据
  const handleDeleteBox = () => {};
  // 增加box数据
  const handleAddBox = (parentId: number, id: number, data: any) => {};

  /** 优化page的渲染 */
  const PageContent = useCallback(() => {
    return (
      <div>
        {Object.values(pagesData).map(({ id, name, children = [] }: any) => {
          const boxsList = children.map((item: string) => ({
            ...boxsData[item],
          }));
          return (
            <EditContent boxsData={boxsList} id={id} pageName={name} key={id} />
          );
        })}
      </div>
    );
  }, [pagesData, boxsData]);

  return (
    <EditContextProvider>
      <DndProvider backend={HTML5Backend}>
        <div className={styles["edit"]}>
          <EditHeader />
          <div className={styles["editContentWarp"]}>
            <EditMenu />
            <div className={styles["editContent"]}>
              <PageContent />
            </div>
            <EditData />
          </div>
        </div>
      </DndProvider>
    </EditContextProvider>
  );
};

export default Edit;
