import React, { useEffect, useState, useMemo } from "react";
import classNames from "classnames";

import { menuNav, IMenuNavItem } from "./config";
import queryTemplate from "./templates";
import styles from "./index.less";

export interface IEditMenuNavProps {}

const EditMenuNav: React.FC<IEditMenuNavProps> = () => {
  const [menuNavData] = useState(menuNav);
  const [viewportFlag, setViewportFlag] = useState(false);
  const [viewportItem, setViewportItem] = useState<IMenuNavItem>({} as any);

  const showViewport = (e: React.MouseEvent<HTMLDivElement>, item: any) => {
    event?.stopImmediatePropagation();
    setViewportItem(item);
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

  const RenderDom = useMemo(() => {
    return queryTemplate(viewportItem.key);
  }, [viewportItem.key]);

  return (
    <div className={styles["editMenu"]}>
      {menuNavData.map((item) => (
        <div
          className={classNames({
            [styles.menuIcon]: viewportItem.title !== item["title"],
            [styles.menuIconCheck]: viewportItem.title === item["title"],
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
            <div>{viewportItem.title}</div>
            <div
              className={styles["viewportTitleIcon"]}
              onClick={() => setViewportFlag(false)}
            />
          </div>
          <div className={styles["viewportContent"]}>
            <RenderDom />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditMenuNav;
