import React, {useState} from "react";
import Arc from "./components/Arc/Arc";
import {Container, useTick} from "@inlet/react-pixi";
import Segment from "./components/Segment/Segment";
const pi = Math.PI;

type Props = {
  x:number;
  y:number;
  outerRadius:number;
  innerRadius:number;
  segments: Array<Entity.Segment>;
}
let i = 0;
const Wheel = ({x,y,outerRadius,innerRadius,segments}:Props) => {
  const [rotation, setRotation] = useState(0);
  const angleStep = (2*pi)/segments.length;
  useTick(delta => {
    i += 0.001 * delta;
    setRotation(i);
  })
  return (
    <Container position={[x, y]} width={outerRadius*2} rotation={rotation} height={outerRadius*2}>
      {segments.map((segment,index)=>(
        <Segment
          x={0}
          y={0}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          startAngle={angleStep*index+pi/2}
          endAngle={angleStep*(index+1)+pi/2}
          fill={segment.color}
          text={segment.prize+` €`}
          outerLine={{color:0x2B1912,width:10}}
        />
      ))}
    </Container>
  )
}

export default Wheel