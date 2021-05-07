import classNames from "classnames";
import { templateIdConsts } from "@/consts";
import { templateConfig } from "@/config";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import { BarChartOutlined } from "@ant-design/icons";
import DropdownSearch from "@/pages/library/components/DropdownSearch";
import { Link } from "umi";

import TemplateCard from "./components/TemplateCard";
import styles from "./index.less";

interface ITemplatesProps {
  [x: string]: any;
}

type templateIds = Array<{ key: keyof typeof templateIdConsts; value: number }>;

const prefixCls = createPrefixClass("templates", styles);

const Templates: FC<ITemplatesProps> = ({ consumer, match }) => {
  const { position } = match.params || {};

  const [searchVal, setSearchVal] = useState("");
  const [activeItem, setActiveItem] = useState(position);
  const [initialPosition, setInitialPosition] = useState<templateIds>([]);

  /** 总数据 */
  const [dataList] = useState(templateConfig);
  /** 过滤数据 */
  const [filterDataList, setFilterDataList] = useState<typeof templateConfig>(
    []
  );
  /** 所有子集数据（拍平后的数据） */
  /** 真正渲染的数据 */
  const renderData = useMemo(() => {
    return searchVal ? filterDataList : dataList;
  }, [searchVal, filterDataList, dataList]);

  /** 滚动方法 */
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

  /** 选择侧边进行滚动 */
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
  }, [renderData]);

  /** 搜索数据触发 */
  const hanldeSearch = useCallback((str: string) => {
    setSearchVal(str);
    setFilterDataList(filterSearchData(dataList, str));
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

  const handleWarpClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };
  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  return (
    <div className={prefixCls()} onClick={handleWarpClick}>
      <div className={prefixCls("header")}>
        <div className={prefixCls("main-title")}>
          <div>
            <div>
              <BarChartOutlined /> &nbsp;&nbsp;Infogram template library
            </div>
            <div className={prefixCls("subtitle")}>
              Choose a template by project type, color, or start with a blank
              page
            </div>
          </div>
          <Link to="/library">
            <img
              src="https://cdn.jifo.co/js/dist/ab2b3d6e05ae04bec125ec1499a3c032.svg"
              className={prefixCls("header-close")}
            />
          </Link>
        </div>
        <div className={prefixCls("search")}>
          <DropdownSearch
            placeholder={"Search template"}
            onSearch={hanldeSearch}
          />
        </div>
      </div>
      <div className={prefixCls("content")}>
        <div className={prefixCls("content-left")}>
          {dataList.map((item) => (
            <div
              className={classNames(prefixCls("l-item"), {
                [prefixCls("active")]: item.id === activeItem,
                [prefixCls("event")]: !renderData
                  .map((item) => item.title)
                  .includes(item.title),
              })}
              onClick={() => handleSilderClick(item.id)}
              key={item.title}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className={prefixCls("content-right")}>
          {renderData.map((item) => (
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

function filterSearchData(list: any = [], str: string) {
  return list
    .map((item: any) => {
      if (item.children && item.children.length) {
        const filterList = item.children.filter(
          (tag: any) =>
            (tag.name || tag.id).toLowerCase().indexOf(str.toLowerCase()) >= 0
        );
        if (filterList.length) {
          return { ...item, children: filterList };
        } else {
          return null;
        }
      } else {
        return null;
      }
    })
    .filter(Boolean);
}

export default contextConsumer(Templates);
