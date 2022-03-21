import React, { useEffect, useRef } from "react";
import { Container, Text } from "@inlet/react-pixi/animated";
import { TextStyle } from "pixi.js";
import Arc from "../Arc/Arc";

type Props = {
  outerRadius: number;
  innerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: number;
  text: string;
  outerLine: Entity.OuterLine;
  scale?: number;
};
const posOnArc = (radius, angle) => ({
  x: radius * Math.cos(angle),
  y: radius * Math.sin(angle),
});

const Segment: React.FC<Props> = ({
  outerRadius,
  innerRadius,
  startAngle,
  endAngle,
  fill,
  text,
  outerLine,
  scale,
}: Props) => {
  const textRef = useRef(null);
  const isSingle =
    (startAngle + Math.PI * 2) % (Math.PI * 2) ===
    (endAngle + Math.PI * 2) % (Math.PI * 2)
      ? true
      : false;
  useEffect(() => {
    textRef.current.style = new TextStyle({
      align: "center",
      fill: "#ffffff",
      fontSize: isSingle ? 32 * scale : 16 * scale,
    });
  }, [scale]);
  return (
    <Container>
      <Arc
        x={0}
        y={0}
        outerRadius={outerRadius * scale}
        innerRadius={innerRadius * scale}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        outerLine={{ ...outerLine, width: outerLine.width * scale }}
      />
      <Text
        ref={textRef}
        text={text}
        anchor={0.5}
        x={
          isSingle
            ? 0
            : posOnArc(
                ((outerRadius + innerRadius) * scale) / 2,
                (startAngle + endAngle) / 2
              ).x
        }
        y={
          isSingle
            ? 0
            : posOnArc(
                ((outerRadius + innerRadius) * scale) / 2,
                (startAngle + endAngle) / 2
              ).y
        }
        rotation={(startAngle + endAngle) / 2 + Math.PI / 2}
      />
    </Container>
  );
};

export default Segment;
