import mitt from "mitt";
import type {
  Customer,
  GameEvents,
  GameSnapshot,
  LevelConfig,
  PlayState,
  Recipe,
} from "../model/types";
import { pickRandom, uid } from "../model/utils";
import { CUSTOMER_NAMES, CUSTOMER_COLORS } from "../model/data/theme";

export class GameController {
  // Event bus
  readonly events = mitt<GameEvents>();

  // Config
  private config: LevelConfig;
  private recipeIds: (number | string)[];
  private allRecipes: Recipe[];

  // State
  private customers: Customer[] = [];
  private totalCustomersSpawned = 0;
  private served = 0;
  private walkouts = 0;
  private nextDelay = 0;
  private gameState: PlayState = "playing";

  // Internals
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private lastTick = 0;

  constructor(config: LevelConfig, recipeIds: (number | string)[], allRecipes: Recipe[]) {
    this.config = config;
    this.recipeIds = recipeIds;
    this.allRecipes = allRecipes;
  }

  /** Start the game loop and spawn the first customer */
  start(): void {
    // Spawn first customer
    this.spawnCustomer();
    this.nextDelay = this.config.nextCustomerDelay;
    this.lastTick = Date.now();

    this.intervalId = setInterval(() => this.tick(), 50);
    this.emitState();
  }

  /** Stop the game loop */
  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /** Get a read-only snapshot of current state */
  getSnapshot(): GameSnapshot {
    return {
      customers: [...this.customers],
      totalCustomersSpawned: this.totalCustomersSpawned,
      targetCustomers: this.config.totalCustomers,
      served: this.served,
      walkouts: this.walkouts,
      gameState: this.gameState,
    };
  }

  // ── Actions ──────────────────────────────────────────────

  /** Serve a customer by id */
  serve(customerId: string): void {
    if (this.gameState !== "playing") return;

    const idx = this.customers.findIndex((c) => c.id === customerId);
    if (idx === -1) return;

    // Emit particle burst at a default position (view can override)
    this.events.emit("particleBurst", {
      x: 0, // View will provide real coordinates
      y: 0,
      count: 16,
      spread: 100,
    });
    this.events.emit("shake", { intensity: 3, duration: 200 });

    this.customers.splice(idx, 1);
    this.served++;
    // Breathing room after serve
    this.nextDelay = Math.max(this.nextDelay, this.config.serveBreathingRoom);

    this.emitState();
  }

  // ── Private ──────────────────────────────────────────────

  private tick(): void {
    if (this.gameState !== "playing") return;

    const now = Date.now();
    const dt = (now - this.lastTick) / 1000;
    this.lastTick = now;

    // Update customer timers
    let newWalkouts = 0;
    this.customers = this.customers
      .map((c) => {
        const newTime = c.timeLeft - dt;
        if (newTime <= 0) {
          newWalkouts++;
          return { ...c, timeLeft: 0, walkedOut: true };
        }
        return { ...c, timeLeft: newTime };
      })
      .filter((c) => !c.walkedOut);

    if (newWalkouts > 0) {
      this.walkouts += newWalkouts;
      this.events.emit("shake", { intensity: 5, duration: 300 });
    }

    // Update next customer delay
    this.nextDelay = Math.max(0, this.nextDelay - dt);

    // Spawn customers
    if (
      this.nextDelay <= 0 &&
      this.customers.length < this.config.maxCust &&
      this.totalCustomersSpawned < this.config.totalCustomers
    ) {
      this.spawnCustomer();
      this.nextDelay = this.config.nextCustomerDelay;
    }

    // Check win/lose
    this.checkEndConditions();

    this.emitState();
  }

  private spawnCustomer(): void {
    const selectedRecipeId = pickRandom(this.recipeIds);
    const selectedRecipe = this.allRecipes.find((r) => r.id === selectedRecipeId) || null;
    const customer: Customer = {
      id: uid(),
      name: pickRandom(CUSTOMER_NAMES),
      recipeId: selectedRecipeId,
      recipe: selectedRecipe,
      timeLeft: this.config.customerTimer,
      totalTime: this.config.customerTimer,
      color: pickRandom(CUSTOMER_COLORS),
      avatarId: Math.floor(Math.random() * 5) + 1, // 1 through 5
    };
    this.customers.push(customer);
    this.totalCustomersSpawned++;
  }

  private checkEndConditions(): void {
    if (this.gameState !== "playing") return;

    // Too many walkouts
    if (this.walkouts >= this.config.maxWalkouts) {
      this.endGame("lost");
      return;
    }

    // Finished processing all customers
    if (this.totalCustomersSpawned >= this.config.totalCustomers && this.customers.length === 0) {
      if (this.walkouts < this.config.maxWalkouts) {
        this.endGame("won");
      } else {
        this.endGame("lost");
      }
    }
  }

  private endGame(result: "won" | "lost"): void {
    this.gameState = result;
    this.stop();

    if (result === "won") {
      this.events.emit("particleBurst", {
        x: typeof window !== "undefined" ? window.innerWidth / 2 : 200,
        y: typeof window !== "undefined" ? window.innerHeight / 2 : 400,
        count: 32,
        spread: 160,
      });
      this.events.emit("shake", { intensity: 4, duration: 300 });
    } else {
      this.events.emit("shake", { intensity: 8, duration: 500 });
    }

    this.events.emit("gameOver", {
      result,
      served: this.served,
      walkouts: this.walkouts,
    });
  }

  private emitState(): void {
    this.events.emit("stateChanged", this.getSnapshot());
  }
}
