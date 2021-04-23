import React from "react";

type MapComType = "a" | "span";

const LabelTitle = ({ name, type }: { name: string; type: MapComType }) => {
  const map = {
    a: <a href="">{name}</a>,
    span: <span>{name}</span>,
  };
  return map[type] || map.span;
};

export default LabelTitle;
