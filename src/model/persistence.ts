import type { SavedGameData } from "./types";

const STORAGE_KEY = "mep-game-data";

export function loadGameData(): SavedGameData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Error loading game data:", e);
    return null;
  }
}

export function saveGameData(data: SavedGameData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving game data:", e);
  }
}

export function hasGameData(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

export function clearGameData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Error clearing game data:", e);
  }
}
