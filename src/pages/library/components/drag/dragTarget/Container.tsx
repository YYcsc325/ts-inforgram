import React, { memo } from "react";

import Dustbin from "./Dustbin";
import Box from "./Box";
import "./index.less";

const Container = memo(function Container() {
  let imgList = [
    {
      url:
        "https://img.pic88.com/preview/2020/08/01/15963058111043319.jpg!s640",
      name: "第一张图",
      customType: "img",
    },
    {
      url: "https://img.pic88.com/501608499.jpg!t640",
      name: "第二章图",
      customType: "lineChart",
    },
    {
      url: "https://img.pic88.com/16056469798640.jpg",
      name: "第三章图",
      customType: "img",
    },
  ];

  return (
    <div className={"dragMain"}>
      <div>
        {imgList.map((item) => (
          <Box {...item} />
        ))}
      </div>
      <div>
        <Dustbin />
      </div>
    </div>
  );
});
export default Container;
