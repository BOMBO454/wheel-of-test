import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Container } from "@inlet/react-pixi/animated";
import { Container as ContainerType } from "pixi.js";
import Segment from "./components/Segment/Segment";
import gsap, { Circ } from "gsap";

const pi = Math.PI;

type Props = {
  x?: number;
  y?: number;
  outerRadius?: number;
  innerRadius?: number;
  segments: Array<Entity.Segment>;
  outerLine: Entity.OuterLine;
  rotation?: number;
};

const Wheel = forwardRef(
  (
    { x = 0, y = 0, outerRadius, innerRadius, segments, outerLine }: Props,
    ref
  ) => {
    const containerRef = useRef<ContainerType>(null);
    // угол между секторами
    const angleStep = (2 * pi) / segments.length;
    // смещение секторов для лучшей картинки в начале
    const angleShift = pi * 0.5 + pi / segments.length;
    const [state, setState] = useState({ opacity: 1, scale: 1 });

    // анимационные издержки
    const s = { opacity: 1, scale: 1 };

    useEffect(() => {
      containerRef.current.alpha = state.opacity;
    }, [state.opacity]);

    useImperativeHandle(ref, () => ({
      // функция прятания компонента
      async hide() {
        await gsap.to(s, {
          opacity: 0,
          scale: 1,
          duration: 1,
          ease: Circ.easeOut,
          onUpdate: () => {
            setState(prevState => ({ ...prevState, opacity: s.opacity }));
          },
        });
      },
      // функция масштабирования компонента
      async scale(scale) {
        await gsap.to(s, {
          opacity: 1,
          scale: scale,
          duration: 1,
          ease: Circ.easeOut,
          onUpdate: () => {
            setState(prevState => ({ ...prevState, scale: s.scale }));
          },
        });
      },
    }));

    return (
      <Container
        ref={containerRef}
        position={[x, y]}
        width={outerRadius * 2 * state.scale}
        height={outerRadius * 2 * state.scale}
      >
        {segments.map((segment, index) => (
          <Segment
            scale={state.scale}
            key={index}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            startAngle={angleStep * index - angleShift}
            endAngle={angleStep * (index + 1) - angleShift}
            fill={Number.parseInt(segment.color, 16)}
            text={segment.nextStep ? `˅` : `${segment.prize} €`}
            outerLine={outerLine}
          />
        ))}
      </Container>
    );
  }
);

Wheel.displayName = "Wheel";

export default Wheel;
