import React, { FC } from "react";
import { useDrag } from "react-dnd";
import { dragConsts } from "@/consts";

const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
};

interface IImgBoxProps {
  name: string;
  url: string;
  type: string;
}

let uid = 1;
const ImgBox: FC<IImgBoxProps> = ({ name, url, type, ...reset }) => {
  const [{ isDragging }, drag] = useDrag({
    type: dragConsts.box,
    item: { ...reset, name, type, url, id: ++uid },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log("您已经放下了", dropResult);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} style={{ ...style, opacity } as React.CSSProperties}>
      {name}
    </div>
  );
};

export default ImgBox;
