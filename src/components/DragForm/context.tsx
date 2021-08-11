import React from "react";

export interface ICacheProviderValue<T = any> {
  value?: T;
}

export const DragCacheContext = React.createContext<ICacheProviderValue>({});

export const DragContextProvider: React.FC<ICacheProviderValue> = ({
  value,
  children,
}) => {
  return (
    <DragCacheContext.Provider value={value}>
      {children}
    </DragCacheContext.Provider>
  );
};

export const DragContextConsumer: React.FC = ({ children }) => {
  const Child = React.Children.only<any>(children);

  return (
    <DragCacheContext.Consumer>
      {(v) => {
        return React.cloneElement(Child, v);
      }}
    </DragCacheContext.Consumer>
  );
};
