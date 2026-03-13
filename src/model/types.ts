// ============================================================
// Core Game Types — Framework-agnostic
// ============================================================

export type Suit = "hearts" | "diamonds" | "spades" | "clubs";
export type CardColor = "red" | "black";
export type ElementType = Suit | CardColor | "royal" | "any";
export type KitchenType = "breakfast" | "lunch" | "grill" | "oven" | "chef";
export type OrderType = "any" | "strict";

// Recipe tree nodes
export interface LayerNode {
  type: "layer";
  element: ElementType;
}

export interface GroupNode {
  type: "group";
  oven: boolean;
  chopping?: boolean;
  minSum: number | null;
  children: RecipeNode[];
}

export type RecipeNode = LayerNode | GroupNode;

export interface Recipe {
  id: number | string;
  name: string;
  description: string;
  order: OrderType;
  root: GroupNode;
}

// Level definitions
export interface LevelConfig {
  customerTimer: number;
  nextCustomerDelay: number;
  maxCust: number;
  ovenTimer: number;
  totalCustomers: number;
  maxWalkouts: number;
  startingCustomers: number;
  serveBreathingRoom: number;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  kitchen: KitchenType;
  newMechanic: string | null;
  mechanicIntro: string | null;
  recipes?: number[];
  recipeIds?: (number | string)[];
}

/** Level with embedded config (used by level maker / custom levels) */
export interface LevelWithConfig extends Level {
  config: LevelConfig;
  recipeIds: (number | string)[];
}

// Customer
export interface CustomerColor {
  bg: string;
  accent: string;
}

export interface Customer {
  id: string;
  name: string;
  recipeId: number | string;
  recipe: Recipe | null;
  timeLeft: number;
  totalTime: number;
  color: CustomerColor;
  avatarId?: number;
  walkedOut?: boolean;
}

// Game state (what the controller exposes)
export type PlayState = "playing" | "won" | "lost";

export interface GameSnapshot {
  customers: Customer[];
  totalCustomersSpawned: number;
  targetCustomers: number;
  served: number;
  walkouts: number;
  gameState: PlayState;
}

export interface SuitStyle {
  symbol: string;
  color: string;
  bg: string;
  name: string;
}

export interface KitchenColors {
  primary: string;
  secondary: string;
  bg: string;
}

// Events emitted by GameController
export type GameEvents = {
  stateChanged: GameSnapshot;
  particleBurst: { x: number; y: number; count: number; spread: number };
  shake: { intensity: number; duration: number };
  gameOver: { result: "won" | "lost"; served: number; walkouts: number };
};

// Persistence
export interface SavedGameData {
  recipes: Recipe[];
  levels: LevelWithConfig[];
}
