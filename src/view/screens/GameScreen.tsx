import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import type { Level, LevelConfig, LevelWithConfig, Recipe, Customer } from "../../model/types";
import { LEVELS, LEVEL_CONFIGS } from "../../model/data/levels";
import { RECIPES } from "../../model/data/recipes";
import { KITCHEN_COLORS } from "../../model/data/theme";
import { useGameController } from "../hooks/useGameController";
import { useScreenShake } from "../hooks/useScreenShake";
import { CustomerCard } from "../components/CustomerCard";
import { EmptySeat } from "../components/EmptySeat";
import { DockWidget } from "../components/DockWidget";
import { RecipeBook } from "../components/RecipeBook";
import { Modal } from "../components/Modal";
import { ServeModal } from "../components/ServeModal";
import { ParticleSystem, createParticleBurst, type Particle } from "../components/ParticleSystem";

interface Props {
  levelId: number;
  onExit: () => void;
  onWin?: (levelId: number) => void;
  levels?: Level[] | LevelWithConfig[];
  recipes?: Recipe[];
  levelConfigs?: Record<number, LevelConfig>;
}

export function GameScreen({ levelId, onExit, onWin, levels, recipes, levelConfigs }: Props) {
  // Resolve data with fallbacks
  const allLevels = levels || LEVELS;
  const allRecipes = recipes || RECIPES;
  const allConfigs = levelConfigs || LEVEL_CONFIGS;

  // Find level
  const level = useMemo(() => {
    return allLevels.find((l) => l.id === levelId);
  }, [levelId, allLevels]);

  if (!level)
  {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "#1a1a2e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 18,
      }}>
        Level not found
      </div>
    );
  }

  // Get config (handle both LevelWithConfig and regular Level)
  const config: LevelConfig | undefined = "config" in level ? (level as LevelWithConfig).config : allConfigs[levelId];
  if (!config)
  {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "#1a1a2e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 18,
      }}>
        Config not found for level {levelId}
      </div>
    );
  }

  // Get recipe IDs (handle both old and new formats)
  const recipeIds: (number | string)[] = useMemo(() => {
    if ("recipeIds" in level && level.recipeIds) return level.recipeIds as (number | string)[];
    return level.recipes || [];
  }, [level]);

  // Get kitchen colors
  const kitchenColors = KITCHEN_COLORS[level.kitchen];

  // State
  const [showMechanicIntro, setShowMechanicIntro] = useState(true);
  const [showRecipeBook, setShowRecipeBook] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Stable customer slot map (must be above early return)
  const slotMapRef = useRef<Record<string, number>>({});

  // Hooks
  const { offset, shake } = useScreenShake();
  const { state, serve, controller } = useGameController({
    config,
    recipeIds,
    allRecipes,
    paused: showMechanicIntro,
    onParticleBurst: (data) => {
      setParticles(createParticleBurst(data.x, data.y, data.count, data.spread));
    },
    onShake: (intensity, duration) => {
      shake(intensity, duration);
    },
  });

  const handleServeConfirm = useCallback((customerId: string) => {
    serve(customerId);
    setSelectedCustomer(null);
  }, [serve]);

  const handleParticlesDone = useCallback(() => {
    setParticles([]);
  }, []);

  // Handle game over
  useEffect(() => {
    if (!controller.current) return;
    const handleGameOver = (e: { result: "won" | "lost"; served: number; walkouts: number }) => {
      if (e.result === "won" && onWin)
      {
        onWin(levelId);
      }
    };
    controller.current.events.on("gameOver", handleGameOver);
    return () => {
      controller.current?.events.off("gameOver", handleGameOver);
    };
  }, [controller, onWin, levelId]);


  if (!state)
  {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: kitchenColors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Starting shift...</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Preparing kitchen</div>
        </div>
      </div>
    );
  }



  // Check for urgent customers (< 25% time left)
  const urgentCustomers = state.customers.filter((c) => c.timeLeft / c.totalTime < 0.25);
  const isUrgent = urgentCustomers.length > 0;

  // Stable slot assignment — customers keep their grid position until gone
  const NUM_SLOTS = 6;
  const customerSlots: (Customer | null)[] = new Array(NUM_SLOTS).fill(null);

  // 1. Remove stale assignments (customers no longer present)
  const currentIds = new Set(state.customers.map(c => c.id));
  for (const id of Object.keys(slotMapRef.current))
  {
    if (!currentIds.has(id))
    {
      delete slotMapRef.current[id];
    }
  }

  // 2. Place already-assigned customers into their slots
  for (const c of state.customers)
  {
    const assignedSlot = slotMapRef.current[c.id];
    if (assignedSlot !== undefined && assignedSlot < NUM_SLOTS)
    {
      customerSlots[assignedSlot] = c;
    }
  }

  // 3. Assign new customers to the first available empty slot
  for (const c of state.customers)
  {
    if (slotMapRef.current[c.id] === undefined)
    {
      const emptyIdx = customerSlots.indexOf(null);
      if (emptyIdx !== -1)
      {
        slotMapRef.current[c.id] = emptyIdx;
        customerSlots[emptyIdx] = c;
      }
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: kitchenColors.bg,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        color: "#fff",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Screen shake offset */}
      <div style={{
        position: "absolute",
        inset: 0,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 && offset.y === 0 ? "none" : "transform 50ms ease-out",
        pointerEvents: "none",
        zIndex: 50,
      }} />

      {/* Header */}
      <div style={{
        padding: "12px 16px",
        borderBottom: `1px solid ${kitchenColors.primary}33`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}>
        <button
          onClick={onExit}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
            width: 32,
            height: 32,
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </button>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: kitchenColors.primary }}>
            {level.name}
          </div>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}>
          {/* Customer progress */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 4,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>
              Customers
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: kitchenColors.primary }}>
              {state.totalCustomersSpawned} / {state.targetCustomers}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              fontWeight: 700,
              color: "#4ADE80",
            }}>
              <span>✓</span>
              <span>{state.served}</span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              fontWeight: 700,
              color: "#FF4B6E",
            }}>
              <span>✕</span>
              <span>{state.walkouts}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent banner */}
      {isUrgent && (
        <div style={{
          background: "linear-gradient(90deg, #FF4B6E22 0%, #FF4B6E11 100%)",
          borderBottom: "1px solid #FF4B6E44",
          padding: "8px 16px",
          textAlign: "center",
          fontSize: 12,
          fontWeight: 600,
          color: "#FF4B6E",
          animation: "urgent-pulse 1s ease-in-out infinite",
        }}>
          {urgentCustomers.length} customer{urgentCustomers.length !== 1 ? "s" : ""} almost leaving!
        </div>
      )}

      {/* Main content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: "16px",
      }}>
        {/* Customer grid - 2 columns x 3 rows */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          flex: 1,
          minHeight: 0,
        }}>
          {customerSlots.slice(0, 6).map((customer, idx) =>
            customer ? (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                style={{ cursor: "pointer" }}
              >
                <CustomerCard customer={customer} onTap={setSelectedCustomer} displayRecipes={allRecipes} />
              </div>
            ) : (
              <div key={`empty-${idx}`}>
                <EmptySeat />
              </div>
            )
          )}
        </div>
      </div>

      {/* Bottom dock */}
      <div style={{
        padding: "12px 16px",
        borderTop: `1px solid ${kitchenColors.primary}33`,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 16,
        background: "rgba(0,0,0,0.2)",
      }}>
        <DockWidget
          label="Recipes"
          state="idle"
          progress={0}
          onTap={() => setShowRecipeBook(true)}
          icon="📖"
          color={kitchenColors.secondary}
        />
      </div>

      {/* Modals and overlays */}

      {/* Mechanic intro modal */}
      <Modal
        open={showMechanicIntro}
        onClose={() => setShowMechanicIntro(false)}
        title={level.newMechanic || level.name}
        color={kitchenColors.primary}
      >
        <div style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1.6,
          marginBottom: 20,
          textAlign: "center",
        }}>
          {level.mechanicIntro || `Serve all ${config.totalCustomers} customers before too many walk out. Good luck!`}
        </div>
        <button
          onClick={() => setShowMechanicIntro(false)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 10,
            background: `linear-gradient(135deg, ${kitchenColors.primary}, ${kitchenColors.secondary})`,
            border: "none",
            color: "#1a1a2e",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Got it!
        </button>
      </Modal>

      {/* Recipe book */}
      <RecipeBook
        open={showRecipeBook}
        onClose={() => setShowRecipeBook(false)}
        recipes={allRecipes}
      />

      {/* Serve modal */}
      <ServeModal
        customer={selectedCustomer}
        onConfirm={handleServeConfirm}
        onClose={() => setSelectedCustomer(null)}
        kitchenColors={kitchenColors}
        displayRecipes={allRecipes}
      />

      {/* Game over overlay */}
      {state.gameState !== "playing" && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 300,
          backdropFilter: "blur(4px)",
        }}>
          <div style={{
            background: "#1a1a2e",
            borderRadius: 20,
            padding: 32,
            maxWidth: 320,
            textAlign: "center",
            border: `2px solid ${state.gameState === "won" ? "#4ADE80" : "#FF4B6E"}`,
            animation: "modal-pop 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <div style={{
              fontSize: 32,
              fontWeight: 800,
              color: state.gameState === "won" ? "#4ADE80" : "#FF4B6E",
              marginBottom: 12,
            }}>
              {state.gameState === "won" ? "Shift Complete!" : "Shift Over"}
            </div>

            <div style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 20,
            }}>
              {state.gameState === "won"
                ? "You handled the rush like a pro!"
                : "Better luck next time!"}
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 20,
            }}>
              <div style={{
                background: "rgba(74,222,128,0.1)",
                borderRadius: 12,
                padding: 12,
                border: "1px solid #4ADE8044",
              }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
                  Served
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#4ADE80" }}>
                  {state.served}
                </div>
              </div>
              <div style={{
                background: "rgba(255,75,110,0.1)",
                borderRadius: 12,
                padding: 12,
                border: "1px solid #FF4B6E44",
              }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
                  Walkouts
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#FF4B6E" }}>
                  {state.walkouts}
                </div>
              </div>
            </div>

            <button
              onClick={onExit}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${kitchenColors.primary}, ${kitchenColors.secondary})`,
                border: "none",
                color: "#1a1a2e",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}

      {/* Particle system */}
      <ParticleSystem particles={particles} onDone={handleParticlesDone} />

      {/* Global animations */}
      <style>{`
        @keyframes customer-enter {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes urgent-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes modal-pop {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes particle-fly {
          to {
            transform: translate(var(--tx), var(--ty));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default GameScreen;
