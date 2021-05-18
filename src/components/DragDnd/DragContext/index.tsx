import React, { FC, useContext } from "react";

const DragContext = React.createContext({});

DragContext.displayName = "DragContext";

interface DragConextCacheProps {
  name: string;
  reflct?: any;
}

export const DragConextCache: FC<DragConextCacheProps> = ({
  children,
  name,
  reflct,
}) => {
  const cache = useContext(DragContext);
  const privateCache: any = cache;
  if (!privateCache[name]) {
    privateCache[name] = reflct;
  }
  return (
    <DragContext.Provider value={privateCache}>{children}</DragContext.Provider>
  );
};

export default DragContext;
