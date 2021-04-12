import React from "react";

export interface IConversionProviderValue<T = any> {
  value?: T;
}

export const LayoutContext = React.createContext<IConversionProviderValue>({});

export const ContextProvider: React.FC<IConversionProviderValue> = ({
  value,
  children,
}) => {
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const ContextConsumer: React.FC = ({ children }) => {
  const Child = React.Children.only<any>(children);

  return (
    <LayoutContext.Consumer>
      {(v) => {
        return React.cloneElement(Child, v);
      }}
    </LayoutContext.Consumer>
  );
};

export const useLayoutHookContext = () => {
  return useContext(LayoutContext);
};

export const contextConsumer = (Component: any) => {
  if (typeof Component !== "function") {
    throw new Error("请传入构造函数");
  }
  return function (props = {}) {
    return (
      <LayoutContext.Consumer>
        {(v = {}) => {
          return <Component {...{ consumer: v, ...props }} />;
        }}
      </LayoutContext.Consumer>
    );
  };
};
