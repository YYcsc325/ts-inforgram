import React, { FC } from "react";

interface IImgBoxProps {
  url: string;
  width: number;
  height: number;
}

const ImgBox: FC<IImgBoxProps> = ({ url, width, height }) => {
  const styles = {
    display: "inline-block",
    width: `${width - 2}px`,
    height: `${height - 2}px`,
  };
  return <img src={url} style={{ ...styles }} />;
};

export default ImgBox;
