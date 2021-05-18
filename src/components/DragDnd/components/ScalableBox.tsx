import React, { FC } from "react";

type ISize = number | string;

interface IScalableBoxProps {
  x?: ISize;
  y?: ISize;
  width?: number;
  height?: number;
}

const ScalableBox: FC<IScalableBoxProps> = ({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  children,
  ...reset
}) => {
  const style = {
    display: "inline-block",
    width: `${(width as number) - 2}px`,
    height: `${(height as number) - 2}px`,
  };
  return (
    <div style={style} className="asdasd">
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          x,
          y,
          width,
          height,
          ...reset,
        })
      )}
    </div>
  );
};

export default ScalableBox;
