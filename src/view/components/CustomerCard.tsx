import { useState, useEffect } from "react";
import type { Customer, Recipe } from "../../model/types";
import { RECIPES } from "../../model/data/recipes";
import { NotationDisplay } from "./NotationDisplay";

interface Props {
  customer: Customer;
  onTap: (customer: Customer) => void;
  displayRecipes?: Recipe[];
}

export function CustomerCard({ customer, onTap, displayRecipes }: Props) {
  const progress = customer.timeLeft / customer.totalTime;
  const urgent = progress < 0.25;
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 600);
    return () => clearTimeout(t);
  }, []);

  const recipes = displayRecipes || RECIPES;
  const recipe = customer.recipe || recipes.find((r) => r.id === customer.recipeId);
  if (!recipe) return null;

  const cc = customer.color;

  return (
    <div
      onClick={() => onTap(customer)}
      style={{
        background: cc.bg,
        backdropFilter: "blur(8px)",
        borderRadius: 16,
        padding: "14px 12px 12px",
        border: `2px solid ${urgent ? "#FF4B6E" : "rgba(0,0,0,0.3)"}`,
        cursor: "pointer",
        transition: "transform 0.15s ease, border-color 0.3s ease",
        animation: entering ? "customer-enter 0.6s cubic-bezier(0.34,1.56,0.64,1)" :
          urgent ? "urgent-pulse 1s ease-in-out infinite" : "none",
        boxShadow: urgent ? "0 0 20px rgba(255,75,110,0.3)" :
          "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        height: "100%",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Timer bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: "rgba(0,0,0,0.3)", borderRadius: "16px 16px 0 0",
      }}>
        <div style={{
          height: "100%", borderRadius: "16px 16px 0 0",
          width: `${progress * 100}%`,
          background: urgent ? "#FF4B6E" : progress < 0.5 ? "#FBBF24" : "#4ADE80",
          transition: "width 0.5s linear",
          boxShadow: urgent ? "0 0 8px rgba(255,75,110,0.6)" : "none",
        }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, marginTop: 4 }}>
        {/* Avatar */}
        {customer.avatarId ? (
          <img
            src={`/avatars/avatar_${customer.avatarId}.png`}
            alt={customer.name}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: `2px solid ${urgent ? "#FF4B6E" : "rgba(255,255,255,0.2)"}`,
              objectFit: "cover"
            }}
          />
        ) : (
          <div style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            border: `2px solid ${urgent ? "#FF4B6E" : "rgba(255,255,255,0.2)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20
          }}>
            👤
          </div>
        )}

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Customer name */}
          <div style={{ marginBottom: 2 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>{customer.name}</span>
          </div>

          {/* Recipe name */}
          <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
            {recipe.name}
          </div>
        </div>
      </div>

      {/* Notation */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
        <NotationDisplay root={recipe.root} size="normal" />
      </div>
    </div>
  );
}
