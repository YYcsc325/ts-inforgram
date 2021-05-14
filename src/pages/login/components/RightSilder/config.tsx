import React from "react";
import { Checkbox } from "antd";
import { IConfigItem } from "@/components/FormView";
import connect from "@/pages/login/connect";
import styles from "./index.less";

export interface ConfigProps {
  form?: object;
  handleSubmit?: () => void;
  setIsChecked?: (params: any) => void;
  [x: string]: any;
}

export const loginConfig: IConfigItem[] = [
  {
    type: "Input",
    connect,
    isShow: () => true,
    formItemProps: {
      name: "email",
      label: "Email:",
      placeholder: "pleace input username",
    },
    itemProps: {
      style: {
        height: "40px",
      },
    },
  },
  {
    type: "Input",
    connect,
    isShow: () => true,
    formItemProps: {
      name: "passWord",
      label: "Password:",
      placeholder: "pleace input password",
    },
    itemProps: {
      style: {
        height: "40px",
      },
    },
  },
];
export const loginTextConfig = [
  {
    type: "custom",
    isShow: () => true,
    formItemProps: {
      key: "customCheckBox",
    },
    component: ({ isChecked, setIsChecked }: ConfigProps) => {
      return (
        <div className={styles["selectCheckBox"]}>
          <span style={{ float: "left" }}>
            <Checkbox
              checked={isChecked}
              onChange={(e) => {
                setIsChecked?.(e.target.checked);
              }}
            >
              Remember me
            </Checkbox>
          </span>
          <a>Forgot password?</a>
        </div>
      );
    },
  },
  {
    type: "custom",
    isShow: () => true,
    formItemProps: {
      key: "customSubmit",
    },
    component: ({ handleSubmit }: ConfigProps) => {
      return (
        <div
          className={styles["loginStyle"]}
          onClick={() => {
            handleSubmit?.();
          }}
        >
          Log in
        </div>
      );
    },
  },
  {
    type: "custom",
    isShow: () => true,
    formItemProps: {
      key: "customSubmitText",
    },
    component: () => {
      return (
        <div className={styles.loginTextStyle}>
          <div className={styles["loginTextStyle_header"]}>
            Don't have an account? Register here.
          </div>
          <div className={styles.loginLanguage}>
            <a>English</a>
            <a>Deutsch</a>
            <a>Português</a>
            <a>Español</a>
            <a>Français</a>
          </div>
        </div>
      );
    },
  },
];
