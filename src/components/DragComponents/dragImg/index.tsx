import React, { FC } from "react";

interface DragImgProps {
  url: string;
}

const DragImg: FC<DragImgProps> = ({ url }) => {
  return <img style={{ width: "inherit", height: "inherit" }} src={url} />;
};

export default DragImg;
