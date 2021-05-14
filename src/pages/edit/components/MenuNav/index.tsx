import React, { useState } from "react";
import { Tooltip } from "antd";

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

export interface IEditMenuNavProps {}

const EditMenuNav: React.FC<IEditMenuNavProps> = ({ children, ...reset }) => {
  const [menuNavData] = useState(menuNav);
  const [viewportFlag, setViewportFlag] = useState(false);
  const [viewportTitle, setViewportTitle] = useState("");

  const showViewport = (item) => {
    setViewportTitle(item["title"]);
    setViewportFlag(true);
  };

  return (
    <div className={styles["editMenu"]}>
      {menuNavData.map((item) => (
        <Tooltip
          placement="right"
          title={<div style={{ padding: "4px 12px" }}>{item["title"]}</div>}
          key={item["class"]}
        >
          <div
            className={
              viewportFlag && viewportTitle === item["title"]
                ? styles["menuIconCheck"]
                : styles["menuIcon"]
            }
            onClick={() => showViewport(item)}
          >
            <div className={styles[item.class]} />
          </div>
        </Tooltip>
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
          <div className={styles["viewportContent"]}></div>
        </div>
      ) : null}
    </div>
  );
};

export default EditMenuNav;
