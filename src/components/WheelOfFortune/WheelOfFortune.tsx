import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import gsap, { Circ } from "gsap";
import wheelsData from "../../constants/Wheels.json";
import { Container, Stage } from "@inlet/react-pixi/animated";
import Wheel from "../Wheel/Wheel";
import Arrow from "../Wheel/components/Arrow/Arrow";
import { WheelContext } from "../../context/WheelContext";
import { getWinner } from "../../utils/Utils";

const WheelOfFortune = forwardRef((props, ref) => {
  const { state, setState } = useContext(WheelContext);
  const wheel0 = useRef(null);
  const wheel1 = useRef(null);
  const wheel2 = useRef(null);
  const wheel = { rotation: 0 };
  const [segments, setSegments] = useState(wheelsData[0].segments);

  const spinWheel = async (to: number, duration: number) => {
    await gsap.to(wheel, {
      rotation: to,
      duration: duration,
      ease: Circ.easeOut,
      onUpdate: () => {
        setState(prevState => ({ ...prevState, rotation: wheel.rotation }));
      },
    });
  };

  const setRaund = raund => {
    if (raund === 1) {
      wheel0.current.hide();
      wheel1.current.scale(1.5);
      wheel2.current.scale(1.5);
      setSegments(wheelsData[1].segments);
    }
    if (raund === 2) {
      wheel1.current.hide();
      wheel2.current.scale(3);
      setSegments(wheelsData[2].segments);
    }
  };

  useImperativeHandle(ref, () => ({
    async clickHandler() {
      setState({ ...state, wheelIsSpinning: true });
      const targetRotation = parseFloat(
        (
          state.rotation +
          Math.PI * (Math.random() * 10 + 10) +
          Math.random()
        ).toFixed(2)
      );
      await spinWheel(targetRotation, (targetRotation - state.rotation) / 10);
      await getWinnerSector(segments, targetRotation);
      setState(prevState => ({ ...prevState, rotation: targetRotation }));
    },
  }));

  const getWinnerSector = async (segments, rotation) => {
    const winner = getWinner(segments, rotation);
    if (winner.nextStep) {
      setRaund(state.currentRaund + 1);
      setState({
        ...state,
        currentRaund: state.currentRaund + 1,
        currentPrize: state.currentPrize + winner.prize,
        wheelIsSpinning: false,
      });
    } else {
      setState({
        ...state,
        currentPrize: state.currentPrize + winner.prize,
        wheelIsSpinning: false,
      });
    }
  };

  return (
    <Stage
      width={600}
      height={450}
      options={{
        backgroundAlpha: 0,
        antialias: true,
      }}
    >
      <Container y={225} x={300} anchor={0.5} rotation={state.rotation}>
        <Wheel
          ref={wheel0}
          innerRadius={100}
          outerRadius={150}
          outerLine={{ color: 0x2b1912, width: 10 }}
          segments={wheelsData[0].segments}
        />
        <Wheel
          ref={wheel1}
          innerRadius={50}
          outerRadius={100}
          outerLine={{ color: 0x2b1912, width: 5 }}
          segments={wheelsData[1].segments}
        />
        <Wheel
          ref={wheel2}
          innerRadius={0}
          outerRadius={51}
          outerLine={{ color: 0x2b1912, width: 0 }}
          segments={wheelsData[2].segments}
        />
      </Container>
      <Arrow color={0xff0000} x={300} y={225 - 150} width={40} height={40} />
    </Stage>
  );
});

WheelOfFortune.displayName = "WheelOfFortune";

export default WheelOfFortune;
