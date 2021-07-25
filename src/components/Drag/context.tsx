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
