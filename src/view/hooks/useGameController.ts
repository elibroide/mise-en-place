import { useState, useEffect, useRef, useCallback } from "react";
import { GameController } from "../../controller/GameController";
import type { GameSnapshot, LevelConfig, Recipe } from "../../model/types";

interface UseGameControllerOptions {
  config: LevelConfig;
  recipeIds: (number | string)[];
  allRecipes: Recipe[];
  /** If true, delay start (e.g. for mechanic intro) */
  paused?: boolean;
  onParticleBurst?: (data: { x: number; y: number; count: number; spread: number }) => void;
  onShake?: (intensity: number, duration: number) => void;
}

export function useGameController(opts: UseGameControllerOptions) {
  const controllerRef = useRef<GameController | null>(null);
  const [state, setState] = useState<GameSnapshot | null>(null);

  const hasStartedRef = useRef(false);

  // Create controller once
  useEffect(() => {
    const ctrl = new GameController(opts.config, opts.recipeIds, opts.allRecipes);
    controllerRef.current = ctrl;

    // Immediately push first state so UI doesn't hang behind "Starting shift" on paused games
    setState(ctrl.getSnapshot());

    // Subscribe to events
    ctrl.events.on("stateChanged", (snapshot) => {
      setState(snapshot);
    });

    if (opts.onParticleBurst) {
      ctrl.events.on("particleBurst", opts.onParticleBurst);
    }

    if (opts.onShake) {
      ctrl.events.on("shake", (e) => opts.onShake!(e.intensity, e.duration));
    }

    // Start immediately if not paused
    if (!opts.paused && !hasStartedRef.current) {
      hasStartedRef.current = true;
      ctrl.start();
    }

    return () => {
      ctrl.stop();
      ctrl.events.all.clear();
      controllerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only create once

  // Handle paused → unpaused transition
  useEffect(() => {
    if (!opts.paused && controllerRef.current && !hasStartedRef.current) {
      hasStartedRef.current = true;
      controllerRef.current.start();
    }
  }, [opts.paused]);

  const serve = useCallback((customerId: string) => {
    controllerRef.current?.serve(customerId);
  }, []);

  return {
    state,
    serve,
    controller: controllerRef,
  };
}
