import React, { FC, useEffect } from "react";
import { contextConsumer } from "@/layouts/context";

interface IBrandsetsProps {
  [x: string]: any;
}

const Brandsets: FC<IBrandsetsProps> = ({ consumer }) => {
  const handleClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };

  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }} onClick={handleClick}></div>
  );
};

export default contextConsumer(Brandsets);
