import React, { useEffect, useState, FC } from "react";
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
import styles from "./index.less";

export interface IEditProps
  extends IConnectProps,
    IRouteComponentProps<{ id?: string }> {}

const Edit: FC<IEditProps> = (props) => {
  const [targetId] = useState(props.match?.params?.id);

  if (!parse(Cookies.get("userLogin") as string)?.login) {
    return <Redirect to="/login" />;
  }

  useEffect(() => {
    props.dispatchEditContentDataSource?.({ id: targetId as string });
  }, []);

  return (
    <EditContextProvider>
      <DndProvider backend={HTML5Backend}>
        <div className={styles["edit"]}>
          <EditHeader />
          <div className={styles["editContentWarp"]}>
            <EditMenu />
            <div className={styles["editContent"]}>
              {[1, 2, 3].map((item) => (
                <EditContent editPageData={props.editContentDataSource} />
              ))}
            </div>
            <EditData />
          </div>
        </div>
      </DndProvider>
    </EditContextProvider>
  );
};

export default Edit;
