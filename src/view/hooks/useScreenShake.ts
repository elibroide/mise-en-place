import { useState, useRef, useCallback } from "react";

export interface ShakeOffset {
  x: number;
  y: number;
}

export function useScreenShake() {
  const [offset, setOffset] = useState<ShakeOffset>({ x: 0, y: 0 });
  const shaking = useRef(false);

  const shake = useCallback((intensity = 5, duration = 300) => {
    if (shaking.current) return;
    shaking.current = true;
    const start = Date.now();
    const anim = () => {
      const elapsed = Date.now() - start;
      if (elapsed > duration) {
        setOffset({ x: 0, y: 0 });
        shaking.current = false;
        return;
      }
      const decay = 1 - elapsed / duration;
      setOffset({
        x: (Math.random() - 0.5) * 2 * intensity * decay,
        y: (Math.random() - 0.5) * 2 * intensity * decay,
      });
      requestAnimationFrame(anim);
    };
    requestAnimationFrame(anim);
  }, []);

  return { offset, shake };
}
