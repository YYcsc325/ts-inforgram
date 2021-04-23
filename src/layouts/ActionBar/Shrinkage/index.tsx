import { Link } from "umi";
import classNames from "classnames";
import React, { FC, useState } from "react";
import { createPrefixClass } from "@/util/utils";
import UpDownArrow from "@/components/UpDownArrow";
import { MedicineBoxOutlined } from "@ant-design/icons";

import styles from "./index.less";
import LabelTitle from "../LabelTitle";
import { actionBarList, libraryItems } from "../mock";

const prefixCls = createPrefixClass("shrinkage", styles);

interface IShrinkageProps {
  selectId?: string;
  isOpen?: boolean;
}

const Shrinkage: FC<IShrinkageProps> = ({ isOpen, selectId }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleLibraryClick = () => {
    setVisible(!visible);
  };

  return (
    <div
      className={classNames(prefixCls(), {
        [prefixCls("open")]: isOpen,
        [prefixCls("close")]: !isOpen,
      })}
    >
      <div className={prefixCls("icon")}>
        <span className={prefixCls("logo")}></span>
        <span className={prefixCls("upgrade")}>Upgrade</span>
      </div>
      <div className={prefixCls("user")}>
        <span className={prefixCls("user-icon")}>YC</span>
        <span className={prefixCls("user-mes")}>
          <UpDownArrow type={"down"} className={prefixCls("outlined")} />
          <div className={prefixCls("username")}>YY小学徒 CSC...</div>
          <div className={prefixCls("mes")}>Basic account</div>
        </span>
      </div>
      <div className={prefixCls("library")}>
        <div className={prefixCls("library-item")} onClick={handleLibraryClick}>
          <MedicineBoxOutlined />
          <span className={prefixCls("key-name")}>Library</span>
          <span className={prefixCls("library-drop")}>
            <UpDownArrow type={visible ? "up" : "down"} />
          </span>
        </div>
        {visible && (
          <div>
            {libraryItems.map(
              ({
                icon: Icon,
                type = "span",
                name,
                needLine,
                backGround,
                needHover,
                style,
              }) => {
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
                    <Icon style={{ marginRight: "10px" }} />
                    <LabelTitle type={type} name={name} />
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
      <div className={prefixCls("function-key")}>
        {actionBarList.map(
          ({
            id,
            name,
            icon: Icon,
            link,
          }: {
            name: string;
            icon: Function;
            id: string;
            link: string;
          }) => {
            return (
              <Link
                to={link}
                className={classNames(prefixCls("key-item"))}
                key={id}
              >
                <Icon />
                <span className={prefixCls("key-name")}>{name}</span>
              </Link>
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

export default Shrinkage;
