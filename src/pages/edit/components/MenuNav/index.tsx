import React, { useEffect, useState } from "react";
import classNames from "classnames";
import ImgBox from "../ImgBox";

import styles from "./index.less";

const menuNav = [
  {
    title: "Add text",
    class: "addText",
  },
  {
    title: "Add chart",
    class: "addChart",
  },
  {
    title: "Add map",
    class: "addMap",
  },
  {
    title: "Add element",
    class: "addElement",
  },
  {
    title: "Add graphics",
    class: "addGraphics",
  },
  {
    title: "Add shape",
    class: "addShape",
  },
  {
    title: "Add integration",
    class: "addIntegration",
  },
];

let imgList = [
  {
    url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
    name: "第一张图",
    type: "Img",
  },
  {
    url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
    name: "第二章图",
    type: "LineChart",
  },
  {
    url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
    name: "第三章图",
    type: "Img",
  },
  {
    url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
    name: "第四张图",
    type: "H1",
    text: "Type something",
  },
];

export interface IEditMenuNavProps {}

const EditMenuNav: React.FC<IEditMenuNavProps> = ({ children, ...reset }) => {
  const [menuNavData] = useState(menuNav);
  const [viewportFlag, setViewportFlag] = useState(false);
  const [viewportTitle, setViewportTitle] = useState("");

  const showViewport = (e: React.MouseEvent<HTMLDivElement>, item: any) => {
    event?.stopImmediatePropagation();
    setViewportTitle(item["title"]);
    setViewportFlag(true);
  };
  const setViewport = () => {
    setViewportFlag(false);
  };

  useEffect(() => {
    document.addEventListener("click", setViewport);
    return () => {
      document.removeEventListener("click", setViewport);
    };
  }, []);

  return (
    <div className={styles["editMenu"]}>
      {menuNavData.map((item) => (
        <div
          className={classNames({
            [styles.menuIcon]: viewportTitle !== item["title"],
            [styles.menuIconCheck]: viewportTitle === item["title"],
          })}
          onClick={(e) => showViewport(e, item)}
          key={item.title}
        >
          <div className={styles[item.class]} />
        </div>
      ))}
      {viewportFlag ? (
        <div className={styles["viewport"]}>
          <div className={styles["viewportTitleBox"]}>
            <div>{viewportTitle}</div>
            <div
              className={styles["viewportTitleIcon"]}
              onClick={() => setViewportFlag(false)}
            />
          </div>
          <div className={styles["viewportContent"]}>
            {imgList.map((item) => (
              <ImgBox {...item} key={item.name}></ImgBox>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditMenuNav;
