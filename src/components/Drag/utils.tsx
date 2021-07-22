import React, { ComponentType } from "react";

// class _store1 {
//   // @ts-ignore
//   #store = {};

//   getValues = () => this.#store;

//   getValue = (key) => this.#store[key];

//   setValue = (key, value) => {
//     this.#store[key] = value;
//   };
// }

type IStore = any;

export interface IStoreResult {
  getValues: () => IStore;
  getValue: (key: string) => IStore;
  setValue: (key: string, value: any) => void;
}

export function store(): IStoreResult {
  const _store: IStore = {};
  return {
    getValues: () => _store,
    getValue: (key) => _store[key],
    setValue: (key, value) => {
      _store[key] = value;
    },
  };
}

export function createBaseDom(WarpedComponent: ComponentType<any>) {
  return function decorate(props: any) {
    return <WarpedComponent {...props} drag={store()} />;
  };
}
