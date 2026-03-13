import type { Suit, KitchenType, SuitStyle, KitchenColors, CustomerColor } from "../types";

export const SUIT_CONFIG: Record<Suit, SuitStyle> = {
  hearts:   { symbol:"♥", color:"#FF2D55", bg:"rgba(255,45,85,0.15)", name:"Hearts" },
  diamonds: { symbol:"♦", color:"#FF2D55", bg:"rgba(255,45,85,0.15)", name:"Diamonds" },
  spades:   { symbol:"♠", color:"#E0E0E0", bg:"rgba(255,255,255,0.10)", name:"Spades" },
  clubs:    { symbol:"♣", color:"#E0E0E0", bg:"rgba(255,255,255,0.10)", name:"Clubs" },
};



export const KITCHEN_COLORS: Record<KitchenType, KitchenColors> = {
  breakfast: { primary:"#FFD93D", secondary:"#FF8C42", bg:"linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 100%)" },
  lunch:     { primary:"#6BCB77", secondary:"#4D96FF", bg:"linear-gradient(135deg, #1a2e1a 0%, #1b3d2d 100%)" },
  grill:     { primary:"#FF6B6B", secondary:"#FFA07A", bg:"linear-gradient(135deg, #2e1a1a 0%, #3d1b1b 100%)" },
  oven:      { primary:"#FF8C42", secondary:"#FFD93D", bg:"linear-gradient(135deg, #2e2a1a 0%, #3d2d1b 100%)" },
  chef:      { primary:"#C084FC", secondary:"#818CF8", bg:"linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 100%)" },
};

export const CUSTOMER_NAMES: string[] = [
  "Maple","Basil","Pepper","Olive","Ginger","Saffron","Clove","Sage",
  "Thyme","Rosie","Cocoa","Truffle","Cinnamon","Nutmeg","Honey","Chai",
  "Poppy","Dill","Mint","Fennel","Anise","Vanilla","Cumin","Paprika",
];

export const CUSTOMER_COLORS: CustomerColor[] = [
  { bg:"linear-gradient(135deg, #FF6B6B22, #FF8E5322)", accent:"#FF6B6B" },
  { bg:"linear-gradient(135deg, #6BCB7722, #4ECDC422)", accent:"#6BCB77" },
  { bg:"linear-gradient(135deg, #4D96FF22, #818CF822)", accent:"#4D96FF" },
  { bg:"linear-gradient(135deg, #FFD93D22, #FF8C4222)", accent:"#FFD93D" },
  { bg:"linear-gradient(135deg, #C084FC22, #A78BFA22)", accent:"#C084FC" },
  { bg:"linear-gradient(135deg, #F472B622, #EC489922)", accent:"#F472B6" },
  { bg:"linear-gradient(135deg, #34D39922, #10B98122)", accent:"#34D399" },
  { bg:"linear-gradient(135deg, #FB923C22, #F9731622)", accent:"#FB923C" },
];
