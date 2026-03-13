import type { ReactNode } from "react";
import { clamp } from "../../model/utils";

interface Props {
  progress: number;
  size?: number;
  stroke?: number;
  color?: string;
  urgent?: boolean;
  children?: ReactNode;
}

export function TimerRing({ progress, size = 48, stroke = 4, color = "#4ADE80", urgent = false, children }: Props) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dashoffset = circ * (1 - clamp(progress, 0, 1));

  return (
    <div style={{ position:"relative", width:size, height:size, display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
      <svg width={size} height={size} style={{ position:"absolute", transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={urgent ? "#FF4B6E" : color}
          strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={dashoffset}
          style={{ transition:"stroke-dashoffset 0.5s linear", filter: urgent ? "drop-shadow(0 0 6px #FF4B6E)" : "none" }}
        />
      </svg>
      <div style={{ position:"relative", zIndex:1 }}>{children}</div>
    </div>
  );
}
