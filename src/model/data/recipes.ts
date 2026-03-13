import type { Recipe } from "../types";

export const RECIPES: Recipe[] = [
  // ---------------------------------------------------------
  // LEVEL 1-3: COLORS
  // ---------------------------------------------------------
  { id:101, name:"Simple Pair", description:"A red and a black layer.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"red"},{type:"layer",element:"black"}] } },
  { id:102, name:"The Trio", description:"Black, red, black.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"black"},{type:"layer",element:"red"},{type:"layer",element:"black"}] } },
  { id:103, name:"Red Stack", description:"Three red layers.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"red"},{type:"layer",element:"red"},{type:"layer",element:"red"}] } },
  { id:104, name:"Checkered", description:"Red, black, red, black.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"red"},{type:"layer",element:"black"},{type:"layer",element:"red"},{type:"layer",element:"black"}] } },
  { id:105, name:"Dark Foundation", description:"Two blacks, a red, and a black.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"black"},{type:"layer",element:"black"},{type:"layer",element:"red"},{type:"layer",element:"black"}] } },
  { id:106, name:"Tall Checkers", description:"Red, black, red, black, red.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"red"},{type:"layer",element:"black"},{type:"layer",element:"red"},{type:"layer",element:"black"},{type:"layer",element:"red"}] } },
  { id:107, name:"Red Wild", description:"Four consecutive red layers.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"red"},{type:"layer",element:"red"},{type:"layer",element:"red"},{type:"layer",element:"red"}] } },

  // ---------------------------------------------------------
  // LEVEL 4-6: SUITS
  // ---------------------------------------------------------
  { id:201, name:"Heart & Spade", description:"Hearts and Spades.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"hearts"},{type:"layer",element:"spades"}] } },
  { id:202, name:"Diamond Sandwich", description:"Diamonds, Clubs, Diamonds.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"diamonds"},{type:"layer",element:"clubs"},{type:"layer",element:"diamonds"}] } },
  { id:203, name:"Spade Pair", description:"Two Spades and a Heart.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"spades"},{type:"layer",element:"spades"},{type:"layer",element:"hearts"}] } },
  { id:204, name:"Four Suits", description:"All four suits.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"clubs"},{type:"layer",element:"diamonds"},{type:"layer",element:"hearts"},{type:"layer",element:"spades"}] } },
  { id:205, name:"Heart Heavy", description:"Hearts, Clubs, Diamonds, Hearts.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"hearts"},{type:"layer",element:"clubs"},{type:"layer",element:"diamonds"},{type:"layer",element:"hearts"}] } },
  { id:206, name:"Spade Heavy", description:"Spades, Diamonds, Spades, Clubs.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"spades"},{type:"layer",element:"diamonds"},{type:"layer",element:"spades"},{type:"layer",element:"clubs"}] } },
  { id:207, name:"Royal Club", description:"Clubs, Hearts, Spades, Diamonds, Clubs.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"clubs"},{type:"layer",element:"hearts"},{type:"layer",element:"spades"},{type:"layer",element:"diamonds"},{type:"layer",element:"clubs"}] } },
  { id:208, name:"Royal Heart", description:"Hearts, Spades, Diamonds, Clubs, Hearts.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"hearts"},{type:"layer",element:"spades"},{type:"layer",element:"diamonds"},{type:"layer",element:"clubs"},{type:"layer",element:"hearts"}] } },

  // ---------------------------------------------------------
  // LEVEL 7-8: ROYALS
  // ---------------------------------------------------------
  { id:301, name:"Royal Top", description:"Black base, Royal top.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"black"},{type:"layer",element:"royal"}] } },
  { id:302, name:"Black Crown", description:"Red base, Royal top.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"red"},{type:"layer",element:"royal"}] } },
  { id:303, name:"Royal Sandwich", description:"Royal, Black, Royal.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"royal"},{type:"layer",element:"black"},{type:"layer",element:"royal"}] } },
  { id:304, name:"Crown Jewels", description:"Royal, Red, Black, Royal.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"royal"},{type:"layer",element:"red"},{type:"layer",element:"black"},{type:"layer",element:"royal"}] } },

  // ---------------------------------------------------------
  // LEVEL 9: SUITED ROYALS
  // ---------------------------------------------------------
  { id:311, name:"The Guard", description:"Spades, Royal, Spades.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"spades"},{type:"layer",element:"royal"},{type:"layer",element:"spades"}] } },
  { id:312, name:"Diamond Crown", description:"Diamonds, Royal, Diamonds.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"diamonds"},{type:"layer",element:"royal"},{type:"layer",element:"diamonds"}] } },
  { id:313, name:"Club Sandwich", description:"Clubs, Royal, Hearts.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"clubs"},{type:"layer",element:"royal"},{type:"layer",element:"hearts"}] } },
  { id:314, name:"The Royal Banquet", description:"A massive 7-layer feast of Royals and Suits.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"spades"},{type:"layer",element:"royal"},{type:"layer",element:"hearts"},{type:"layer",element:"clubs"},{type:"layer",element:"royal"},{type:"layer",element:"diamonds"},{type:"layer",element:"royal"}] } },

  // ---------------------------------------------------------
  // LEVEL 9-11: SUMS
  // ---------------------------------------------------------
  { id:401, name:"Red Base", description:"Red sum 5+, then black.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,minSum:5,children:[{type:"layer",element:"red"}]},{type:"layer",element:"black"}] } },
  { id:402, name:"Black Center", description:"Red, Black sum 5+, Red.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"red"},{type:"group",oven:false,minSum:5,children:[{type:"layer",element:"black"}]},{type:"layer",element:"red"}] } },
  { id:403, name:"Heavy Hearts", description:"Hearts sum 5+, Spades, Diamonds.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,minSum:5,children:[{type:"layer",element:"hearts"}]},{type:"layer",element:"spades"},{type:"layer",element:"diamonds"}] } },
  { id:404, name:"Spade Sandwich", description:"Clubs, Spades sum 5+, Clubs.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"clubs"},{type:"group",oven:false,minSum:5,children:[{type:"layer",element:"spades"}]},{type:"layer",element:"clubs"}] } },
  { id:405, name:"Fat Stack", description:"Massive red bundle 7+, Black, Red.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,minSum:7,children:[{type:"layer",element:"red"}]},{type:"layer",element:"black"},{type:"layer",element:"red"}] } },
  { id:406, name:"Big Bundle", description:"Black sum 10+, Red, Black.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,minSum:10,children:[{type:"layer",element:"black"}]},{type:"layer",element:"red"},{type:"layer",element:"black"}] } },
  { id:407, name:"Twin Peaks", description:"Hearts sum 5+ and Spades sum 5+.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,minSum:5,children:[{type:"layer",element:"hearts"}]},{type:"group",oven:false,minSum:5,children:[{type:"layer",element:"spades"}]}] } },
  { id:408, name:"Royal Guard", description:"Diamonds 7+, Clubs 7+, Hearts 7+.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,minSum:7,children:[{type:"layer",element:"diamonds"}]},{type:"group",oven:false,minSum:7,children:[{type:"layer",element:"clubs"}]},{type:"group",oven:false,minSum:7,children:[{type:"layer",element:"hearts"}]}] } },
  { id:409, name:"Ace High", description:"Spades sum 10+, then Hearts.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,minSum:10,children:[{type:"layer",element:"spades"}]},{type:"layer",element:"hearts"}] } },
  { id:410, name:"Queen of Hearts", description:"Massive Hearts sum 12+.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,minSum:12,children:[{type:"layer",element:"hearts"}]}] } },

  // ---------------------------------------------------------
  // LEVEL 12: SUMS WITH ROYALS AND SUITS
  // ---------------------------------------------------------
  { id:501, name:"The King's Ransom", description:"Spades sum 7+ & Royal.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,minSum:7,children:[{type:"layer",element:"spades"}]},{type:"layer",element:"royal"},{type:"layer",element:"hearts"}] } },
  { id:502, name:"Diamond Hoard", description:"Royal, Spades, then Diamonds 10+.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"royal"},{type:"layer",element:"spades"},{type:"group",oven:false,minSum:10,children:[{type:"layer",element:"diamonds"}]}] } },

  // ---------------------------------------------------------
  // LEVEL 13-17: OVENS & MASTERY
  // ---------------------------------------------------------
  { id:601, name:"Baked Pair", description:"Baked red and black.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:true,minSum:null,children:[{type:"layer",element:"red"},{type:"layer",element:"black"}]}] } },
  { id:602, name:"Baked Royal", description:"Baked royal and black.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:true,minSum:null,children:[{type:"layer",element:"royal"},{type:"layer",element:"black"}]}] } },
  { id:603, name:"Baked & Chopped", description:"Baked hearts, chopped spades, royal.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:true,minSum:null,children:[{type:"layer",element:"hearts"}]},{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"spades"}]},{type:"layer",element:"royal"}] } },
  { id:604, name:"The Casserole", description:"Baked spades, chopped hearts 7+, royal.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:true,minSum:null,children:[{type:"layer",element:"spades"},{type:"group",oven:false,chopping:true,minSum:7,children:[{type:"layer",element:"hearts"}]},{type:"layer",element:"royal"}]}] } },
  { id:605, name:"Hot, Cold & Chopped", description:"Baked pair, chopped royal, fresh black.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:true,minSum:null,children:[{type:"layer",element:"red"},{type:"layer",element:"black"}]},{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"royal"}]},{type:"layer",element:"black"}] } },
  { id:606, name:"THE MONSTER", description:"The ultimate test. Parallelize your baking and chopping.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[
      {type:"group",oven:true,minSum:null,children:[
        {type:"layer",element:"diamonds"},
        {type:"layer",element:"diamonds"},
        {type:"layer",element:"hearts"},
        {type:"layer",element:"hearts"}
      ]},
      {type:"group",oven:false,chopping:true,minSum:null,children:[
        {type:"group",oven:false,minSum:7,children:[{type:"layer",element:"clubs"}]},
        {type:"layer",element:"royal"}
      ]},
      {type:"layer",element:"spades"}
    ] } },

  // ---------------------------------------------------------
  // CHOPPING LEVELS (NEW) - 800 Block
  // ---------------------------------------------------------
  // BASICS
  { id:801, name:"Chopped Pair", description:"A chopped pair of red and black.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"red"},{type:"layer",element:"black"}]}] } },
  { id:802, name:"Prep Work", description:"An unchopped red, followed by a chopped black.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"red"},{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"black"}]}] } },
  { id:803, name:"Chopped Trio", description:"Red, chopped black, red.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"red"},{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"black"}]},{type:"layer",element:"red"}] } },
  
  // INTERMEDIATE (Suit Slicing)
  { id:804, name:"Chopped Spades", description:"Spades chopped.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"spades"}]}] } },
  { id:805, name:"Mixed Salad", description:"Hearts and Spades chopped together.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"hearts"},{type:"layer",element:"spades"}]}] } },
  { id:806, name:"Royal Execution", description:"Royal and Clubs chopped together.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"royal"},{type:"layer",element:"clubs"}]}] } },
  { id:807, name:"Suit Medley", description:"Diamonds, chopped Hearts and Clubs.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"diamonds"},{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"hearts"},{type:"layer",element:"clubs"}]}] } },
  { id:808, name:"Heart Breaker", description:"Hearts, chopped Hearts + Hearts.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"hearts"},{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"hearts"},{type:"layer",element:"hearts"}]}] } },

  // COMPLEX (Shared Prep & Lengths)
  { id:809, name:"The Dark Roast", description:"Hearts, the Shared Bundle (Spades & Clubs), Royal, Hearts.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"hearts"},{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"spades"},{type:"layer",element:"clubs"}]},{type:"layer",element:"royal"},{type:"layer",element:"hearts"}] } },
  { id:810, name:"Royal Shadow", description:"Royal, the Shared Bundle, Diamonds, Royal.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"royal"},{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"spades"},{type:"layer",element:"clubs"}]},{type:"layer",element:"diamonds"},{type:"layer",element:"royal"}] } },
  { id:811, name:"Twin Shadows", description:"The Shared Bundle, Hearts, the Shared Bundle.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"spades"},{type:"layer",element:"clubs"}]},{type:"layer",element:"hearts"},{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"spades"},{type:"layer",element:"clubs"}]}] } },
  { id:812, name:"False Shadow", description:"Diamonds, chopped Spades & Diamonds, Hearts, Clubs (A trick bundle).", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"diamonds"},{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"spades"},{type:"layer",element:"diamonds"}]},{type:"layer",element:"hearts"},{type:"layer",element:"clubs"}] } },
  { id:813, name:"The True Shadow", description:"Royal, Diamonds, the Shared Bundle, Royal, Hearts.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"royal"},{type:"layer",element:"diamonds"},{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"spades"},{type:"layer",element:"clubs"}]},{type:"layer",element:"royal"},{type:"layer",element:"hearts"}] } },

  // GIMMICK (The Prep Master)
  { id:814, name:"The Executioner", description:"Chopped Royal, Spades 7+, Hearts.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"royal"},{type:"group",oven:false,minSum:7,children:[{type:"layer",element:"spades"}]},{type:"layer",element:"hearts"}]}] } },
  { id:815, name:"Surgical Dice", description:"Chopped Spades and Clubs 10+.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,chopping:true,minSum:10,children:[{type:"layer",element:"spades"},{type:"layer",element:"clubs"}]}] } },
  { id:816, name:"Chopped Sandwich", description:"Red, chopped Black 5+ & Royal, Red.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"red"},{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"group",oven:false,minSum:5,children:[{type:"layer",element:"black"}]},{type:"layer",element:"royal"}]},{type:"layer",element:"red"}] } },
  { id:817, name:"The Guillotine", description:"All 4 Suits chopped together in one massive cut.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,chopping:true,minSum:null,children:[{type:"layer",element:"spades"},{type:"layer",element:"hearts"},{type:"layer",element:"diamonds"},{type:"layer",element:"clubs"}]}] } },

  // ---------------------------------------------------------
  // THEME LEVELS (NEW)
  // ---------------------------------------------------------
  { id:701, name:"Baked Heart Trio", description:"Baked grouping of 3 Heart layers.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:true,minSum:null,children:[{type:"layer",element:"hearts"},{type:"layer",element:"hearts"},{type:"layer",element:"hearts"}]}] } },
  { id:702, name:"Heart Oven Sandwich", description:"Clubs, Baked Hearts, then Clubs.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"clubs"},{type:"group",oven:true,minSum:null,children:[{type:"layer",element:"hearts"},{type:"layer",element:"hearts"},{type:"layer",element:"hearts"}]},{type:"layer",element:"clubs"}] } },
  { id:703, name:"Dark Suits", description:"Spades and Clubs with 5+ sum.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,minSum:5,children:[{type:"layer",element:"spades"}]},{type:"layer",element:"clubs"}] } },
  { id:704, name:"The Spades High", description:"Spades sum 10+, nothing else.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:false,minSum:10,children:[{type:"layer",element:"spades"}]}] } },
  { id:705, name:"Black & Red Mix", description:"Spades, Clubs, Hearts without Diamonds.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"layer",element:"spades"},{type:"layer",element:"clubs"},{type:"layer",element:"hearts"}] } },
  { id:706, name:"Baked Ace of Hearts", description:"Massive baked 12+ Hearts.", order:"any",
    root:{ type:"group", oven:false, minSum:null, children:[{type:"group",oven:true,minSum:12,children:[{type:"layer",element:"hearts"}]}] } }
];
