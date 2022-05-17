import React from "react";
import { Checkbox } from "antd";
import { history, useModel } from "umi";
import { createPrefixClass } from "@/util/utils";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import {
  TableOutlined,
  DeleteOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import LogOut from "@/components/LogOut";
import { IProjectListResponse } from "@/service/library";

import Empty from "./components/Empty";
import styles from "./Container.less";
import RotateBox from "./components/rotateBox";
import Disgraceful from "./components/Disgraceful";
import DropdownSearch from "./components/DropdownSearch";
import TableCard from "./components/TableCard";
import { selectConfigure } from "./config";

const prefixCls = createPrefixClass("right-silder", styles);

const Container: React.FC = () => {
  const [exhibitionStore] = useModel("useExhibitionModel.index");
  const [searchVal, setSearchVal] = React.useState("");
  const [tableTab, setTableTab] = React.useState(false);
  /** 总数据 */
  const [dataList, setDataList] = React.useState<IProjectListResponse>([]);
  /** 过滤数据 */
  const [filterDataList, setFilterDataList] =
    React.useState<IProjectListResponse>([]);

  React.useEffect(() => {
    setDataList(exhibitionStore.projectList);
  }, [exhibitionStore.projectList]);

  /** 真正渲染的数据 */
  const renderList = React.useMemo(() => {
    return searchVal ? filterDataList : dataList;
  }, [searchVal, filterDataList, dataList]);

  /** 选中的数据list, id [1,2,3] */
  const checkedList = React.useMemo(() => {
    return renderList.filter((item) => item.checked).map((item) => item.id);
  }, [renderList]);

  /** 全选按钮 */
  const handleSelectAll = (e: CheckboxChangeEvent) => {
    const needCheckedList = renderList.map((item) => item.id);
    const ev = e.target.checked;
    setDataList([
      ...dataList.map((item) => ({
        ...item,
        checked: needCheckedList.includes(item.id) ? ev : item.checked,
      })),
    ]);
    setFilterDataList([
      ...filterDataList.map((item) => ({
        ...item,
        checked: needCheckedList.includes(item.id) ? ev : item.checked,
      })),
    ]);
  };
  /** 单个选择 */
  const handleSelectSingle = (checked: boolean, id: string) => {
    setDataList([
      ...dataList.map((item) => ({
        ...item,
        checked: item.id === id ? checked : item.checked,
      })),
    ]);
    setFilterDataList([
      ...filterDataList.map((item) => ({
        ...item,
        checked: item.id === id ? checked : item.checked,
      })),
    ]);
  };
  /** 搜索数据触发 */
  const hanldeSearch = React.useCallback(
    (str: string) => {
      const filterData = dataList.filter(
        (tag) =>
          (tag.name || tag.id).toLowerCase().indexOf(str.toLowerCase()) >= 0
      );
      setSearchVal(str);
      setFilterDataList(filterData);
    },
    [dataList]
  );

  /**  点击删除操作  */
  const handleDelete = React.useCallback(() => {
    const targetData = dataList.filter(
      (item) => !checkedList.includes(item.id)
    );
    const filterData = filterDataList.filter(
      (item) => !checkedList.includes(item.id)
    );
    setFilterDataList(filterData);
    setDataList(targetData);
  }, [dataList, checkedList, filterDataList]);

  /** 选择数据展示切换 */
  const handleTableChange = React.useCallback(() => {
    setTableTab(!tableTab);
  }, [tableTab]);

  /** 跳转到操作页面 */
  const handleLinkToEdit = (id: string) => {
    history.push(`/edit?id=${id}`);
  };

  const indeterminate = React.useMemo(() => {
    return !!checkedList.length && checkedList.length < renderList.length;
  }, [checkedList, renderList]);

  const checkAll = React.useMemo(() => {
    if (renderList.length) return checkedList.length === renderList.length;
    return false;
  }, [checkedList, renderList]);

  return (
    <div className={prefixCls()}>
      <div className={prefixCls("header")}>
        <div className={prefixCls("intro")}>
          <div className={prefixCls("title")}>
            <div className={prefixCls("l-title")}>
              <div>
                <AppstoreOutlined />
                <span style={{ marginLeft: "15px" }}>All projects</span>
              </div>
              <div style={{ fontSize: "12px" }}>{dataList.length} project</div>
            </div>
            <div className={prefixCls("r-title")}>
              <LogOut />
            </div>
          </div>
          <div className={prefixCls("select")}>
            {selectConfigure.map((item) => (
              <RotateBox
                className={prefixCls("rotate-box")}
                name={item.name}
                style={item.boxStyle}
                key={item.id}
                onClick={() => history.push(item.path)}
              >
                <RotateBox.Template
                  className={prefixCls("rotate-template")}
                  backgroundColor={item.backgroundColor}
                  width={item.width}
                  height={item.height}
                >
                  <RotateBox.Icon backgroundColor={item.backgroundColor}>
                    {item.icon}
                  </RotateBox.Icon>
                </RotateBox.Template>
              </RotateBox>
            ))}
          </div>
        </div>
        <div className={prefixCls("odps")}>
          <div className={prefixCls("odps-left")}>
            <Checkbox
              indeterminate={indeterminate}
              style={{ marginBottom: "4px" }}
              checked={checkAll}
              onChange={handleSelectAll}
            />
            {!checkedList.length ? (
              <span className={prefixCls("odps-select")}>Select all</span>
            ) : (
              <span className={prefixCls("odps-delete")} onClick={handleDelete}>
                <DeleteOutlined style={{ fontSize: "18px" }} />
              </span>
            )}
          </div>
          <div className={prefixCls("odps-right")}>
            <div className={prefixCls("r-tab")} onClick={handleTableChange}>
              {tableTab ? <TableOutlined /> : <AppstoreOutlined />}
            </div>
            <div className={prefixCls("r-search")}>
              <DropdownSearch
                onSearch={hanldeSearch}
                onChange={handleLinkToEdit}
                placeholder="Search by name or author"
              >
                {renderList.map(({ name, url, date, id }) => (
                  <DropdownSearch.Option
                    name={name}
                    url={url}
                    date={date}
                    id={id}
                    key={id}
                  />
                ))}
              </DropdownSearch>
            </div>
          </div>
        </div>
      </div>
      <div className={prefixCls("content")}>
        {renderList.length ? (
          renderList.map(({ checked, url, id, name }) => {
            if (tableTab) {
              return (
                <TableCard
                  url={url}
                  checked={checked}
                  name={name}
                  id={id}
                  key={id}
                  onClick={handleLinkToEdit}
                  className={prefixCls("table-card")}
                  onCheck={(checked) => handleSelectSingle(checked, id)}
                />
              );
            } else {
              return (
                <Disgraceful
                  id={id}
                  name={name}
                  url={url}
                  key={id}
                  checked={checked}
                  onClick={handleLinkToEdit}
                  onCheck={(checked) => handleSelectSingle(checked, id)}
                  className={prefixCls("content-item")}
                />
              );
            }
          })
        ) : (
          <Empty text={searchVal} className={prefixCls("empty")} />
        )}
      </div>
    </div>
  );
};

export default Container;
