import type { RecipeNode } from "./types";

/** Check if a recipe tree requires the oven */
export function recipeRequiresOven(node: RecipeNode | null): boolean {
  if (!node) return false;
  if (node.type === "group" && node.oven) return true;
  if (node.type === "group" && node.children) {
    return node.children.some((c) => recipeRequiresOven(c));
  }
  return false;
}

/** Check if a recipe tree has a numbered bundle (minSum constraint) */
export function recipeHasBundle(node: RecipeNode | null): boolean {
  if (!node) return false;
  if (node.type === "group" && node.minSum) return true;
  if (node.type === "group" && node.children) {
    return node.children.some((c) => recipeHasBundle(c));
  }
  return false;
}
