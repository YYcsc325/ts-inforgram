import React, {useEffect, useState} from "react";
import {IRouteComponentProps, Link} from "umi";
import styles from "./index.less";

const Edit = ({children, ...reset}: IRouteComponentProps) => {


  useEffect(() => {


  }, [])



  return (
    <div className={styles['edit']}>
      <div className={styles['editHeader']}>
        <div className={styles['editHeaderAction']}>
          <Link to={'/library'} className={styles['editBackIcon']}/>
          <div className={styles['editHeaderActionBar']}>
            <a className={styles['editHeaderActionPublicBtn']}>Public</a>
            <div className={styles['editHeaderActionSelect']}>Column Chart</div>
            <div className={styles['editHeaderActionLine']}/>
            <div className={styles['editHeaderActionBtnList']}>
              <a className={styles['editHeaderActionTagBtn']}/>
              <a className={styles['editHeaderActionTimeBtn']}/>
              <a className={styles['editHeaderActionBackBtn']}/>
              <a className={styles['editHeaderActionNextBtn']}/>
            </div>
          </div>
        </div>
        <div className={styles['editBtnList']}>
          <div className={styles['editBtnIconOne']}/>
          <div className={styles['editBtnIconTwo']}/>
          <div className={styles['editBtnIconThree']}/>
          <button className={styles['editDownloadBtn']}>
            <span className={styles['iconStyle']}/>
            <span>Download</span>
          </button>
          <button className={styles['editShareBtn']}>
            <span className={styles['iconStyle']}/>
            <span>Share</span>
          </button>
        </div>
      </div>
      <div className={styles['editContentBox']}>
        <div className={styles['editContentLeft']}>2</div>
        <div className={styles['editContent']}>3</div>
        <div className={styles['editContentRight']}>4</div>
      </div>
    </div>
  );
};

export default Edit;
