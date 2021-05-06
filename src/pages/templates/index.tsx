import classNames from "classnames";
import { templateIdConsts } from "@/consts";
import { templateList, templateConfig } from "@/config";
import React, { FC, useCallback, useEffect, useState } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import { BarChartOutlined } from "@ant-design/icons";
import DropdownSearch from "@/pages/library/components/DropdownSearch";

import TemplateCard from "./components/TemplateCard";
import styles from "./index.less";

interface ITemplatesProps {
  [x: string]: any;
}

type templateIds = Array<{ key: keyof typeof templateIdConsts; value: number }>;

const prefixCls = createPrefixClass("templates", styles);

const Templates: FC<ITemplatesProps> = ({ consumer, match }) => {
  const { position } = match.params || {};

  const [activeItem, setActiveItem] = useState(position);
  const [initialPosition, setInitialPosition] = useState<templateIds>([]);

  const handleWarpClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };
  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  const scrollById = (id: string, positionList: templateIds) => {
    const scroll =
      positionList.find((item: any) => item.key === id)?.value || 0;
    if (scroll >= 0) {
      window.scrollTo({
        left: 0,
        top: scroll,
        behavior: "smooth",
      });
    }
  };

  const handleSilderClick = useCallback(
    (id) => {
      scrollById(id, initialPosition);
      setActiveItem(id);
    },
    [setActiveItem, scrollById, initialPosition]
  );

  useEffect(() => {
    const list: templateIds = templateConfig.map((item) => ({
      key: item.id,
      value: (document.getElementById(item.id)?.offsetTop || 0) - 160,
    }));
    setInitialPosition(list);
    scrollById(activeItem, list);
  }, []);

  // useEffect(() => {
  //   window.onscroll = () => {
  //     const findPosition = initialPosition.find(
  //       (item) =>
  //         window.scrollY - item.value >= -16 &&
  //         window.scrollY - item.value <= 16
  //     );
  //     if (findPosition) {
  //       setActiveItem(findPosition.key);
  //     }
  //   };
  // }, [initialPosition]);

  return (
    <div className={prefixCls()} onClick={handleWarpClick}>
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
                [prefixCls("active")]: item.id === activeItem,
              })}
              onClick={() => handleSilderClick(item.id)}
              key={item.title}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className={prefixCls("content-right")}>
          {templateConfig.map((item) => (
            <div className={prefixCls("item-warp")} key={item.title}>
              <div className={prefixCls("item-title")} id={item.id}>
                {item.title}
              </div>
              <div className={prefixCls("item-card")}>
                {item.children.map((val) => (
                  <TemplateCard
                    width={item.width}
                    height={item.height}
                    url={val.url}
                    title={val.name}
                    key={val.name}
                    className={prefixCls("template-card")}
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
