import classNames from "classnames";
import { templateList, templateConfig } from "@/config";
import React, { FC, useEffect, useState } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import { BarChartOutlined } from "@ant-design/icons";
import DropdownSearch from "@/pages/library/components/DropdownSearch";

import TemplateCard from "./components/TemplateCard";
import styles from "./index.less";

interface ITemplatesProps {
  [x: string]: any;
}

const prefixCls = createPrefixClass("templates", styles);

const Templates: FC<ITemplatesProps> = ({ consumer, match }) => {
  const { position } = match.params || {};
  const [activeItem, setActiveItem] = useState("");
  const handleClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };

  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  return (
    <div className={prefixCls()} onClick={handleClick}>
      <div className={prefixCls("header")}>
        <div className={prefixCls("header-left")}>
          <div className={prefixCls("main-title")}>
            <BarChartOutlined /> &nbsp;&nbsp;Infogram template library
          </div>
          <div className={prefixCls("subtitle")}>
            Choose a template by project type, color, or start with a blank page
          </div>
        </div>
        <div className={prefixCls("header-right")}>
          <DropdownSearch placeholder={"Search template"} />
        </div>
      </div>
      <div className={prefixCls("content")}>
        <div className={prefixCls("content-left")}>
          {templateList.map((item) => (
            <div
              className={classNames(prefixCls("l-item"), {
                [prefixCls("active")]: item.path === activeItem,
              })}
              onClick={() => setActiveItem(item.path)}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className={prefixCls("content-right")}>
          {templateConfig.map((item) => (
            <div className={prefixCls("item-warp")}>
              <div className={prefixCls("item-title")}>{item.title}</div>
              <div className={prefixCls("item-card")}>
                {item.children.map((val) => (
                  <TemplateCard
                    width={item.width}
                    height={item.height}
                    url={val.url}
                    className={prefixCls("template-card")}
                    title={val.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default contextConsumer(Templates);
