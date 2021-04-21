import React from "react";
import { contextConsumer, useLayoutHookContext } from "@/layouts/context";

const Crowd = ({ consumer }) => {
  const { value } = useLayoutHookContext();
  return (
    <div>
      <div>这是Crowd {value}</div>
      <div>{consumer?.value}</div>
    </div>
  );
};

export default contextConsumer(Crowd);
