import React, { FC } from "react";

import styles from "./index.less";

const LeftSilder = () => {
  return (
    <div className={styles["left-silder"]}>
      <div className={styles.icon}>
        <span className={styles.infogram}>infogram</span>
        <span className={styles.upgrade}>Upgrade</span>
      </div>
      <div className={styles.user}>
        <span className={styles["user-icon"]}>YC</span>
        <span className={styles["user-mes"]}>
          <span>YY小学徒</span>
          <span>Basic account</span>
        </span>
      </div>
    </div>
  );
};

export default LeftSilder;
