import React, { FC, useState } from "react";
import {
  DownOutlined,
  UpOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { noop } from "lodash";
import classNames from "classnames";

import styles from "./index.less";
import { data, libraryItems } from "./mock";

type MapComType = "a" | "span";

const MapCom = ({ name, type }: { name: string; type: MapComType }) => {
  const map = {
    a: <a href="">{name}</a>,
    span: <span>{name}</span>,
  };
  return map[type] || map.span;
};

const LeftSilder = () => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>();

  return (
    <div className={styles["left-silder"]}>
      <div className={styles.icon}>
        <span className={styles.infogram}>infogram</span>
        <span className={styles.upgrade}>Upgrade</span>
      </div>
      <div className={styles.user}>
        <span className={styles["user-icon"]}>YC</span>
        <span className={styles["user-mes"]}>
          <DownOutlined className={styles.outlined} />
          <div className={styles.username}>YY小学徒 CSC...</div>
          <div className={styles.mes}>Basic account</div>
        </span>
      </div>
      <div className={styles.library}>
        <div
          className={styles["library-item"]}
          onClick={() => setVisible(!visible)}
        >
          <MedicineBoxOutlined />
          <span className={styles["key-name"]}>Library</span>
          <span className={styles["library-drop"]}>
            {visible ? <UpOutlined /> : <DownOutlined />}
          </span>
        </div>
        {visible && (
          <div>
            {libraryItems.map(
              ({
                icon,
                type = "span",
                name,
                needLine,
                backGround,
                needHover,
                style,
              }) => {
                const IconCom = icon || noop;
                return (
                  <div
                    className={classNames(styles["library-open"], {
                      [styles["border-line"]]: needLine,
                      [styles["background-line"]]: backGround === "line",
                      [styles["background-rl"]]: backGround === "rl",
                      [styles["background-hover"]]: needHover,
                    })}
                    style={style}
                    key={name}
                  >
                    <IconCom style={{ marginRight: "10px" }} />
                    <MapCom type={type} name={name} />
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
      <div className={styles["function-key"]}>
        {data.map(
          ({
            name,
            icon,
            id,
          }: {
            name: string;
            icon: Function;
            id: string;
          }) => {
            const Com = icon || noop;
            return (
              <div
                className={classNames(styles["key-item"], {
                  [styles.active]: id === active,
                })}
                onClick={() => setActive(id)}
                key={name}
              >
                <Com />
                <span className={styles["key-name"]}>{name}</span>
              </div>
            );
          }
        )}
      </div>
      <div className={styles.introduce}>
        <div>Learn how to use Infogram</div>
        <div style={{ marginTop: "20px" }}>Get inspiration from examples</div>
      </div>
    </div>
  );
};

export default LeftSilder;
