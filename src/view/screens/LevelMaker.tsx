import React, { useState } from "react";
import type { Recipe, LevelWithConfig, KitchenType, RecipeNode, SavedGameData } from "../../model/types";
import { LevelMakerController, LevelMakerState } from "../../controller/LevelMakerController";
import { KITCHEN_COLORS } from "../../model/data/theme";
import { NotationDisplay } from "../components/NotationDisplay";
import { RecipeNodeEditor } from "../components/RecipeNodeEditor";

interface Props {
  onExit: () => void;
  onSave: (data: SavedGameData) => void;
}

type ViewType = "list" | "editLevel" | "editRecipe";

export function LevelMaker({ onExit, onSave }: Props) {
  const [state, setState] = useState<LevelMakerState>(() => LevelMakerController.loadInitial());
  const [view, setView] = useState<ViewType>("list");
  const [editingLevelIdx, setEditingLevelIdx] = useState<number | null>(null);
  const [editingRecipeIdx, setEditingRecipeIdx] = useState<number | null>(null);
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // ── List View ────────────────────────────────────────────────────────
  if (view === "list")
  {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>Level Editor</h1>
        </div>

        {/* Levels List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            paddingRight: "8px",
          }}
        >
          {state.levels.map((level, idx) => (
            <div
              key={level.id}
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
              }}
            >
              {/* Level Number Badge with Kitchen Color */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "10px",
                  background: KITCHEN_COLORS[level.kitchen].bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  fontWeight: "bold",
                  flexShrink: 0,
                  border: `2px solid ${KITCHEN_COLORS[level.kitchen].primary}`,
                }}
              >
                {idx + 1}
              </div>

              {/* Level Info */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
                onClick={() => {
                  setEditingLevelIdx(idx);
                  setView("editLevel");
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: "600" }}>{level.name}</div>
                <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)" }}>
                  {level.recipeIds.length} recipe{level.recipeIds.length !== 1 ? "s" : ""}
                </div>
              </div>

              {/* Reorder Buttons */}
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => {
                    if (idx > 0)
                    {
                      setState(LevelMakerController.moveLevelUp(state, idx));
                    }
                  }}
                  disabled={idx === 0}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    cursor: idx === 0 ? "default" : "pointer",
                    opacity: idx === 0 ? 0.4 : 1,
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  ↑
                </button>
                <button
                  onClick={() => {
                    if (idx < state.levels.length - 1)
                    {
                      setState(LevelMakerController.moveLevelDown(state, idx));
                    }
                  }}
                  disabled={idx === state.levels.length - 1}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    cursor: idx === state.levels.length - 1 ? "default" : "pointer",
                    opacity: idx === state.levels.length - 1 ? 0.4 : 1,
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  ↓
                </button>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => {
                  if (deleteConfirmIdx === idx)
                  {
                    setState(LevelMakerController.deleteLevel(state, idx));
                    setDeleteConfirmIdx(null);
                  } else
                  {
                    setDeleteConfirmIdx(idx);
                  }
                }}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: deleteConfirmIdx === idx ? "rgba(248, 113, 113, 0.2)" : "rgba(255, 75, 110, 0.1)",
                  border: deleteConfirmIdx === idx ? "1px solid rgba(248, 113, 113, 0.5)" : "1px solid rgba(255, 75, 110, 0.2)",
                  color: deleteConfirmIdx === idx ? "#F87171" : "#FF4B6E",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "600",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {deleteConfirmIdx === idx ? "Confirm?" : "Delete"}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "16px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onExit}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => {
              const json = LevelMakerController.exportJSON(state);
              const blob = new Blob([json], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "mise-levels.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Export
          </button>

          <button
            onClick={() => {
              fileInputRef.current?.click();
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Import
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file)
              {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const json = event.target?.result as string;
                  const imported = LevelMakerController.importJSON(json);
                  if (imported)
                  {
                    setState(imported);
                  } else
                  {
                    alert("Failed to import JSON. Please check the file format.");
                  }
                };
                reader.readAsText(file);
              }
            }}
          />

          <button
            onClick={() => {
              LevelMakerController.save(state);
              onSave(state as SavedGameData);
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              marginLeft: "auto",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Save
          </button>

          {/* Reset Link */}
          <button
            onClick={() => {
              if (confirm("Reset all levels and recipes to defaults? This cannot be undone."))
              {
                LevelMakerController.resetDefaults();
                setState(LevelMakerController.loadInitial());
                setDeleteConfirmIdx(null);
              }
            }}
            style={{
              padding: "0",
              background: "none",
              border: "none",
              color: "rgba(255, 255, 255, 0.4)",
              cursor: "pointer",
              fontSize: "12px",
              textDecoration: "underline",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Reset to defaults
          </button>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => {
            setState(LevelMakerController.addLevel(state));
          }}
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "24px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          +
        </button>
      </div>
    );
  }

  // ── Edit Level View ──────────────────────────────────────────────────
  if (view === "editLevel" && editingLevelIdx !== null)
  {
    const level = state.levels[editingLevelIdx];

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Header with Back Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
          <button
            onClick={() => setView("list")}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            ←
          </button>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>Edit Level</h1>
        </div>

        {/* Content Scroll Area */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "20px", paddingRight: "8px" }}>
          {/* Level Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255, 255, 255, 0.7)" }}>
              Level Name
            </label>
            <input
              type="text"
              value={level.name}
              onChange={(e) => {
                setState(LevelMakerController.updateLevel(state, editingLevelIdx, { name: e.target.value }));
              }}
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
                padding: "10px 12px",
                fontSize: "14px",
                WebkitTapHighlightColor: "transparent",
              }}
            />
          </div>

          {/* Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255, 255, 255, 0.7)" }}>
              Description
            </label>
            <textarea
              value={level.description}
              onChange={(e) => {
                setState(LevelMakerController.updateLevel(state, editingLevelIdx, { description: e.target.value }));
              }}
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
                padding: "10px 12px",
                fontSize: "14px",
                minHeight: "80px",
                fontFamily: "inherit",
                resize: "vertical",
                WebkitTapHighlightColor: "transparent",
              }}
            />
          </div>

          {/* Kitchen Theme Picker */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255, 255, 255, 0.7)" }}>
              Kitchen Theme
            </label>
            <div style={{ display: "flex", gap: "12px" }}>
              {(["breakfast", "lunch", "grill", "oven", "chef"] as KitchenType[]).map((kitchen) => (
                <button
                  key={kitchen}
                  onClick={() => {
                    setState(LevelMakerController.updateLevel(state, editingLevelIdx, { kitchen }));
                  }}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "8px",
                    background: KITCHEN_COLORS[kitchen].bg,
                    border: level.kitchen === kitchen ? "3px solid white" : "2px solid rgba(255, 255, 255, 0.2)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "rgba(255, 255, 255, 0.6)",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  title={kitchen}
                />
              ))}
            </div>
          </div>

          {/* Game Config Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255, 255, 255, 0.7)" }}>
              Game Configuration
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { key: "customerTimer", label: "Customer Timer (s)" },
                { key: "nextCustomerDelay", label: "Next Customer Delay (s)" },
                { key: "maxCust", label: "Max Customers" },
                { key: "ovenTimer", label: "Oven Timer (s)" },
                { key: "totalCustomers", label: "Total Customers" },
                { key: "maxWalkouts", label: "Max Walkouts" },
                { key: "startingCustomers", label: "Starting Customers" },
                { key: "serveBreathingRoom", label: "Serve Breathing Room" },
              ].map(({ key, label }) => (
                <div key={key} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.5)" }}>{label}</label>
                  <input
                    type="number"
                    value={level.config[key as keyof typeof level.config]}
                    onChange={(e) => {
                      setState(
                        LevelMakerController.updateLevel(state, editingLevelIdx, {
                          config: { ...level.config, [key]: parseInt(e.target.value) || 0 },
                        })
                      );
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "6px",
                      color: "#fff",
                      padding: "8px 10px",
                      fontSize: "12px",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recipes Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255, 255, 255, 0.7)" }}>
              Recipes
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {level.recipeIds.map((recipeId, recipeIdxInLevel) => {
                const recipe = state.recipes.find((r) => r.id === recipeId);
                if (!recipe) return null;
                return (
                  <div
                    key={recipeId}
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "10px",
                      padding: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setEditingRecipeIdx(recipeIdxInLevel);
                      setView("editRecipe");
                    }}
                  >
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ fontSize: "14px", fontWeight: "600" }}>{recipe.name}</div>
                      <NotationDisplay root={recipe.root} size="small" />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setState(LevelMakerController.deleteRecipe(state, editingLevelIdx, recipeIdxInLevel));
                      }}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        background: "rgba(255, 75, 110, 0.1)",
                        border: "1px solid rgba(255, 75, 110, 0.2)",
                        color: "#FF4B6E",
                        cursor: "pointer",
                        fontSize: "11px",
                        fontWeight: "600",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Add Recipe Button */}
            <button
              onClick={() => {
                setState(LevelMakerController.addRecipe(state, editingLevelIdx));
              }}
              style={{
                padding: "10px",
                borderRadius: "8px",
                background: "rgba(74, 222, 128, 0.08)",
                border: "1px solid rgba(74, 222, 128, 0.2)",
                color: "#4ADE80",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              + Add Recipe
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Edit Recipe View ─────────────────────────────────────────────────
  if (view === "editRecipe" && editingLevelIdx !== null && editingRecipeIdx !== null)
  {
    const level = state.levels[editingLevelIdx];
    const recipeId = level.recipeIds[editingRecipeIdx];
    const recipe = state.recipes.find((r) => r.id === recipeId);

    if (!recipe)
    {
      return (
        <div style={{ color: "#fff", padding: "20px" }}>
          Recipe not found. Please go back.
        </div>
      );
    }

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Header with Back Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
          <button
            onClick={() => setView("editLevel")}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            ←
          </button>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>Edit Recipe</h1>
        </div>

        {/* Content Scroll Area */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "20px", paddingRight: "8px" }}>
          {/* Recipe Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255, 255, 255, 0.7)" }}>
              Recipe Name
            </label>
            <input
              type="text"
              value={recipe.name}
              onChange={(e) => {
                setState(LevelMakerController.updateRecipe(state, recipe.id, { name: e.target.value }));
              }}
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
                padding: "10px 12px",
                fontSize: "14px",
                WebkitTapHighlightColor: "transparent",
              }}
            />
          </div>



          {/* Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255, 255, 255, 0.7)" }}>
              Description
            </label>
            <textarea
              value={recipe.description}
              onChange={(e) => {
                setState(LevelMakerController.updateRecipe(state, recipe.id, { description: e.target.value }));
              }}
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
                padding: "10px 12px",
                fontSize: "14px",
                minHeight: "60px",
                fontFamily: "inherit",
                resize: "vertical",
                WebkitTapHighlightColor: "transparent",
              }}
            />
          </div>

          {/* Order Type */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255, 255, 255, 0.7)" }}>
              Order Type
            </label>
            <select
              value={recipe.order}
              onChange={(e) => {
                setState(LevelMakerController.updateRecipe(state, recipe.id, { order: e.target.value as "any" | "strict" }));
              }}
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
                padding: "10px 12px",
                fontSize: "14px",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <option value="any">Any Order</option>
              <option value="strict">Strict Order</option>
            </select>
          </div>

          {/* Preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255, 255, 255, 0.7)" }}>
              Preview
            </label>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <NotationDisplay root={recipe.root} size="normal" />
            </div>
          </div>

          {/* Recipe Layers Editor */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255, 255, 255, 0.7)" }}>
              Recipe Layers
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {recipe.root.children.map((child, idx) => (
                <RecipeNodeEditor
                  key={idx}
                  node={child}
                  onUpdate={(updated) => {
                    const newChildren = [...recipe.root.children];
                    newChildren[idx] = updated;
                    setState(
                      LevelMakerController.updateRecipe(state, recipe.id, {
                        root: { ...recipe.root, children: newChildren },
                      })
                    );
                  }}
                  onDelete={() => {
                    const newChildren = recipe.root.children.filter((_, i) => i !== idx);
                    setState(
                      LevelMakerController.updateRecipe(state, recipe.id, {
                        root: { ...recipe.root, children: newChildren },
                      })
                    );
                  }}
                />
              ))}
            </div>

            {/* Add Layer Button */}
            <button
              onClick={() => {
                const newChildren = [
                  ...recipe.root.children,
                  { type: "layer" as const, element: "clubs" as const, cardType: "any" as const, minSum: null },
                ];
                setState(
                  LevelMakerController.updateRecipe(state, recipe.id, {
                    root: { ...recipe.root, children: newChildren },
                  })
                );
              }}
              style={{
                padding: "10px",
                borderRadius: "8px",
                background: "rgba(74, 222, 128, 0.08)",
                border: "1px solid rgba(74, 222, 128, 0.2)",
                color: "#4ADE80",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              + Add Layer
            </button>

            {/* Add Oven Group Button */}
            <button
              onClick={() => {
                const newChildren = [
                  ...recipe.root.children,
                  {
                    type: "group" as const,
                    oven: true,
                    minSum: null,
                    children: [{ type: "layer" as const, element: "clubs" as const, cardType: "any" as const }],
                  },
                ];
                setState(
                  LevelMakerController.updateRecipe(state, recipe.id, {
                    root: { ...recipe.root, children: newChildren },
                  })
                );
              }}
              style={{
                padding: "10px",
                borderRadius: "8px",
                background: "rgba(255, 140, 66, 0.08)",
                border: "1px solid rgba(255, 140, 66, 0.2)",
                color: "#FF8C42",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              🔥 Add Oven Group
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div style={{ color: "#fff", padding: "20px" }}>Invalid state</div>;
}
