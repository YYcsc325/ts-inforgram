import React, { FC, useEffect } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import { FncDrag } from "@/components";
import ImgBox from "@/components/DragComponents/Img";

import styles from "./index.less";

interface ITeamProps {
  [x: string]: any;
}

const prefixCls = createPrefixClass("team", styles);

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
  {
    id: "3",
    defaultPostion: { left: 300, top: 400 },
    url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
    scale: false,
  },
];

const Team: FC<ITeamProps> = ({ consumer }) => {
  const handleClick = () => {
    consumer?.handleShowShrinkageChange(false);
  };

  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  return (
    <div id={"team"} className={prefixCls()} onClick={handleClick}>
      <FncDrag style={{ width: "800px", height: "800px" }}>
        {config.map((item) => (
          <FncDrag.Box
            key={item.id}
            id={item.id}
            scale={item.scale}
            defaultPostion={item.defaultPostion}
            defaultStyle={item.defaultStyle}
          >
            <ImgBox url={item.url}></ImgBox>
          </FncDrag.Box>
        ))}
      </FncDrag>
    </div>
  );
};

export default contextConsumer(Team);
