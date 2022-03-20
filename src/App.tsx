import React, {useEffect, useState} from 'react';
import {Spring} from 'react-spring';
import {Container, Stage} from '@inlet/react-pixi/animated';
import Wheel from './components/Wheel/Wheel';
import Arrow from "./components/Wheel/components/Arrow/Arrow";
import './App.css';

function App() {
  const [tension, setTension] = useState(1000);
  const [wheel0scale, setWheel0scale] = useState(1);
  const [wheel1scale, setWheel1scale] = useState(1);
  const [friction, setFriction] = useState(1000);
  const [spinning, setSpinning] = useState(false);
  const [mass, setMass] = useState(2);
  const [currentWheel, setCurrentWheel] = useState(0);
  const [wheelState, setWheelState] = useState({
    rotation: 0,
    wheel0: {scale: 1, display: true},
    wheel1: {maxRadius: 100, minRadius: 50, display: true},
    wheel2: {},
  });
  const segments = [
    {prize: 1, color: 0xC9C9C9},
    {prize: 2, color: 0x757575},
    {prize: 3, color: 0xC9C9C9},
    {prize: 4, color: 0x757575},
    {prize: 5, color: 0xC9C9C9},
    {prize: 5, color: 0x757575},
    {prize: 6, color: 0xC9C9C9},
    {prize: 6, color: 0x757575},
    {prize: 8, color: 0xC9C9C9},
    {color: 0x757575, nextStep: true},
  ]
  const clickHandler = () => {
    setSpinning(true);
    const targetRotation = parseFloat((wheelState.rotation + Math.PI * (Math.random() * 10 + 10) + Math.random()).toFixed(2))
    setWheelState(prevState => ({...prevState, rotation: targetRotation}));
  };

  const getSector = (segments, rotation) => {
    const angleStep = (2 * Math.PI) / segments.length;
    const currentRotation = ((Math.PI * 2) - (rotation - (angleStep / 2)) % (Math.PI * 2)) % (Math.PI * 2)
    const winnerSegment = Math.floor(currentRotation / angleStep);
    console.log("log-winner", segments[winnerSegment]);
    setCurrentWheel(currentWheel + 1);
    setWheel0scale(0.5)
    setWheel1scale(1.5)
    if (segments[winnerSegment].nextStep) {
      setCurrentWheel(currentWheel + 1);
      setWheelState(prevState => (
        {
          ...prevState,
          wheel0: {
            ...prevState.wheel0,
            minRadius: 50,
            maxRadius: 100
          }
        }))
    }
  }
  return (
    <div className="App">
      <input type="number" value={wheel0scale} onChange={e => {
        setWheel0scale(e.target.valueAsNumber)
      }}/>
      <Stage
        width={600}
        height={450}
        options={{
          backgroundAlpha: 0,
          antialias: true,
        }}
      >
        <Spring
          from={{x: 0}}
          to={{x: wheelState.rotation, scale: wheel0scale}}
          config={{
            mass: mass, tension: tension, friction: friction, precision: 0.005,
          }}
          onRest={() => {
            getSector(segments, wheelState.rotation)
            setSpinning(false)
          }}
        >
          {(props) => (
            <Container y={225} x={300} anchor={0.5} rotation={props.x}>
              <Wheel
                innerRadius={100}
                outerRadius={150}
                scale={wheel0scale}
                outerLine={{color: 0x2B1912, width: 10}}
                segments={segments}
              />
              <Wheel
                innerRadius={50}
                outerRadius={100}
                scale={wheel1scale}
                outerLine={{color: 0x2B1912, width: 5}}
                segments={[
                  {prize: 1, color: 0xC9C9C9},
                  {prize: 2, color: 0x757575},
                  {prize: 3, color: 0xC9C9C9},
                  {prize: 4, color: 0x757575},
                  {prize: 5, color: 0x515151, nextStep: true},
                ]}
              />
              <Wheel
                innerRadius={0}
                outerRadius={51}
                scale={1}
                outerLine={{color: 0x2B1912, width: 0}}
                segments={[
                  {prize: 1, color: 0x333333},
                ]}
              />
            </Container>
          )}
        </Spring>
        <Arrow color={0xFF0000} x={300} y={225 - 150} width={40} height={40}/>
      </Stage>
      <button disabled={spinning} onClick={clickHandler}>круть</button>
    </div>
  );
}

export default App;
