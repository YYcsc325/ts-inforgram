import React, { FC, useEffect, useState } from "react";
import { contextConsumer } from "@/layouts/context";
import { createPrefixClass } from "@/util/utils";
import { DragBox } from "@/components";
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
    url: "https://graphics.jifo.co/flags_lipis/us.svg",
  },
  {
    id: "2",
    left: 200,
    top: 200,
    url: "https://img.pic88.com/16056469798640.jpg",
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
  // InfographicEditor

  const handleItemClick = (id: string) => {
    setClickedId(id);
  };

  return (
    <div id={"team"} className={prefixCls()} onClick={handleClick}>
      {config.map((item) => (
        <DragBox
          key={item.id}
          id={item.id}
          left={item.left}
          top={item.top}
          warpComponentId="team"
          onClick={handleItemClick}
          clicked={clickedId === item.id}
        >
          <ImgBox url={item.url}></ImgBox>
        </DragBox>
      ))}
    </div>
  );
};

export default contextConsumer(Team);
