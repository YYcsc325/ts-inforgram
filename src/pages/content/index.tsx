import React, { FC, useEffect } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import { Drag } from "@/components";
import { Input, Select } from "antd";

import styles from "./index.less";

interface IContentProps {
  [x: string]: any;
}

const prefixCls = createPrefixClass("content", styles);

const Content: FC<IContentProps> = ({ consumer, drag }) => {
  const handleClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };

  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  return (
    <div className={prefixCls()} onClick={handleClick} id="container">
      <button
        onClick={() => {
          console.log(drag.getValues(), "___-");
        }}
      >
        点击获取数据
      </button>
      <button onClick={() => drag.setValue("key1", 1)}>设置数据</button>
      <Drag drag={drag}>
        <Drag.Item name="key1">
          <Input
            onChange={(e) => console.log(e, "e____")}
            style={{ width: 300 }}
          />
        </Drag.Item>
        <Drag.Item name="key2" initailValue={2}>
          <Input style={{ width: 300 }} />
        </Drag.Item>
        <Drag.Item name="key3" initailValue={"1"}>
          <Select style={{ width: 300 }}>
            <Select.Option value="1" key="1">
              测试数据1
            </Select.Option>
            <Select.Option value="2" key="2">
              测试数据2
            </Select.Option>
          </Select>
        </Drag.Item>
      </Drag>
    </div>
  );
};

export default Drag.create(contextConsumer(Content));
