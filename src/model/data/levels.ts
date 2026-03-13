import type { Level, LevelConfig } from "../types";

export const LEVELS: Level[] = [
  // COLORS
  { id:1, name:"Color Basics", description:"Simple red and black orders to get you started.", kitchen:"breakfast", recipes:[101,102],
    newMechanic:"Colors Only", mechanicIntro:"Serve customers by matching the required color." },
  { id:2, name:"Color Intermediate", description:"Multiple layers of colors.", kitchen:"breakfast", recipes:[103,104,105],
    newMechanic:null, mechanicIntro:null },
  { id:3, name:"Color Complex", description:"Fast-paced color matching with big stacks.", kitchen:"breakfast", recipes:[103,104,105,106,107],
    newMechanic:null, mechanicIntro:null },
  
  // SUITS
  { id:4, name:"Suit Basics", description:"Focuses on matching specific shapes.", kitchen:"lunch", recipes:[201,202,203,204],
    newMechanic:"Suits", mechanicIntro:"Customers now want Hearts, Diamonds, Spades, or Clubs. Watch the shapes." },
  { id:5, name:"Suit Intermediate", description:"Larger suit combinations.", kitchen:"lunch", recipes:[203,204,205,206],
    newMechanic:null, mechanicIntro:null },
  { id:6, name:"Suit Complex", description:"Tight timers and full suit layouts.", kitchen:"lunch", recipes:[204,205,206,207,208],
    newMechanic:null, mechanicIntro:null },

  // ROYALS
  { id:7, name:"Royal Basics", description:"Introduction to the Royal cards.", kitchen:"chef", recipes:[101,102,301,302],
    newMechanic:"Royals", mechanicIntro:"A layer with a crown (♚) means you MUST use a Royal card. Royals count as 1 card." },
  { id:8, name:"Royal Complex", description:"Heavy royal usage with color combinations.", kitchen:"chef", recipes:[103,105,302,303,304],
    newMechanic:null, mechanicIntro:null },

  { id:9, name:"Royals & Suits", description:"Matching exact suits wrapped around royal cards.", kitchen:"chef", recipes:[311,312,313,314],
    newMechanic:null, mechanicIntro:null },

  // SUMS
  { id:10, name:"Sum Basics", description:"Introducing numeric bundles using colors.", kitchen:"grill", recipes:[105,106,401,402],
    newMechanic:"Sums", mechanicIntro:"A layer with a number (like 5+) means you must provide enough cards to meet or exceed that sum!" },
  { id:11, name:"Sum Intermediate", description:"Numeric bundles using suits.", kitchen:"grill", recipes:[205,206,403,404,410],
    newMechanic:null, mechanicIntro:null },

  // --- THEME ---
  { id:12, name:"The Three-Suit Shuffle", description:"Only Spades, Clubs, and Hearts! Diamonds are forbidden.", kitchen:"grill", recipes:[703,704,705,203,410],
    newMechanic:null, mechanicIntro:"There are NO Diamonds in these recipes. If you see one, throw it away immediately!" },

  { id:13, name:"Sum Complex", description:"Suited bundles and high target numbers.", kitchen:"grill", recipes:[403,404,407,409,207],
    newMechanic:null, mechanicIntro:null },
  { id:14, name:"Sums & Royals", description:"Complex recipes mixing suits, multi-sums, and royals.", kitchen:"grill", recipes:[407,408,501,502,314],
    newMechanic:null, mechanicIntro:null },

  // CHOPPING
  { id:15, name:"Chopping Basics", description:"Grab a knife.", kitchen:"chef", recipes:[101,801,802,803],
    newMechanic:"Chopping Board", mechanicIntro:"Some components must be chopped! Form the group and perform chopping motions in real life." },
  { id:16, name:"Suit Slicing", description:"Chopping mixed with suits and basic royals.", kitchen:"chef", recipes:[804,805,806,807,808],
    newMechanic:null, mechanicIntro:null },
  { id:17, name:"Shared Prep", description:"Complex intertwined meals spanning five layers deep sharing massive chopped black suit generic batches.", kitchen:"chef", recipes:[809,810,811,812,813],
    newMechanic:"Gimmick: Batch Prep", mechanicIntro:"Most of these complex recipes require the exact same massive chopped bundle. Stockpile it!" },
  { id:18, name:"The Prep Master", description:"Extreme precision. Slicing massive simultaneous bundles and navigating interleaved orders.", kitchen:"chef", recipes:[814,815,816,817],
    newMechanic:"Gimmick: Flawless Execution", mechanicIntro:"Deeply complex chopping groupings. Track your gestures carefully." },

  // OVENS
  { id:19, name:"Oven Basics", description:"Baking colors and royals.", kitchen:"oven", recipes:[301,302,601,602],
    newMechanic:"The Oven", mechanicIntro:"Some components must be cooked. Throw them in and tap the Oven to cycle it." },
  { id:20, name:"Oven Intermediate", description:"Baking suits, sums, and royals.", kitchen:"oven", recipes:[501,502,603],
    newMechanic:null, mechanicIntro:null },

  // --- THEME ---
  { id:21, name:"Heart of the Oven", description:"All hearts belong in the heat.", kitchen:"oven", recipes:[701,702,706,603,604],
    newMechanic:"Theme: Baked Hearts", mechanicIntro:"Every Heart layer in this level MUST be placed in an Oven group!" },

  { id:22, name:"Oven Complex", description:"Baking highly complex recipes.", kitchen:"oven", recipes:[501,601,602,603,604],
    newMechanic:null, mechanicIntro:null },
  { id:23, name:"Hot & Cold", description:"Baked parts, fresh parts.", kitchen:"oven", recipes:[303,304,603,604,605],
    newMechanic:null, mechanicIntro:null },

  // MASTERY
  { id:24, name:"The Ultimate", description:"Everything baked & fresh. Good luck.", kitchen:"chef", recipes:[502,603,604,605,606],
    newMechanic:"Mastery", mechanicIntro:"Show us what you've learned. Expect long recipes with numeric oven layers and royals." },
];

