import React from "react";

export interface IEditProviderValue<T = any> {
  value?: T;
}

export const EditContext = React.createContext<IEditProviderValue>({});

export const EditContextProvider: React.FC<IEditProviderValue> = ({
  value,
  children,
}) => {
  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
};

export const editContextConsumer = (Component: any) => {
  if (typeof Component !== "function") {
    throw new Error("请传入构造函数");
  }
  return function (props = {}) {
    return (
      <EditContext.Consumer>
        {(v = {}) => {
          return <Component {...{ editConsumer: v, ...props }} />;
        }}
      </EditContext.Consumer>
    );
  };
};
