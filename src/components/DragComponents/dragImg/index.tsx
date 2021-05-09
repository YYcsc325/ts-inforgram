import React, { FC } from "react";

interface DragImgProps {
  url: string;
  scale?: boolean; // 是否需要等比例缩放展示图片
}

const DragImg: FC<DragImgProps> = ({ url, scale = false }) => {
  return scale ? (
    <div
      style={{
        width: "inherit",
        height: "inherit",
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  ) : (
    <img style={{ width: "inherit", height: "inherit" }} src={url} />
  );
};

export default DragImg;
