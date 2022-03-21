export const getWinner = (
  segments: Array<Entity.Segment>,
  rotation: number
) => {
  const angleStep = (2 * Math.PI) / segments.length;
  const currentRotation =
    (Math.PI * 2 - ((rotation - angleStep / 2) % (Math.PI * 2))) %
    (Math.PI * 2);
  const winnerSegment = Math.floor(currentRotation / angleStep);
  return segments[winnerSegment];
};
