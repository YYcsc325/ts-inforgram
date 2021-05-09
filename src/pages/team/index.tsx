import React, { FC, useEffect, useState } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import { DragBox, DragHTag } from "@/components";
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
    url: "https://graphics.jifo.co/flags_lipis/us.svg",
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
      {config.map((item) => (
        <DragBox
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
          <ImgBox url={item.url} scale={item.scale}></ImgBox>
        </DragBox>
      ))}
      {/* <DragBox
        key="3"
        id="3"
        scale
        left={400}
        top={400}
        width={100}
        height={30}
        warpComponentId="team"
        clicked={clickedId === "3"}
        onClick={handleItemClick}
      >
        <DragHTag text={"Type something"} />
      </DragBox> */}
    </div>
  );
};

export default contextConsumer(Team);
