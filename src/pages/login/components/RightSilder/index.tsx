import React, { useState } from "react";
import { Form, Checkbox, Input } from "antd";
import { useModel } from "umi";

import RedicretComponent from "./Redicret";
import { mockData } from "./mockData";
import styles from "./index.less";

const RightComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [_, userActions] = useModel("useUserModel.index");

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        userActions.fetchUserData(values);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div className={styles["form_wrapper"]}>
      <div className={styles["form_container"]}>
        <h1>Log in</h1>
        <div className={styles["soc_connect"]}>
          {(mockData || []).map((item) => (
            <RedicretComponent {...item} key={item.rel} />
          ))}
        </div>
        <div className={styles["ls_or"]}>
          <div className={styles["ls_line"]}></div>
          <div className={styles["ls_text"]}>or use your email:</div>
        </div>
        <div className={styles["form"]}>
          <Form form={form} layout="vertical">
            <Form.Item name="email" label="Email">
              <Input placeholder="pleace input email" />
            </Form.Item>
            <Form.Item name="passWord" label="Password">
              <Input placeholder="pleace input password" />
            </Form.Item>
          </Form>
        </div>
        <div className={styles["footer"]}>
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
          <div
            className={styles["loginStyle"]}
            onClick={() => {
              handleSubmit?.();
            }}
          >
            Log in
          </div>
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
        </div>
      </div>
    </div>
  );
};
export default RightComponent;
