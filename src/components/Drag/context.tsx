import React, { useContext } from "react";

export interface IDragProviderValue<T = any> {
  value?: T;
}

export const DragContext = React.createContext<IDragProviderValue>({});

export const ContextProvider: React.FC<IDragProviderValue> = ({
  value,
  children,
}) => {
  return <DragContext.Provider value={value}>{children}</DragContext.Provider>;
};

export const ContextConsumer: React.FC = ({ children }) => {
  const Child = React.Children.only<any>(children);

  return (
    <DragContext.Consumer>
      {(v) => {
        return React.cloneElement(Child, v);
      }}
    </DragContext.Consumer>
  );
};

export const useDragHookContext = () => {
  return useContext(DragContext);
};

export const contextConsumer = (Component: any) => {
  if (typeof Component !== "function") {
    throw new Error("请传入构造函数");
  }
  return function (props = {}) {
    return (
      <DragContext.Consumer>
        {(v = {}) => {
          return <Component {...{ consumer: v, ...props }} />;
        }}
      </DragContext.Consumer>
    );
  };
};
