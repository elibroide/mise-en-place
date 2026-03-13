import { useEffect } from "react";
import { pickRandom } from "../../model/utils";

export interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  tx: number;
  ty: number;
  duration: number;
  shape: "star" | "circle";
}

const PARTICLE_COLORS = ["#FFD93D","#FF6B6B","#6BCB77","#4D96FF","#C084FC","#FF8C42","#FF4B6E","#A8E6CF"];

export function createParticleBurst(x: number, y: number, count = 16, spread = 120): Particle[] {
  return Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const dist = spread * (0.5 + Math.random() * 0.5);
    return {
      x, y,
      size: 4 + Math.random() * 8,
      color: pickRandom(PARTICLE_COLORS),
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist - 30,
      duration: 600 + Math.random() * 400,
      shape: Math.random() > 0.5 ? "star" : "circle",
    };
  });
}

interface Props {
  particles: Particle[];
  onDone: () => void;
}

export function ParticleSystem({ particles, onDone }: Props) {
  useEffect(() => {
    if (particles.length > 0) {
      const t = setTimeout(onDone, 1200);
      return () => clearTimeout(t);
    }
  }, [particles, onDone]);

  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:9999 }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position:"absolute", left:p.x, top:p.y, width:p.size, height:p.size,
          borderRadius: p.shape === "star" ? "2px" : "50%",
          background: p.color,
          transform: p.shape === "star" ? "rotate(45deg)" : "none",
          animation: `particle-fly ${p.duration}ms ease-out forwards`,
          "--tx": `${p.tx}px`,
          "--ty": `${p.ty}px`,
        } as React.CSSProperties} />
      ))}
    </div>
  );
}
