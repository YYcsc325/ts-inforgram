import React, { FC } from "react";

interface DragImgProps {
  url: string;
  width: number;
  height: number;
}

const DragImg: FC<DragImgProps> = ({ url, width, height }) => {
  return (
    <img
      src={url}
      style={{ width, height }}
      onMouseDown={(e) => e.preventDefault()}
    />
  );
};

export default DragImg;
