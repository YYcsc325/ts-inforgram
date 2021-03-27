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

interface IBoxProps {
  name: string;
  url: string;
  customType: string;
}

let uid = 1;
const Box: FC<IBoxProps> = ({ name, url, customType }) => {
  console.log();
  const [{ isDragging }, drag] = useDrag({
    type: dragConsts.box,
    item: { name, type: dragConsts.box, url, id: ++uid, customType },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {name}
    </div>
  );
};

export default Box;
