import React, { FC, useState } from "react";
import {
  DownOutlined,
  UpOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { noop } from "lodash";
import classNames from "classnames";
import { createPrefixClass } from "@/util/utils";

import styles from "./index.less";
import { data, libraryItems } from "./mock";

const prefixCls = createPrefixClass("left-silder", styles);

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
    <div className={prefixCls()}>
      <div className={prefixCls("icon")}>
        <span className={prefixCls("infogram")}>
          <img
            style={{ width: "110px" }}
            src="https://cdn-web.jifo.co/_next/static/images/logo-light-6a12d956b64625dbed69e989c9a86b03.svg"
            alt="Inforgram"
          />
        </span>
        <span className={prefixCls("upgrade")}>Upgrade</span>
      </div>
      <div className={prefixCls("user")}>
        <span className={prefixCls("user-icon")}>YC</span>
        <span className={prefixCls("user-mes")}>
          <DownOutlined className={prefixCls("outlined")} />
          <div className={prefixCls("username")}>YY小学徒 CSC...</div>
          <div className={prefixCls("mes")}>Basic account</div>
        </span>
      </div>
      <div className={prefixCls("library")}>
        <div
          className={prefixCls("library-item")}
          onClick={() => setVisible(!visible)}
        >
          <MedicineBoxOutlined />
          <span className={prefixCls("key-name")}>Library</span>
          <span className={prefixCls("library-drop")}>
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
                    className={classNames(prefixCls("library-open"), {
                      [prefixCls("border-line")]: needLine,
                      [prefixCls("background-line")]: backGround === "line",
                      [prefixCls("background-rl")]: backGround === "rl",
                      [prefixCls("background-hover")]: needHover,
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
      <div className={prefixCls("function-key")}>
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
                className={classNames(prefixCls("key-item"), {
                  [prefixCls("active")]: id === active,
                })}
                onClick={() => setActive(id)}
                key={name}
              >
                <Com />
                <span className={prefixCls("key-name")}>{name}</span>
              </div>
            );
          }
        )}
      </div>
      <div className={prefixCls("introduce")}>
        <div>Learn how to use Infogram</div>
        <div style={{ marginTop: "20px" }}>Get inspiration from examples</div>
      </div>
    </div>
  );
};

export default LeftSilder;
