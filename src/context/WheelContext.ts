import { createContext } from "react";

export const defaultData = {
  rotation: 0,
  currentPrize: 0,
  currentRaund: 0,
  wheelIsSpinning: false,
};

export const WheelContext = createContext({
  state: defaultData,
  setState: state => {
    console.log("log-1", 1);
  },
});
