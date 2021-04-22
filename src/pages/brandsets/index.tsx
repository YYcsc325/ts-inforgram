import React, { useState, useRef } from "react";
import ActionBar from "@/components/ActionBar";

const Brandsets = () => {
  const [showShrinkage, setShowShrinkage] = useState(false);
  const actionBarRef = useRef<any>(null);

  const handleChange = () => {
    actionBarRef?.current?.handleOpenShrinkage?.(false);
  };

  return (
    <div>
      <ActionBar showShrinkage={showShrinkage} ref={actionBarRef} />
      <div
        style={{ width: "100%", height: "100vh", backgroundColor: "#aaa" }}
        onClick={handleChange}
      ></div>
    </div>
  );
};

export default Brandsets;
