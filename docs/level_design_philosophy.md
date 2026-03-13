# Mise en Place: Level Design Philosophy

This document serves as the absolute rulebook for designing levels and structuring recipes in *Mise en Place*. When adding new mechanics, this progression system must be followed strictly to ensure a balanced, scalable difficulty curve.

## The Progression Arc

Every new mechanic (Suit, Sum, Royal, Chopping, Oven) must follow a dedicated progression arc, typically spanning multiple levels before moving on to the next major mechanic.

### 1. Basics
The goal of a Basics level is to introduce the mechanic in absolute isolation. The player must learn what the mechanic *is*.
- **Constraints**: 
  - Introduce exactly **ONE** new mechanic.
  - Pair the new mechanic only with the simplest foundational mechanics (e.g., plain colors: Red/Black).
  - Recipes must be short (**2 to 3 elements max**).
- **Pacing**: Generous. High `customerTimer` (75s+) and high `serveBreathingRoom` (3s). Few total customers.

### 2. Intermediate
The goal of an Intermediate level is to weave the new mechanic into the fabric of the game by combining it with mid-tier existing concepts.
- **Constraints**:
  - Combine the new mechanic with mid-tier mechanics (e.g., precise Suits, simple Royals).
  - Recipes naturally grow to **3 to 5 elements**.
  - **Must feature 4 or more unique recipes.**
- **Pacing**: Moderate. Tighter timers with more customers.

### 3. Combinations & Complex Mechanics
Levels that combine multiple mechanics together. This can span one or more levels, ramping up in difficulty.
- **Constraints**:
  - Combine the new mechanic with high-tier mechanics (e.g., Numeric Sums, huge nested groupings).
  - Recipes become massive (**4 to 6+ elements**).
  - **Must feature 4 or more unique recipes.**
- **Pacing**: Intense. Heavy concurrent orders and tight timers.

### 4. Gimmick Levels
Some levels introduce a "gimmick" rather than a brand-new mechanic. A gimmick imposes a unique constraint that forces players to play differently, but uses existing mechanics.
- **Example**: *"The Three-Suit Shuffle"* which explicitly forbids Diamonds, causing the player to aggressively discard them.
- **Role**: Gimmicks serve as pacing breakers, forcing cognitive shifts without the overhead of learning a new station or UI element.

***

## Thematic Cohesion
Levels within a block should share thematic tissue. Their names, descriptions, and the recipes they serve should feel like they belong together. When transitioning from Intermediate to Complex, the theme can evolve or intensify.

***

## Recipe Design Guidelines
When building actual recipe definitions (`recipes.ts`):
1. **Naming**: Give recipes thematic, clever names that accurately represent the visual stack (e.g., *"Heart Oven Sandwich"*, *"The Casserole"*, *"Prep Work"*).
2. **Descriptions**: The description must clearly state what the recipe objectively is. Keep it to one concise sentence.
3. **Nesting**: Always prefer nested Groups over flat layers when mechanics apply to multiple items simultaneously. If two items must be baked together and one is a sum, nest the sum group *inside* the oven group.
