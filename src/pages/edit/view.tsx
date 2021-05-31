import React, { useState } from "react";
import { Link, Redirect, IRouteComponentProps } from "umi";
import Cookies from "js-cookie";
import { parse } from "qs";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./index.less";
import MenuNav from "./components/MenuNav";
import EditContent from "./components/EditContent";
import { IConnectProps } from "./connect";

export interface IEditProps
  extends IConnectProps,
    IRouteComponentProps<{ id?: string }> {}

const Edit = ({ match }: IEditProps) => {
  const [targetId] = useState(match?.params?.id);

  if (!parse(Cookies.get("userLogin") as string)?.login) {
    return <Redirect to="/login" />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles["edit"]}>
        <div className={styles["editHeader"]}>
          <div className={styles["editHeaderAction"]}>
            <Link to={"/library"} className={styles["editBackIcon"]} />
            <div className={styles["editHeaderActionBar"]}>
              <a className={styles["editHeaderActionPublicBtn"]}>Public</a>
              <div className={styles["editHeaderActionSelect"]}>
                Column Chart
              </div>
              <div className={styles["editHeaderActionLine"]} />
              <div className={styles["editHeaderActionBtnList"]}>
                <a className={styles["editHeaderActionTagBtn"]} />
                <a className={styles["editHeaderActionTimeBtn"]} />
                <a className={styles["editHeaderActionBackBtn"]} />
                <a className={styles["editHeaderActionNextBtn"]} />
              </div>
            </div>
          </div>
          <div className={styles["editBtnList"]}>
            <div className={styles["editBtnIconOne"]} />
            <div className={styles["editBtnIconTwo"]} />
            <div className={styles["editBtnIconThree"]} />
            <button className={styles["editDownloadBtn"]}>
              <span className={styles["iconStyle"]} />
              <span>Download</span>
            </button>
            <button className={styles["editShareBtn"]}>
              <span className={styles["iconStyle"]} />
              <span>Share</span>
            </button>
          </div>
        </div>
        <div className={styles["editContentBox"]}>
          <div className={styles["editContentLeft"]}>
            <MenuNav />
          </div>
          <div className={styles["editContent"]}>
            <EditContent />
          </div>
          <div className={styles["editContentRight"]}>4</div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Edit;
