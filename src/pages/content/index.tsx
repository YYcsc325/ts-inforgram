import React, { FC, useEffect } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import ClassDrag from "@/components/ClassDrag";
import ImgBox from "@/components/DragComponents/dragImg";

import styles from "./index.less";

interface IContentProps {
  [x: string]: any;
}

const prefixCls = createPrefixClass("content", styles);

const config = [
  {
    id: "1",
    defaultPostion: { left: 100, top: 100 },
    defaultStyle: { width: 100, height: 100 },
    url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
    scale: true,
  },
  {
    id: "2",
    defaultPostion: { left: 200, top: 200 },
    url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
    scale: false,
  },
];

const Content: FC<IContentProps> = ({ consumer }) => {
  const handleClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };

  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  return (
    <div className={prefixCls()} onClick={handleClick} id="container">
      <ClassDrag style={{ width: "800px", height: "800px" }}>
        {config.map((item) => (
          <ClassDrag.Box
            key={item.id}
            id={item.id}
            scale={item.scale}
            defaultPostion={item.defaultPostion}
            defaultStyle={item.defaultStyle}
          >
            <ImgBox url={item.url}></ImgBox>
          </ClassDrag.Box>
        ))}
      </ClassDrag>
    </div>
  );
};

export default contextConsumer(Content);
