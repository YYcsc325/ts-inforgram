import { Link } from "umi";
import classNames from "classnames";
import React, { FC, useState, useMemo } from "react";
import { createPrefixClass } from "@/util/utils";
import UpDownArrow from "@/components/UpDownArrow";
import { MedicineBoxOutlined } from "@ant-design/icons";
import UserTolTip from "@/layouts/ActionBar/UserTolTip";
import { actionBarConsts } from "@/consts";

import styles from "./index.less";
import LabelTitle from "../LabelTitle";
import { actionBarList, actionBarItems, libraryItems } from "../mock";

const prefixCls = createPrefixClass("shrinkage", styles);

interface IShrinkageProps {
  selectId?: string;
  isOpen?: boolean;
}

const Shrinkage: FC<IShrinkageProps> = ({ isOpen, selectId }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isShowUser, setIsShowUser] = useState(false);

  document.onclick = (e) => {
    e.stopPropagation();
    setIsShowUser(false);
  };

  const handleLibraryClick = () => {
    setVisible(!visible);
  };

  const renderStepList: any[] = useMemo(() => {
    return selectId === actionBarConsts.LIBRARY
      ? actionBarList
      : actionBarItems;
  }, [selectId]);

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
      <div className={prefixCls("user")} onClick={() => setIsShowUser(true)}>
        <span className={prefixCls("user-icon")}>YC</span>
        <span className={prefixCls("user-mes")}>
          <UpDownArrow type={"down"} className={prefixCls("outlined")} />
          <div className={prefixCls("username")}>YY小学徒 CSC...</div>
          <div className={prefixCls("mes")}>Basic account</div>
        </span>
      </div>
      {selectId === actionBarConsts.LIBRARY && (
        <div className={prefixCls("library")}>
          <div
            className={prefixCls("library-item")}
            onClick={handleLibraryClick}
          >
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
      )}
      <div className={prefixCls("function-key")}>
        {renderStepList.map(({ id, name, icon: Icon, link }) => {
          return (
            <Link
              to={link}
              className={classNames(prefixCls("key-item"), {
                [prefixCls("active")]: id === selectId,
              })}
              key={id}
            >
              <Icon />
              <span className={prefixCls("key-name")}>{name}</span>
            </Link>
          );
        })}
      </div>
      <div className={prefixCls("introduce")}>
        <div>Learn how to use Infogram</div>
        <div style={{ marginTop: "20px" }}>Get inspiration from examples</div>
      </div>
      {isShowUser && (
        <UserTolTip
          userName={"YY小学徒 CSC小..."}
          className={prefixCls("user-position")}
        />
      )}
    </div>
  );
};

export default Shrinkage;
