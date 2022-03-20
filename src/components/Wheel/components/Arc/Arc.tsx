import { Graphics, LineStyle } from "pixi.js";
import { PixiComponent } from "@inlet/react-pixi/animated";

type Props = {
  outerRadius?: number;
  innerRadius?: number;
  x?: number;
  y?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: number;
  outerLine?: Entity.OuterLine;
};

export default PixiComponent("Arc", {
  create: () => new Graphics(),
  applyProps: (instance: Graphics, oldProps: Props, newProps: Props) => {
    const {
      x,
      y,
      outerRadius,
      innerRadius,
      startAngle,
      endAngle,
      fill,
      outerLine,
    } = newProps;
    instance.clear();
    instance.beginFill(fill);
    instance.moveTo(
      x + innerRadius * Math.cos(startAngle),
      y + innerRadius * Math.sin(startAngle)
    );
    instance.arc(x, y, outerRadius, startAngle, endAngle);
    instance.lineTo(
      x + innerRadius * Math.cos(endAngle),
      y + innerRadius * Math.sin(endAngle)
    );
    instance.arc(x, y, innerRadius, endAngle, startAngle, true);
    instance.endFill();
    instance.lineStyle(outerLine.width, outerLine.color, 1);
    instance.arc(x, y, outerRadius, startAngle - 0.01, endAngle + 0.01);
  },
});
