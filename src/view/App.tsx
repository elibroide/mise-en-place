import { useState, useEffect } from "react";
import type { Recipe, Level, LevelWithConfig, LevelConfig, SavedGameData } from "../model/types";
import { RECIPES } from "../model/data/recipes";
import { LEVELS, LEVEL_CONFIGS } from "../model/data/levels";
import { loadGameData } from "../model/persistence";
import { GLOBAL_STYLES } from "./styles";
import { LevelSelect } from "./screens/LevelSelect";
import { GameScreen } from "./screens/GameScreen";
import { LevelMaker } from "./screens/LevelMaker";

type Screen = "levelSelect" | "game" | "levelMaker";

interface GameData {
  levels: (Level | LevelWithConfig)[];
  recipes: Recipe[];
  levelConfigs: Record<number, LevelConfig>;
}

function buildGameData(): GameData {
  const custom = loadGameData();
  if (custom)
  {
    return {
      levels: custom.levels,
      recipes: custom.recipes,
      levelConfigs: custom.levels.reduce<Record<number, LevelConfig>>((acc, level) => {
        acc[level.id] = level.config;
        return acc;
      }, {}),
    };
  }
  return {
    levels: LEVELS,
    recipes: RECIPES,
    levelConfigs: LEVEL_CONFIGS,
  };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("levelSelect");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [gameData, setGameData] = useState<GameData>(buildGameData);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([]);

  // Load Unlocked Levels
  useEffect(() => {
    const saved = localStorage.getItem("misenplace_unlocked");
    if (saved)
    {
      try
      {
        setUnlockedLevels(JSON.parse(saved));
      } catch (e)
      {
        setUnlockedLevels([1, 2, 3]); // Default training levels
      }
    } else
    {
      setUnlockedLevels([1, 2, 3]);
    }
  }, []);

  // Developer Cheats
  useEffect(() => {
    (window as any).unlockAllLevels = () => {
      const all = Array.from({ length: 24 }, (_, i) => i + 1);
      setUnlockedLevels(all);
      localStorage.setItem("misenplace_unlocked", JSON.stringify(all));
      console.log("All 24 levels unlocked!");
    };
    (window as any).resetLevels = () => {
      const initial = [1, 2, 3];
      setUnlockedLevels(initial);
      localStorage.setItem("misenplace_unlocked", JSON.stringify(initial));
      console.log("Levels reset. Only Training 1-3 unlocked.");
    };
  }, []);

  const handleWin = (levelId: number) => {
    const nextLevel = levelId + 1;
    setUnlockedLevels((prev) => {
      if (!prev.includes(nextLevel))
      {
        const updated = [...prev, nextLevel];
        localStorage.setItem("misenplace_unlocked", JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  const startLevel = (levelId: number) => {
    setSelectedLevel(levelId);
    setScreen("game");
  };

  const backToMenu = () => {
    setScreen("levelSelect");
    setSelectedLevel(null);
  };

  const handleOpenLevelMaker = () => {
    setScreen("levelMaker");
  };

  const handleSaveLevels = (data: SavedGameData) => {
    const newConfigs = data.levels.reduce<Record<number, LevelConfig>>((acc, level) => {
      acc[level.id] = level.config;
      return acc;
    }, {});
    setGameData({
      levels: data.levels,
      recipes: data.recipes,
      levelConfigs: newConfigs,
    });
    setScreen("levelSelect");
  };

  const handleExitLevelMaker = () => {
    setScreen("levelSelect");
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale" as any,
      color: "#fff",
      maxWidth: "100vw",
      overflowX: "hidden",
      touchAction: "manipulation",
    }}>
      <style>{GLOBAL_STYLES}</style>

      {screen === "levelSelect" && (
        <LevelSelect
          onSelectLevel={startLevel}
          onOpenLevelMaker={handleOpenLevelMaker}
          levels={gameData.levels}
          recipes={gameData.recipes.length > 0 ? gameData.recipes : RECIPES}
          levelConfigs={gameData.levelConfigs}
          // @ts-ignore - newly added prop to LevelSelect
          unlockedLevels={unlockedLevels}
        />
      )}
      {screen === "game" && selectedLevel !== null && (
        <GameScreen
          levelId={selectedLevel}
          onExit={backToMenu}
          onWin={handleWin}
          levels={gameData.levels}
          recipes={gameData.recipes.length > 0 ? gameData.recipes : RECIPES}
          levelConfigs={gameData.levelConfigs}
        />
      )}
      {screen === "levelMaker" && (
        <LevelMaker onExit={handleExitLevelMaker} onSave={handleSaveLevels} />
      )}
    </div>
  );
}
