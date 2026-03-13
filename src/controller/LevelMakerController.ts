import type { Recipe, LevelWithConfig, SavedGameData } from "../model/types";
import { RECIPES } from "../model/data/recipes";
import { LEVELS, LEVEL_CONFIGS } from "../model/data/levels";
import { loadGameData, saveGameData, clearGameData } from "../model/persistence";
import { uid } from "../model/utils";

export interface LevelMakerState {
  recipes: Recipe[];
  levels: LevelWithConfig[];
}

/**
 * Controller for the Level Maker screen.
 * Pure logic — returns new state, does not hold React state.
 */
export class LevelMakerController {
  /** Load initial state from localStorage or defaults */
  static loadInitial(): LevelMakerState {
    const custom = loadGameData();
    if (custom && custom.recipes && custom.levels) {
      return {
        recipes: JSON.parse(JSON.stringify(custom.recipes)),
        levels: JSON.parse(JSON.stringify(custom.levels)),
      };
    }
    return {
      recipes: JSON.parse(JSON.stringify(RECIPES)),
      levels: JSON.parse(
        JSON.stringify(
          LEVELS.map((l) => ({
            id: l.id,
            name: l.name,
            description: l.description,
            kitchen: l.kitchen,
            newMechanic: l.newMechanic,
            mechanicIntro: l.mechanicIntro,
            config: LEVEL_CONFIGS[l.id],
            recipeIds: l.recipes || [],
          }))
        )
      ),
    };
  }

  /** Save current state to localStorage */
  static save(state: LevelMakerState): void {
    saveGameData(state as SavedGameData);
  }

  /** Reset to defaults (clears localStorage) */
  static resetDefaults(): void {
    clearGameData();
  }

  /** Export state as JSON string */
  static exportJSON(state: LevelMakerState): string {
    return JSON.stringify({ recipes: state.recipes, levels: state.levels }, null, 2);
  }

  /** Import state from JSON string. Returns null on failure. */
  static importJSON(json: string): LevelMakerState | null {
    try {
      const data = JSON.parse(json);
      if (data.recipes && data.levels) {
        return { recipes: data.recipes, levels: data.levels };
      }
      return null;
    } catch {
      return null;
    }
  }

  // ── Level CRUD ──────────────────────────────────────────

  static addLevel(state: LevelMakerState): LevelMakerState {
    const newId = Math.max(...state.levels.map((l) => l.id), 0) + 1;
    const newLevel: LevelWithConfig = {
      id: newId,
      name: "New Kitchen",
      description: "A custom kitchen.",
      kitchen: "breakfast",
      newMechanic: null,
      mechanicIntro: "",
      config: {
        customerTimer: 90,
        nextCustomerDelay: 8,
        maxCust: 2,
        ovenTimer: 15,
        totalCustomers: 10,
        maxWalkouts: 3,
        startingCustomers: 1,
        serveBreathingRoom: 4,
      },
      recipeIds: [],
    };
    return { ...state, levels: [...state.levels, newLevel] };
  }

  static deleteLevel(state: LevelMakerState, idx: number): LevelMakerState {
    return { ...state, levels: state.levels.filter((_, i) => i !== idx) };
  }

  static moveLevelUp(state: LevelMakerState, idx: number): LevelMakerState {
    if (idx === 0) return state;
    const levels = [...state.levels];
    [levels[idx - 1], levels[idx]] = [levels[idx], levels[idx - 1]];
    return { ...state, levels };
  }

  static moveLevelDown(state: LevelMakerState, idx: number): LevelMakerState {
    if (idx === state.levels.length - 1) return state;
    const levels = [...state.levels];
    [levels[idx], levels[idx + 1]] = [levels[idx + 1], levels[idx]];
    return { ...state, levels };
  }

  static updateLevel(
    state: LevelMakerState,
    idx: number,
    updates: Partial<LevelWithConfig>
  ): LevelMakerState {
    const levels = [...state.levels];
    levels[idx] = { ...levels[idx], ...updates };
    return { ...state, levels };
  }

  // ── Recipe CRUD ─────────────────────────────────────────

  static addRecipe(state: LevelMakerState, levelIdx: number): LevelMakerState {
    const newRecipe: Recipe = {
      id: uid(),
      name: "New Recipe",
      description: "",
      order: "any",
      root: { type: "group", oven: false, minSum: null, children: [{ type: "layer", element: "clubs" }] },
    };
    const recipes = [...state.recipes, newRecipe];
    const levels = [...state.levels];
    levels[levelIdx] = {
      ...levels[levelIdx],
      recipeIds: [...(levels[levelIdx].recipeIds || []), newRecipe.id],
    };
    return { recipes, levels };
  }

  static deleteRecipe(
    state: LevelMakerState,
    levelIdx: number,
    recipeIdxInLevel: number
  ): LevelMakerState {
    const levels = [...state.levels];
    const ids = [...(levels[levelIdx].recipeIds || [])];
    const recipeId = ids[recipeIdxInLevel];
    ids.splice(recipeIdxInLevel, 1);
    levels[levelIdx] = { ...levels[levelIdx], recipeIds: ids };
    const recipes = state.recipes.filter((r) => r.id !== recipeId);
    return { recipes, levels };
  }

  static updateRecipe(
    state: LevelMakerState,
    recipeId: number | string,
    updates: Partial<Recipe>
  ): LevelMakerState {
    const recipes = state.recipes.map((r) =>
      r.id === recipeId ? { ...r, ...updates } : r
    );
    return { ...state, recipes };
  }
}
