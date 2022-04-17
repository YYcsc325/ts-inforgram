import React, { useState } from "react";
import { Form } from "antd";
import Cookies from "js-cookie";
import { stringify } from "qs";
import { withRouter } from "umi";

import { FormView } from "@/components";
import { openNotification } from "@/util/utils";
import connect, { IConnectProps } from "@/pages/login/connect";

import RedicretComponent from "./Redicret";
import { loginConfig, loginTextConfig } from "./config";
import { mockData } from "./mockData";
import styles from "./index.less";

const RightComponent = connect(({ dispatchLogin, history }: any) => {
  const [form] = Form.useForm();
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        let { code, result, success } = await dispatchLogin(values);
        if (code == 200 && success) {
          Cookies.set("userLogin", stringify({ ...result }), {
            expires: 1,
          });
          history.push("/library");
        } else {
          openNotification({
            type: "warning",
            message: "email or password error",
            description: "邮箱或者密码输入错误，请从新确认!",
          });
        }
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
        <div>
          <FormView<
            {
              handleSubmit: typeof handleSubmit;
            },
            IConnectProps
          >
            form={form}
            config={loginConfig}
            formProps={{
              layout: "vertical",
            }}
            className={styles["formViewStyle"]}
          />
          <FormView
            form={form}
            config={loginTextConfig}
            className={styles["formViewStyle"]}
            stateProps={{
              isChecked,
              setIsChecked,
              handleSubmit,
            }}
          />
        </div>
      </div>
    </div>
  );
});
export default withRouter(RightComponent);
