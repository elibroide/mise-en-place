/** Pick a random element from an array */
export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Clamp a value between min and max */
export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/** Generate a short unique id */
export function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

/** Dishwasher always takes 5 seconds */
export function getDishwasherTimer(): number {
  return 5;
}
