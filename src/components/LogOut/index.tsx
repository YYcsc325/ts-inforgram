import React, { FC, useCallback } from "react";
import { CustomDropDown } from "@/components";
import { UserOutlined } from "@ant-design/icons";
import { history } from "umi";
import { isFunction } from "@/util/utils";
import Cookies from "js-cookie";

const options = [
  { value: "account", title: "Account settings", icon: <UserOutlined /> },
  {
    value: "profile",
    title: "Public profile and library",
    icon: <UserOutlined />,
  },
  { value: "billing", title: "Billing", icon: <UserOutlined /> },
  { value: "product", title: "Product updates", icon: <UserOutlined /> },
  { value: "logOut", title: "Log out", icon: <UserOutlined /> },
];

const jumpTo: any = {
  account: () => {},
  profile: () => {},
  billing: () => {},
  product: () => {},
  logOut: () => {
    Cookies.set("userLogin", "");
    history.push("/login");
  },
};

const LogOut: FC = () => {
  const handleMenuClick = useCallback(({ value }) => {
    if (isFunction(jumpTo[value])) {
      jumpTo[value]?.();
    }
  }, []);

  return (
    <CustomDropDown
      options={options}
      placement="bottomRight"
      onMenuClick={handleMenuClick}
    >
      <UserOutlined />
    </CustomDropDown>
  );
};

export default LogOut;
