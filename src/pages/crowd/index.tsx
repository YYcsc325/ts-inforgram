import React from "react";
import { contextConsumer, useLayoutHookContext } from "@/layouts/context";

const Crowd = () => {
  const { value } = useLayoutHookContext();
  return (
    <div>
      <div>这是Crowd {value}</div>
      <div>
        <CrowdChildren />
      </div>
    </div>
  );
};

function CrowdChildren({ consumer }) {
  return <div>这是CrowdChildren {consumer.value}</div>;
}

export default contextConsumer(Crowd);
