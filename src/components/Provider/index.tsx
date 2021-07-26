import React, { ComponentType } from "react";

export interface ICacheProviderValue<T = any> {
  name?: string;
  value?: T;
}

export const CacheContext = React.createContext<ICacheProviderValue>({});

export function CacheProvider({
  children,
  value,
  name,
}: React.PropsWithChildren<ICacheProviderValue>) {
  const context = useContext(CacheContext);
  const contextCache = context;
  if (!contextCache[name]) {
    contextCache[name] = value;
  }

  return (
    <CacheContext.Provider value={contextCache}>
      {children}
    </CacheContext.Provider>
  );
}

export interface ILayOutProviderValue<T = any> {
  value?: T;
}

export const LayoutContext = React.createContext<ILayOutProviderValue>({});

export const ContextProvider: React.FC<ILayOutProviderValue> = ({
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

export const useLayoutHookContext = (): any => {
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
