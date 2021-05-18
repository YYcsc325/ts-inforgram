import React, { FC, useEffect, useState } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import { DragContainer, DragHTag } from "@/components";
import ImgBox from "@/components/DragComponents/dragImg";
import styles from "./index.less";

interface ITeamProps {
  [x: string]: any;
}

const prefixCls = createPrefixClass("team", styles);

const config = [
  {
    id: "1",
    left: 100,
    top: 100,
    width: 173,
    height: 129,
    url: "https://img.pic88.com/16056469798640.jpg",
    scale: true,
  },
  {
    id: "2",
    left: 200,
    top: 200,
    url: "https://img.pic88.com/16056469798640.jpg",
    scale: false,
  },
];

const Team: FC<ITeamProps> = ({ consumer }) => {
  const [clickedId, setClickedId] = useState("");

  const handleClick = () => {
    consumer?.handleShowShrinkageChange(false);
    setClickedId("");
  };

  useEffect(() => {
    consumer?.handleShowShrinkageChange(false);
  }, []);

  const handleItemClick = (id: string) => {
    setClickedId(id);
  };

  return (
    <div id={"team"} className={prefixCls()} onClick={handleClick}>
      <DragContainer style={{ width: "800px", height: "800px" }}>
        {config.map((item) => (
          <DragContainer.Box
            key={item.id}
            id={item.id}
            scale={item.scale}
            left={item.left}
            top={item.top}
            width={item.width}
            height={item.height}
            warpComponentId="team"
            onClick={handleItemClick}
            clicked={clickedId === item.id}
          >
            <ImgBox url={item.url}></ImgBox>
          </DragContainer.Box>
        ))}
      </DragContainer>
    </div>
  );
};

export default contextConsumer(Team);
