import React from "react";

export interface ICacheProviderValue<T = any> {
  value?: T;
}

export const CacheContext = React.createContext<ICacheProviderValue>({});

export const ContextProvider: React.FC<ICacheProviderValue> = ({
  value,
  children,
}) => {
  return (
    <CacheContext.Provider value={value}>{children}</CacheContext.Provider>
  );
};

export const ContextConsumer: React.FC = ({ children }) => {
  const Child = React.Children.only<any>(children);

  return (
    <CacheContext.Consumer>
      {(v) => {
        return React.cloneElement(Child, v);
      }}
    </CacheContext.Consumer>
  );
};
