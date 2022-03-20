import React from "react";
import { Graphics } from "@inlet/react-pixi";

type Props = {
  color: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};
const Arrow: React.FC<Props> = ({ color, x, y, width, height }: Props) => {
  const draw = React.useCallback(g => {
    g.clear();
    g.beginFill(color);
    g.moveTo(x - width / 2, y - height / 2);
    g.lineTo(x + width / 2, y - height / 2);
    g.lineTo(x, y + height / 2);
    g.lineTo(x - width / 2, y - height / 2);
    g.endFill();
  }, []);
  return <Graphics draw={draw} />;
};

export default Arrow;