export const LEVEL_CONFIGS: Record<number, LevelConfig> = {
  1:  { customerTimer:90, nextCustomerDelay:5, maxCust:2, ovenTimer:20, totalCustomers:3, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:2 },
  2:  { customerTimer:85, nextCustomerDelay:5, maxCust:2, ovenTimer:20, totalCustomers:4, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:2 },
  3:  { customerTimer:80, nextCustomerDelay:4, maxCust:3, ovenTimer:20, totalCustomers:6, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:2 },
  
  4:  { customerTimer:85, nextCustomerDelay:5, maxCust:4, ovenTimer:20, totalCustomers:8, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:2 },
  5:  { customerTimer:80, nextCustomerDelay:4, maxCust:4, ovenTimer:20, totalCustomers:10, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:2 },
  6:  { customerTimer:75, nextCustomerDelay:4, maxCust:4, ovenTimer:20, totalCustomers:12, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:2 },
  
  7:  { customerTimer:80, nextCustomerDelay:5, maxCust:3, ovenTimer:20, totalCustomers:8, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:2 },
  8:  { customerTimer:75, nextCustomerDelay:4, maxCust:4, ovenTimer:20, totalCustomers:10, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:2 },
  
  9:  { customerTimer:75, nextCustomerDelay:4, maxCust:4, ovenTimer:20, totalCustomers:10, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:2 },
  10: { customerTimer:80, nextCustomerDelay:5, maxCust:4, ovenTimer:20, totalCustomers:8, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:2 },
  11: { customerTimer:75, nextCustomerDelay:4, maxCust:4, ovenTimer:20, totalCustomers:10, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:2 },
  12: { customerTimer:75, nextCustomerDelay:4, maxCust:4, ovenTimer:20, totalCustomers:12, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:2 },
  13: { customerTimer:75, nextCustomerDelay:4, maxCust:4, ovenTimer:20, totalCustomers:12, maxWalkouts:3, startingCustomers:2, serveBreathingRoom:2 },
  14: { customerTimer:70, nextCustomerDelay:4, maxCust:5, ovenTimer:20, totalCustomers:15, maxWalkouts:3, startingCustomers:2, serveBreathingRoom:2 },

  15: { customerTimer:75, nextCustomerDelay:5, maxCust:4, ovenTimer:15, totalCustomers:8, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:3 },
  16: { customerTimer:70, nextCustomerDelay:4, maxCust:4, ovenTimer:15, totalCustomers:10, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:3 },
  17: { customerTimer:75, nextCustomerDelay:4, maxCust:4, ovenTimer:15, totalCustomers:11, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:3 },
  18: { customerTimer:75, nextCustomerDelay:4, maxCust:5, ovenTimer:15, totalCustomers:12, maxWalkouts:3, startingCustomers:2, serveBreathingRoom:3 },

  19: { customerTimer:75, nextCustomerDelay:5, maxCust:4, ovenTimer:15, totalCustomers:8, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:3 },
  20: { customerTimer:70, nextCustomerDelay:4, maxCust:4, ovenTimer:15, totalCustomers:10, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:3 },
  21: { customerTimer:65, nextCustomerDelay:4, maxCust:4, ovenTimer:12, totalCustomers:12, maxWalkouts:3, startingCustomers:1, serveBreathingRoom:3 },
  22: { customerTimer:70, nextCustomerDelay:4, maxCust:4, ovenTimer:12, totalCustomers:12, maxWalkouts:3, startingCustomers:2, serveBreathingRoom:3 },
  23: { customerTimer:65, nextCustomerDelay:4, maxCust:5, ovenTimer:12, totalCustomers:15, maxWalkouts:3, startingCustomers:2, serveBreathingRoom:2 },
  
  24: { customerTimer:60, nextCustomerDelay:3, maxCust:6, ovenTimer:10, totalCustomers:20, maxWalkouts:4, startingCustomers:2, serveBreathingRoom:2 },
};
