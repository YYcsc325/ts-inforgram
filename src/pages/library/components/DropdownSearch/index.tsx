import React, { FC, useCallback } from "react";
import { Dropdown, Menu, Input } from "antd";
import { createPrefixClass } from "@/util/utils";
import { SearchOutlined } from "@ant-design/icons";
import { LazyLoadingImg } from "@/components";
import classNames from "classnames";

import styles from "./index.less";

const prefixCls = createPrefixClass("dropdown-search", styles);

interface IDropdownSearchProps {
  placeholder?: string;
  className?: string;
  onSearch?: (params: string) => void;
  onChange?: (params: string) => void;
}

interface IDropdownOptionProps {
  id: string;
  name: React.ReactNode;
  url: string;
  date: string;
  onChange?: (params: string) => void;
}

const DropdownSearch: FC<IDropdownSearchProps> & {
  Option: FC<IDropdownOptionProps>;
} = ({ placeholder, onSearch, onChange, className, children }) => {
  const childArray = React.Children.toArray(children);

  const handleChange = useCallback(
    (id) => {
      onChange?.(id);
    },
    [onChange]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch?.(e.target.value);
    },
    [onSearch]
  );

  const menu = (
    <Menu>
      {childArray.map((child: any) =>
        React.cloneElement(child, {
          onChange: handleChange,
        })
      )}
    </Menu>
  );
  return (
    <div className={classNames(prefixCls(), className)}>
      <div className={prefixCls("search-icon")}>
        <SearchOutlined />
      </div>
      <Dropdown overlay={menu} overlayClassName={styles["dropdown"]}>
        <Input.Search
          allowClear
          placeholder={placeholder}
          onChange={handleSearch}
          onFocus={(e) => {
            handleSearch(e);
          }}
        />
      </Dropdown>
    </div>
  );
};

const DropdownOption: FC<IDropdownOptionProps> = ({
  id,
  name,
  url,
  date,
  onChange,
}) => {
  const handleChange = () => {
    onChange?.(id);
  };

  return (
    <div onClick={handleChange} className={styles.option}>
      <LazyLoadingImg className={styles["option-img"]} url={url} />
      <div className={styles["option-mes"]}>{name}</div>
      <div className={styles["option-date"]}>{date}</div>
    </div>
  );
};

DropdownSearch.displayName = "DropdownSearch";
DropdownOption.displayName = "DropdownOption";

DropdownSearch.Option = DropdownOption;

export default DropdownSearch;
