import React from 'react';
import './App.css';
import Wheel from "./components/Wheel/Wheel";
import { Stage } from '@inlet/react-pixi'
const height = 450;
const width = 600;

function App() {
  return (
    <div className="App">
      <Stage
      width={width}
      height={height}
      options={{
        backgroundAlpha: 0,
        antialias: true,
      }}>
        <Wheel
          innerRadius={100}
          outerRadius={150}
          y={150}
          x={200}
          segments={[
            {prize: 1,color:0xC9C9C9},
            {prize: 2,color:0x757575},
            {prize: 3,color:0xC9C9C9},
            {prize: 4,color:0x757575},
            {prize: 5,color:0xC9C9C9},
            {prize: 5,color:0x757575},
            {prize: 6,color:0xC9C9C9},
            {prize: 6,color:0x757575},
            {prize: 8,color:0xC9C9C9},
            {prize: 0,color:0x757575, nextStep:true},
          ]}
        />
        <Wheel
          innerRadius={50}
          outerRadius={100}
          y={150}
          x={200}
          segments={[
            {prize: 1,color:0xC9C9C9},
            {prize: 2,color:0x757575},
            {prize: 3,color:0xC9C9C9},
            {prize: 4,color:0x757575},
            {prize: 5,color:0x515151,nextStep:true},
          ]}
        />
        <Wheel
          innerRadius={0}
          outerRadius={50}
          y={150}
          x={200}
          segments={[
            {prize: 1,color:0x333333},
          ]}
        />
      </Stage>
    </div>
  );
}

export default App;
