import React from 'react';
import {Container, Text} from '@inlet/react-pixi/animated';
import {TextStyle} from 'pixi.js';
import Arc from '../Arc/Arc';

type Props = {
  outerRadius: number
  innerRadius: number
  x: number
  y: number
  startAngle: number
  endAngle: number
  fill: number
  text: string
  outerLine: Entity.OuterLine
}
const posOnArc = (radius, angle) => ({
  x: (radius * Math.cos(angle)),
  y: (radius * Math.sin(angle)),
});
const Segment: React.FC<Props> = ({
                                    x, y, outerRadius, innerRadius, startAngle, endAngle, fill, text, outerLine,
                                  }: Props) => (
  <Container x={x} y={y}>
    <Arc
      x={0}
      y={0}
      outerRadius={outerRadius}
      innerRadius={innerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
      outerLine={outerLine}
    />
    <Text
      text={text}
      anchor={0.5}
      x={posOnArc((outerRadius + innerRadius) / 2, (startAngle + endAngle) / 2).x}
      y={posOnArc((outerRadius + innerRadius) / 2, (startAngle + endAngle) / 2).y}
      rotation={(startAngle + endAngle) / 2 + (Math.PI / 2)}
      style={new TextStyle({
        align: 'center',
        fill: 0xffffff,
        fontSize: 16,
      })}
    />
  </Container>
);

export default Segment;
