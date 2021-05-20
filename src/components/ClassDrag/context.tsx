import React from "react";

export interface IDragProviderValue<T = any> {
  value?: T;
}

export const CalssDragContext = React.createContext<IDragProviderValue>({});

export const ContextProvider: React.FC<IDragProviderValue> = ({
  value,
  children,
}) => {
  return (
    <CalssDragContext.Provider value={value}>
      {children}
    </CalssDragContext.Provider>
  );
};

export const ContextConsumer: React.FC = ({ children }) => {
  const Child = React.Children.only<any>(children);

  return (
    <CalssDragContext.Consumer>
      {(v) => {
        return React.cloneElement(Child, v);
      }}
    </CalssDragContext.Consumer>
  );
};

export const contextConsumer = (Component: any) => {
  if (typeof Component !== "function") {
    throw new Error("请传入构造函数");
  }
  return function (props = {}) {
    return (
      <CalssDragContext.Consumer>
        {(v = {}) => {
          return <Component {...{ consumer: v, ...props }} />;
        }}
      </CalssDragContext.Consumer>
    );
  };
};
