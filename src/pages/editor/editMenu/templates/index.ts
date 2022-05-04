import { ComponentType } from "react";
import { IMenuNavConsts } from "../config";

export default function (type: IMenuNavConsts): ComponentType<any> {
  try {
    return require(`./${type}`).default;
  } catch (e) {
    return () => null;
  }
}
