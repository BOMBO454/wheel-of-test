import React from 'react';
import {Container} from '@inlet/react-pixi/animated';
import {SpringValue} from 'react-spring';
import Segment from './components/Segment/Segment';

const pi = Math.PI;

type Props = {
  x?: number;
  y?: number;
  outerRadius?: number | SpringValue<number>;
  innerRadius?: number | SpringValue<number>;
  segments: Array<Entity.Segment>;
  outerLine: Entity.OuterLine;
  rotation?: number;
  scale?: number | SpringValue<number>;
}

function Wheel({
                 x = 0, y = 0, outerRadius, innerRadius, segments, outerLine, rotation, scale,
               }: Props) {
  const angleStep = (2 * pi) / segments.length;
  const angleShift = (pi * 0.5) + (pi / segments.length);
  console.log("log-scale", scale);
  return (
    <Container position={[x, y]} width={outerRadius as number * 2 * (scale as number)} rotation={rotation}
               height={outerRadius as number * 2 * (scale as number)}>
      {segments.map((segment, index) => (
        <Segment
          key={index}
          x={0}
          y={0}
          outerRadius={outerRadius as number}
          innerRadius={innerRadius as number}
          startAngle={angleStep * index - angleShift}
          endAngle={angleStep * (index + 1) - angleShift}
          fill={segment.color}
          text={segment.nextStep ? `˅` : `${segment.prize}`}
          outerLine={outerLine}
        />
      ))}
    </Container>
  );
}

export default Wheel;
