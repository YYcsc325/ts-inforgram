import React, { memo } from "react";

import Dustbin from "./Dustbin";
import ImgBox from "./ImgBox";
import "./index.less";

const Container = memo(function Container() {
  let imgList = [
    {
      url: "https://img.pic88.com/preview/2020/08/01/15963058111043319.jpg!s640",
      name: "第一张图",
      type: "Img",
    },
    {
      url: "https://img.pic88.com/501608499.jpg!t640",
      name: "第二章图",
      type: "LineChart",
    },
    {
      url: "https://img.pic88.com/16056469798640.jpg",
      name: "第三章图",
      type: "Img",
    },
    {
      name: "第四张图",
      type: "H1",
      text: "Type something",
    },
  ];

  return (
    <div className={"dragMain"}>
      <div>
        {imgList.map((item) => (
          <ImgBox {...item} key={item.url} />
        ))}
      </div>
      <div>
        <Dustbin />
      </div>
    </div>
  );
});
export default Container;
