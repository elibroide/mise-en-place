import { TimerRing } from "./TimerRing";

type StationState = "idle" | "running" | "done";

interface Props {
  label: string;
  state: StationState;
  progress: number;
  onTap: () => void;
  icon: string;
  color: string;
}

export function DockWidget({ label, state, progress, onTap, icon, color }: Props) {
  const isIdle = state === "idle";
  const isRunning = state === "running";
  const isDone = state === "done";

  return (
    <div
      onClick={onTap}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
        cursor: "pointer",
        opacity: isRunning ? 0.7 : 1,
        animation: isDone ? "glow-pulse 1s ease-in-out infinite" : "none",
        userSelect: "none", WebkitTapHighlightColor: "transparent",
      }}
    >
      <TimerRing
        progress={isRunning ? progress : isDone ? 1 : 0}
        size={52} stroke={3}
        color={isDone ? "#4ADE80" : color}
      >
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: isDone ? "rgba(74,222,128,0.2)" : isIdle ? `${color}22` : "rgba(255,255,255,0.05)",
          border: `1.5px solid ${isDone ? "#4ADE80" : isIdle ? color : "rgba(255,255,255,0.1)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, color: isDone ? "#4ADE80" : color,
          fontWeight: 700,
        }}>
          {icon}
        </div>
      </TimerRing>
      <span style={{
        fontSize: 10, fontWeight: 600,
        color: isDone ? "#4ADE80" : isRunning ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.6)",
      }}>{label}</span>
    </div>
  );
}
