import React, { useState, useEffect } from "react";
import type { Level, LevelWithConfig, Recipe, LevelConfig, KitchenType } from "../../model/types";
import { LEVELS, LEVEL_CONFIGS } from "../../model/data/levels";
import { RECIPES } from "../../model/data/recipes";
import { KITCHEN_COLORS } from "../../model/data/theme";
import { NotationDisplay } from "../components/NotationDisplay";
import { RulebookWizard } from "../components/RulebookWizard";

interface Props {
  onSelectLevel: (levelId: number) => void;
  onOpenLevelMaker?: () => void;
  levels?: Level[] | LevelWithConfig[];
  recipes?: Recipe[];
  levelConfigs?: Record<number, LevelConfig>;
  unlockedLevels: number[];
}

function isLevelWithConfig(level: Level | LevelWithConfig): level is LevelWithConfig {
  return "config" in level;
}

export function LevelSelect({
  onSelectLevel,
  onOpenLevelMaker,
  levels = LEVELS,
  recipes = RECIPES,
  levelConfigs = LEVEL_CONFIGS,
  unlockedLevels = [],
}: Props) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [showRules, setShowRules] = useState(false);

  // Auto-show rules on very first launch
  useEffect(() => {
    const hasSeen = localStorage.getItem("misenplace_rules_seen");
    if (!hasSeen)
    {
      setShowRules(true);
    }
  }, []);

  const handleCloseRules = () => {
    localStorage.setItem("misenplace_rules_seen", "true");
    setShowRules(false);
  };

  // Build recipe lookup map
  const recipeMap = new Map<number | string, Recipe>();
  recipes.forEach((r) => {
    recipeMap.set(r.id, r);
  });

  // Helper to get config for a level
  const getConfig = (level: Level | LevelWithConfig): LevelConfig | null => {
    if (isLevelWithConfig(level))
    {
      return level.config;
    }
    return levelConfigs[level.id] || null;
  };

  // Helper to get recipe IDs for a level
  const getRecipeIds = (level: Level | LevelWithConfig): (number | string)[] => {
    if (level.recipeIds)
    {
      return level.recipeIds;
    }
    if (level.recipes)
    {
      return level.recipes;
    }
    return [];
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "8px",
        }}
      >
        {/* Logo placeholder */}
        <div
          style={{
            width: "48px",
            height: "48px",
            background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "10px",
            textAlign: "center",
            padding: "4px",
          }}
        >
          MISE
        </div>

        {/* Title */}
        <h1
          style={{
            flex: 1,
            margin: 0,
            fontSize: "28px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
          }}
        >
          MISE EN PLACE
        </h1>

        {/* Actions Container */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={() => setShowRules(true)}
            style={{
              padding: "0 16px",
              height: "48px",
              borderRadius: "8px",
              border: "2px solid rgba(10, 132, 255, 0.3)",
              background: "rgba(10, 132, 255, 0.15)",
              color: "#0A84FF",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
          >
            <span style={{ fontSize: "18px" }}>📘</span> Rules
          </button>

          {onOpenLevelMaker && (
            <button
              onClick={onOpenLevelMaker}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
            >
              ⚙
            </button>
          )}
        </div>
      </header>

      {/* Levels Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "4px",
          flex: 1,
        }}
      >
        {levels.map((level, index) => {
          const isSelected = selectedLevel === level.id;
          const isUnlocked = unlockedLevels.includes(level.id);
          const config = getConfig(level);
          const recipeIds = getRecipeIds(level);
          const kitchenColor = KITCHEN_COLORS[level.kitchen];

          return (
            <div
              key={level.id}
              style={{
                animation: `slideIn 0.3s ease forwards`,
                animationDelay: `${index * 0.05}s`,
              } as React.CSSProperties & { animation?: string; animationDelay?: string }}
            >
              <style>{`
                @keyframes slideIn {
                  from {
                    opacity: 0;
                    transform: translateY(8px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>

              <div
                style={{
                  background: "rgba(20, 10, 40, 0.6)",
                  border: isSelected
                    ? `2px solid ${kitchenColor.primary}`
                    : "2px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                  cursor: isUnlocked ? "pointer" : "not-allowed",
                  opacity: isUnlocked ? 1 : 0.4,
                  pointerEvents: isUnlocked ? "auto" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected && isUnlocked)
                  {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.currentTarget.style.background = "rgba(20, 10, 40, 0.8)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected)
                  {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.background = "rgba(20, 10, 40, 0.6)";
                  }
                }}
              >
                {/* Card Header - Always Visible */}
                <div
                  onClick={() => {
                    if (isUnlocked)
                    {
                      setSelectedLevel(isSelected ? null : level.id);
                    }
                  }}
                  style={{
                    padding: "16px",
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    background: isSelected ? `${kitchenColor.primary}15` : "transparent",
                    transition: "background 0.2s ease",
                  }}
                >
                  {/* Level Badge */}
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      background: kitchenColor.bg,
                      border: `3px solid ${kitchenColor.primary}`,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      fontWeight: "bold",
                      color: kitchenColor.primary,
                      flexShrink: 0,
                      boxShadow: `0 0 12px ${kitchenColor.primary}33`,
                    }}
                  >
                    {level.id}
                  </div>

                  {/* Title and Description */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        margin: "0 0 6px 0",
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#ffffff",
                      }}
                    >
                      {!isUnlocked ? "🔒 " : ""}{level.name}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        color: "rgba(255, 255, 255, 0.7)",
                        lineHeight: "1.4",
                      }}
                    >
                      {level.description}
                    </p>
                  </div>

                  {/* Expand/Collapse Indicator */}
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: kitchenColor.primary,
                      fontSize: "16px",
                      fontWeight: "bold",
                      transition: "transform 0.2s ease",
                      transform: isSelected ? "rotate(180deg)" : "rotate(0deg)",
                      flexShrink: 0,
                    }}
                  >
                    ▼
                  </div>
                </div>

                {/* Expanded Content */}
                {isSelected && (
                  <div
                    style={{
                      borderTop: `1px solid ${kitchenColor.primary}33`,
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {/* New Mechanic Callout */}
                    {level.newMechanic && level.mechanicIntro && (
                      <div
                        style={{
                          background: `${kitchenColor.secondary}20`,
                          border: `2px solid ${kitchenColor.secondary}`,
                          borderRadius: "8px",
                          padding: "12px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: kitchenColor.secondary,
                            textTransform: "uppercase",
                            marginBottom: "4px",
                          }}
                        >
                          NEW: {level.newMechanic}
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "rgba(255, 255, 255, 0.9)",
                            lineHeight: "1.4",
                          }}
                        >
                          {level.mechanicIntro}
                        </div>
                      </div>
                    )}

                    {/* Stats Row */}
                    {config && (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "11px",
                              color: "rgba(255, 255, 255, 0.6)",
                              textTransform: "uppercase",
                              marginBottom: "4px",
                              fontWeight: "600",
                            }}
                          >
                            Timer
                          </div>
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              color: "#ffffff",
                            }}
                          >
                            {config.customerTimer}s
                          </div>
                        </div>

                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "11px",
                              color: "rgba(255, 255, 255, 0.6)",
                              textTransform: "uppercase",
                              marginBottom: "4px",
                              fontWeight: "600",
                            }}
                          >
                            Max Walkouts
                          </div>
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              color: "#ffffff",
                            }}
                          >
                            {config.maxWalkouts}
                          </div>
                        </div>

                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "11px",
                              color: "rgba(255, 255, 255, 0.6)",
                              textTransform: "uppercase",
                              marginBottom: "4px",
                              fontWeight: "600",
                            }}
                          >
                            Customers
                          </div>
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              color: "#ffffff",
                            }}
                          >
                            {config.totalCustomers}
                          </div>
                        </div>

                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "11px",
                              color: "rgba(255, 255, 255, 0.6)",
                              textTransform: "uppercase",
                              marginBottom: "4px",
                              fontWeight: "600",
                            }}
                          >
                            Seats
                          </div>
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              color: "#ffffff",
                            }}
                          >
                            {config.maxCust}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Recipes Section */}
                    {recipeIds.length > 0 && (
                      <div>
                        <h4
                          style={{
                            margin: "0 0 12px 0",
                            fontSize: "13px",
                            fontWeight: "bold",
                            color: "rgba(255, 255, 255, 0.8)",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Recipes
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          {recipeIds.map((recipeId) => {
                            const recipe = recipeMap.get(recipeId);
                            if (!recipe) return null;

                            return (
                              <div
                                key={recipe.id}
                                style={{
                                  background: "rgba(255, 255, 255, 0.04)",
                                  border: "1px solid rgba(255, 255, 255, 0.1)",
                                  borderRadius: "8px",
                                  padding: "10px",
                                }}
                              >

                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    gap: "8px",
                                    marginBottom: "8px",
                                  }}
                                >
                                  <div>
                                    <div
                                      style={{
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                        color: "#ffffff",
                                      }}
                                    >
                                      {recipe.name}
                                    </div>
                                    <div
                                      style={{
                                        fontSize: "12px",
                                        color: "rgba(255, 255, 255, 0.6)",
                                        marginTop: "2px",
                                      }}
                                    >
                                      {recipe.description}
                                    </div>
                                  </div>
                                </div>
                                <NotationDisplay root={recipe.root} size="small" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Start Shift Button */}
                    <button
                      onClick={() => onSelectLevel(level.id)}
                      style={{
                        background: `linear-gradient(135deg, ${kitchenColor.primary}, ${kitchenColor.secondary})`,
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "14px 20px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: `0 0 16px ${kitchenColor.primary}40`,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = `0 4px 20px ${kitchenColor.primary}60`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = `0 0 16px ${kitchenColor.primary}40`;
                      }}
                    >
                      Start Shift
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showRules && <RulebookWizard onClose={handleCloseRules} />}
    </div>
  );
}
