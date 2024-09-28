import type { MouseEventHandler } from "react";

export interface UnderlayProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function Underlay({ onClick }: UnderlayProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 top-0 -z-999 bg-primary-text opacity-80"
      onClick={onClick}
    ></div>
  );
}
