import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FormView } from '@/components';
import { Form } from 'antd';
import { openNotification } from '@/util/utils';
import Cookies from 'js-cookie';

import RedicretComponent from './Redicret';
import { loginConfig, loginTextConfig } from './config';
import { mockData } from './mockData';
import styles from '../index.less';
import connect from '../connect';

const RightComponent = ({ login, history }: any) => {
  const [form] = Form.useForm();
  const [isChecked, setIsChecked] = useState(false);
  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (login) {
          let res = await login(values);
          if (res.code === 200) {
            const { email, password, login } = res.result || {};
            Cookies.set(
              'userLogin',
              {
                email,
                password,
                login,
              },
              { expires: 1 },
            );
            history.replace('/home');
          } else {
            openNotification({
              type: 'warning',
              message: 'email or password error',
              description: '邮箱或者密码输入错误，请从新确认!',
            });
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return (
    <div className={styles['form_wrapper']}>
      <div className={styles['form_container']}>
        <h1>Log in</h1>
        <div className={styles['soc_connect']}>
          {(mockData || []).map((item) => (
            <RedicretComponent {...item} key={item.rel} />
          ))}
        </div>
        <div className={styles['ls_or']}>
          <div className={styles['ls_line']}></div>
          <div className={styles['ls_text']}>or use your email:</div>
        </div>
        <div>
          <FormView
            form={form}
            config={loginConfig}
            formProps={{
              layout: 'vertical',
            }}
            className={styles['formViewStyle']}
          />
          <FormView
            form={form}
            config={loginTextConfig}
            className={styles['formViewStyle']}
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
};
export default connect(RightComponent);
