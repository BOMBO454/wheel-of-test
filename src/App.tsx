import React, { useRef, useState } from "react";
import WheelOfFortune from "./components/WheelOfFortune/WheelOfFortune";
import SpinButton from "./components/SpinButton/SpinButton";
import { WheelContext, defaultData } from "./context/WheelContext";
import "./App.css";

function App() {
  const wheelRef = useRef(null);
  const [wheelState, setWheelState] = useState(defaultData);
  const setState = state => {
    setWheelState(state);
  };
  const clickHandler = async () => {
    await wheelRef.current.clickHandler();
  };
  return (
    <div className="App">
      <WheelContext.Provider value={{ state: wheelState, setState }}>
        <WheelOfFortune ref={wheelRef} />
      </WheelContext.Provider>
      <SpinButton
        disabled={wheelState.wheelIsSpinning || wheelState.currentRaund === 2}
        onClick={clickHandler}
      />
      <h1>{`level ${wheelState.currentRaund + 1}`}</h1>
      <span>{`${wheelState.currentPrize} Bold`}</span>
    </div>
  );
}

export default App;
