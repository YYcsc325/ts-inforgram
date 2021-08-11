import React, { ComponentType, Component } from "react";

class _store1 {
  // @ts-ignore
  #store: any = {}; // 类的私有化属性

  getValues = () => this.#store;

  getValue = (key: string) => this.#store[key];

  setValue = (key: string, value: any) => {
    this.#store[key] = value;
  };
}

type IStore = any;

export interface IStoreResult {
  getValues: () => IStore;
  getValue: (key: string) => IStore;
  setValue: (key: string, value: any) => void;
  setInitailValue: (value: any) => void;
}

export function store(): IStoreResult {
  var _store: IStore = {};
  return {
    getValues: () => {
      return _store;
    },
    getValue: (key) => _store[key],
    setValue: (key, value) => {
      _store[key] = value;
    },
    setInitailValue: (value) => {
      _store = value;
    },
  };
}
