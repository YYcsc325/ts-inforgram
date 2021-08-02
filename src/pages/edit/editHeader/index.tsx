import React, { FC } from "react";
import { Link } from "umi";
import screenfull from "screenfull";

import { editContextConsumer } from "../context";
import styles from "./index.less";

const EditHeader: FC<any> = ({ editConsumer }) => {
  const { editContentRef } = editConsumer;
  const handlePreview = () => {
    if (screenfull.isEnabled) {
      screenfull.request(editContentRef.current);
    } else {
      console.log("当前浏览器不支持全屏浏览");
    }
  };

  return (
    <div className={styles["editHeader"]}>
      <div className={styles["editHeaderAction"]}>
        <Link to={"/library"} className={styles["editBackIcon"]} />
        <div className={styles["editHeaderActionBar"]}>
          <a className={styles["editHeaderActionPublicBtn"]}>Public</a>
          <div className={styles["editHeaderActionSelect"]}>Column Chart</div>
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
        <div className={styles["editBtnIconTwo"]} onClick={handlePreview} />
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
  );
};

export default editContextConsumer(EditHeader) as typeof EditHeader;
