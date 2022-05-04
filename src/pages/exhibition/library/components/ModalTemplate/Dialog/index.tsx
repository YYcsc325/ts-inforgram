import React, { FC, useState, useMemo, useCallback } from "react";
import { createPrefixClass } from "@/util/utils";
import { Input } from "antd";
import {
  CloseOutlined,
  LeftOutlined,
  ShareAltOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import Tabs from "@/components/Tabs";

import styles from "./index.less";

const prefixCls = createPrefixClass("dialog", styles);

interface IDialogProps {
  [x: string]: any;
  onClose: () => void;
}

const componentList = [
  {
    title: "Publish & Share",
    key: "PUBLISH",
    component: ({ handleRenderKey }: any) => {
      return (
        <Tabs defaultActiveValue={"1"}>
          <Tabs.TabPane
            value="1"
            tab={
              <div>
                <ShareAltOutlined style={{ fontSize: "22px", color: "#aaa" }} />
                <div
                  style={{
                    marginBottom: "10px",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  Share
                </div>
              </div>
            }
          >
            <div className={prefixCls("pane-share")}>
              <div className={prefixCls("title")}>Title</div>
              <Input
                defaultValue="Step by Step Charts"
                className={prefixCls("input")}
              ></Input>
              <div className={prefixCls("title")}>Description:</div>
              <Input.TextArea
                defaultValue={"后续优化一下"}
                className={prefixCls("text-area")}
              ></Input.TextArea>
              <div
                className={prefixCls("email")}
                onClick={() => handleRenderKey("EMAIL")}
              >
                Email
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            value="2"
            tab={
              <div>
                <TeamOutlined style={{ fontSize: "22px", color: "#aaa" }} />
                <div
                  style={{
                    marginBottom: "10px",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  Add team members
                </div>
              </div>
            }
          >
            这里是Add team members的内容
          </Tabs.TabPane>
        </Tabs>
      );
    },
  },
  {
    title: "Send as email",
    key: "EMAIL",
    component: ({ handleRenderKey }: any) => {
      return <div>这里写email相关内容</div>;
    },
  },
];

const Dialog: FC<IDialogProps> = ({ onClose }) => {
  const [renderTarget, setRenderTarget] = useState(componentList[0]);

  const handleClose = () => {
    onClose?.();
  };

  const title = useMemo(() => {
    return renderTarget.title;
  }, [renderTarget]);

  const key = useMemo(() => {
    return renderTarget.key;
  }, [renderTarget]);

  const Component = useMemo(() => {
    return renderTarget.component;
  }, [renderTarget]);

  const handleRenderKey = useCallback(
    (key) => {
      setRenderTarget(componentList.find((item) => item.key === key));
    },
    [setRenderTarget, componentList]
  );

  return (
    <div className={prefixCls()}>
      <div className={prefixCls("header")}>
        {key === "EMAIL" && (
          <span
            className={prefixCls("back")}
            onClick={() => handleRenderKey("PUBLISH")}
          >
            <LeftOutlined />
            Back
          </span>
        )}
        <span>{title}</span>
        <span className={prefixCls("close")} onClick={handleClose}>
          <CloseOutlined />
        </span>
      </div>
      <div className={prefixCls("tab")}>
        <Component {...{ handleRenderKey }} />
      </div>
    </div>
  );
};

export default Dialog;
