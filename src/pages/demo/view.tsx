import React, { useState } from "react";
import { Form, Button, message, Input, Select } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";

import {
  CustomModal,
  FormView,
  Steps,
  DragHTag,
  Ellipsis,
  RadioGroups,
  CardTabs,
  Composite,
} from "@/components";
import Drag from "@/components/DragDnd";
import DragBoxWarp from "@/components/Draggble";
import classNames from "classnames";

import { defaultConfig } from "./defaultConfig";
import styles from "./index.less";

const ComponentList = [
  {
    type: "FormView",
    description: "FormView组件演示",
    Component: ({ form, handleSubmit }: any) => {
      return (
        <div>
          <FormView
            form={form}
            config={defaultConfig as any}
            formProps={{
              layout: "horizontal",
            }}
            stateProps={{
              onChangeState: () => {},
              initialValueInput: "1234",
            }}
          />
          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            点击提交
          </Button>
        </div>
      );
    },
  },
  {
    type: "Steps",
    description: "Steps组件演示",
    Component: () => {
      return (
        <Steps current={1}>
          <Steps.Step title="测试数据1" />
          <Steps.Step title="测试数据2" />
          <Steps.Step title="测试数据3" />
        </Steps>
      );
    },
  },
  {
    type: "Modal",
    description: "Modal api调用组件演示",
    Component: ({ openModal }: any) => {
      return (
        <Button
          onClick={() => {
            openModal();
          }}
        >
          点击打开模态框
        </Button>
      );
    },
  },
  {
    type: "Copy",
    description: "Copy复制 组件演示",
    Component: () => {
      return (
        <CopyToClipboard
          text={"复制的内容传入到这里"}
          onCopy={() => {
            message.info("复制成功");
          }}
        >
          <div>
            <Button>复制</Button>
          </div>
        </CopyToClipboard>
      );
    },
  },
  {
    type: "HTag",
    description: "HTag可编辑元素 组件演示",
    Component: () => {
      return <DragHTag text={"Type something"} />;
    },
  },
  {
    type: "Draggble",
    description: "Draggble拖拽 组件演示",
    Component: () => {
      return (
        <DragBoxWarp defaultPostion={{ left: 200, top: 200 }}>
          <div>这里是需要拖拽的目标</div>
        </DragBoxWarp>
      );
    },
  },
  {
    type: "DragRnd",
    description: "DragRnd自由缩放拖拽 组件演示",
    Component: () => {
      return <Drag></Drag>;
    },
  },
  {
    type: "Ellipsis",
    description: "Ellipsis多行省略组件",
    Component: () => {
      return (
        <div style={{ width: "200px", height: "50px" }}>
          <Ellipsis
            text="这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据"
            isShowTips={true}
          ></Ellipsis>
        </div>
      );
    },
  },
  {
    type: "RadioGroups",
    description: "RadioGroups多选可自定义children",
    Component: () => {
      return (
        <RadioGroups onChange={() => {}} defaultValue="a">
          <RadioGroups.Item label="不限" value="a" />
          <RadioGroups.Item label="测试数据1" value="b">
            <Input style={{ width: 300, marginTop: 10 }} placeholder="请输入" />
          </RadioGroups.Item>
          <RadioGroups.Item label="测试数据2" value="c">
            <Select style={{ width: 300, marginTop: 10 }} placeholder="请选择">
              <Select.Option value="1">选择数据1</Select.Option>
            </Select>
          </RadioGroups.Item>
        </RadioGroups>
      );
    },
  },
  {
    type: "CardTabs",
    description: "CardTabs可切换tab框",
    Component: () => {
      return (
        <CardTabs defaultValue="1">
          <CardTabs.Tab
            title="Tab1"
            value="1"
            description="描述点数据1的内容"
          />
          <CardTabs.Tab
            title="Tab2"
            value="2"
            description="描述点数据2的内容"
          />
        </CardTabs>
      );
    },
  },
  {
    type: "Composite",
    description: "Composite渲染固定位置组件",
    Component: () => {
      return (
        <Composite>
          <Composite.Left>left</Composite.Left>
          <Composite.Right>right</Composite.Right>
        </Composite>
      );
    },
  },
];

const Index = () => {
  const [form] = Form.useForm();
  const [renderItem, setRenderItem] = useState(ComponentList[0]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values, "values");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const openModal = () => {
    const modal = CustomModal.showModal({
      footer: null,
      onCancel: () => {
        modal.destroy();
      },
      onOk: () => {
        modal.destroy();
      },
      children: (
        <div>
          <div>奥术大师多</div>
          <div>按时肯定会啊</div>
        </div>
      ),
    });
  };

  const handleClick = (item: any) => {
    setRenderItem(item);
  };

  const RenderComponent: any = renderItem.Component;

  return (
    <div className={styles.container}>
      <div>
        {ComponentList.map((item) => (
          <Button
            onClick={() => handleClick(item)}
            className={classNames({
              [styles["demo-btn-active"]]: item.type === renderItem.type,
            })}
          >
            {item.description}
          </Button>
        ))}
      </div>
      <div className={styles["demo-component"]}>
        <RenderComponent
          form={form}
          handleSubmit={handleSubmit}
          openModal={openModal}
        />
      </div>
    </div>
  );
};

export default Index;
