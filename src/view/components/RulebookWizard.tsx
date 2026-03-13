import { useState, useEffect } from "react";
import { NotationDisplay } from "./NotationDisplay";

interface Props {
    onClose: () => void;
}

// ----------------------------------------------------
// Sub-components for styling text inside the rulebook
// ----------------------------------------------------

function HeadingLevel1({ children }: { children: React.ReactNode }) {
    return <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8, color: "#fff", textTransform: "uppercase", letterSpacing: 1 }}>{children}</h1>;
}

function HeadingLevel2({ children }: { children: React.ReactNode }) {
    return <h2 style={{ fontSize: 24, fontWeight: 800, color: "#FF8C42", borderBottom: "2px solid rgba(255,140,66,0.3)", paddingBottom: 6, marginBottom: 16 }}>{children}</h2>;
}

function HeadingLevel3({ children }: { children: React.ReactNode }) {
    return <h3 style={{ fontSize: 20, fontWeight: 700, color: "#4ADE80", marginBottom: 12 }}>{children}</h3>;
}

function Paragraph({ children, italic = false, style }: { children: React.ReactNode; italic?: boolean; style?: React.CSSProperties }) {
    return <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.85)", marginBottom: 16, fontStyle: italic ? "italic" : "normal", ...style }}>{children}</p>;
}

function ArtPlaceholder({ text, imageSrc }: { text: string; imageSrc?: string }) {
    const [imgError, setImgError] = useState(false);

    if (imageSrc && !imgError)
    {
        return (
            <div style={{ width: "100%", margin: "16px 0", borderRadius: 12, overflow: "hidden" }}>
                <img
                    src={imageSrc}
                    alt={text}
                    onError={() => setImgError(true)}
                    style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }}
                />
            </div>
        );
    }

    return (
        <div style={{
            width: "100%", padding: "24px 16px", margin: "16px 0",
            background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.06) 10px, rgba(255,255,255,0.06) 20px)",
            border: "2px dashed rgba(255,255,255,0.3)", borderRadius: 12,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            textAlign: "center", gap: 8
        }}>
            <span style={{ fontSize: 24 }}>🖼️</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600, maxWidth: "80%" }}>{text}</span>
        </div>
    );
}

function ExampleBlock({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ background: "rgba(0,0,0,0.2)", borderLeft: "4px solid #0A84FF", padding: "12px 16px", borderRadius: "0 8px 8px 0", margin: "16px 0" }}>
            {children}
        </div>
    );
}

// ----------------------------------------------------
// The Wizard Slides
// ----------------------------------------------------

const SLIDES = [
    // SLIDE 0: Intro
    (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <HeadingLevel1>Mise en Place</HeadingLevel1>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", padding: "6px 12px", borderRadius: 20, fontSize: 14, fontWeight: 600, color: "#aaa", alignSelf: "flex-start", marginBottom: 16 }}>
                2–4 players | 15–30 minutes | Ages 5+
            </div>
            <Paragraph>
                You and your friends are a kitchen crew. Customers walk in, sit down, and order food. Your job is to build their dishes using a regular deck of playing cards and serve them before their patience runs out. You're all working together — nobody wins or loses alone.
            </Paragraph>
            <Paragraph>
                The app sends customers with ticking timers. The cards on the table are your ingredients. Flip them, remember them, stack them into dishes, and serve before time's up. Too many walkouts and the shift is over.
            </Paragraph>
            <Paragraph italic>
                Fair warning — this game involves physical chaos. You'll be counting out loud, pressing your hand flat on cards, karate-chopping stacks, shuffling under pressure, and yelling across the table. It gets loud. That's the point.
            </Paragraph>

            <HeadingLevel2>What you need</HeadingLevel2>
            <Paragraph>
                A standard 54-card deck — Ace through King, all four suits, plus two Jokers. A phone or tablet running the Mise en Place app. A table with enough room for everyone to reach the middle. That's it.
            </Paragraph>
        </div>
    ),

    // SLIDE 1: The Kitchen
    (
        <div>
            <HeadingLevel2>The kitchen — your play area</HeadingLevel2>
            <Paragraph>Before you start flipping cards, take a moment to understand the table. Every spot has a name and a job.</Paragraph>

            <ArtPlaceholder imageSrc="/rules/table_layout.png" text="IMAGE: TOP-DOWN DIAGRAM OF THE TABLE LAYOUT. Show 4 players around a table. Centre: 3x4 Pantry grid. Right: Deck. Bottom: 4 empty Prep spots. Corner: Trash. Top: App screen." />

            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12, fontSize: 16, lineHeight: 1.5, color: "rgba(255,255,255,0.85)" }}>
                <li><strong>The Pantry</strong> — a 3×4 grid of face-down cards in the middle of the table (12 cards). This is where you search for ingredients. Deal them from the deck at the start.</li>
                <li><strong>The Deck</strong> — the remaining cards in a face-down pile to the side. The two Jokers are shuffled in here.</li>
                <li><strong>Prep</strong> — four empty spots in front of the players. This is your work surface. You build dishes here by stacking cards.</li>
                <li><strong>Trash</strong> — an open discard area. Cards go here after a dish is served or when thrown away.</li>
                <li><strong>The App</strong> — one device where everyone can see it. Pick a difficulty and hit Start.</li>
            </ul>
        </div>
    ),

    // SLIDE 2: The App
    (
        <div>
            <HeadingLevel2>What the app does</HeadingLevel2>
            <Paragraph>
                The app sends customers to your restaurant. Up to six appear at a time. Each customer card has a timer running around its edge — when it runs out, that customer walks out angry. Too many walkouts and the shift is over. That's the only way you lose.
            </Paragraph>
            <Paragraph>
                Each customer card shows you what dish they want, written in symbols. Your job is to find the right cards on the table, build the dish, and tap the customer in the app to serve them.
            </Paragraph>
            <Paragraph>
                The app also has a recipe book — tap it any time to look up what any dish needs.
            </Paragraph>

            <ArtPlaceholder imageSrc="/rules/app_interface.png" text="IMAGE: SCREENSHOT OR MOCKUP OF THE APP INTERFACE. 4-5 customer cards showing symbol notation. One timer almost fully red/empty. Annotate: 'Customer order', 'Timer', 'Recipe book'." />
        </div>
    ),

    // SLIDE 3: Basic Loop - Search & Read
    (
        <div>
            <HeadingLevel2>How to play — the basics</HeadingLevel2>
            <Paragraph>This is the core of the game. A customer appears with an order. You find the right cards, build the dish, and serve it. Here's how.</Paragraph>

            <HeadingLevel3>Step 1 — Search the Pantry</HeadingLevel3>
            <Paragraph>Flip any face-down Pantry card to look at it. Then choose:</Paragraph>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8, fontSize: 16, color: "rgba(255,255,255,0.85)", marginBottom: 16 }}>
                <li><strong>It's useful</strong> — pick it up and place it onto a Prep spot. Or toss it to Trash if it's in the way.</li>
                <li><strong>Not useful yet</strong> — put it back face-down in the exact same spot. Remember what it was and where it is.</li>
            </ul>
            <ArtPlaceholder imageSrc="/rules/search_pantry.png" text="IMAGE: TWO-PANEL SEQUENCE. Panel 1: Hand flipping 6♥ in the 3x4 grid. Caption: 'That's red, I need this!'. Panel 2: Hand moving it towards a Prep spot." />

            <HeadingLevel3>Step 2 — Read the order</HeadingLevel3>
            <Paragraph>Every order is written in symbols. At the basic level, there are two types:</Paragraph>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: 12, borderRadius: 8 }}>
                    <div style={{ fontWeight: 700, marginBottom: 8, color: "#fff" }}>Colour</div>
                    <div style={{ fontSize: 14 }}>🔴 = Any red card (Heart/Diamond)<br />⬛ = Any black card (Spade/Club)</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: 12, borderRadius: 8 }}>
                    <div style={{ fontWeight: 700, marginBottom: 8, color: "#fff" }}>Suit</div>
                    <div style={{ fontSize: 14 }}>♥ = Heart<br />♦ = Diamond<br />♠ = Spade<br />♣ = Club</div>
                </div>
            </div>

            <ExampleBlock>
                <span style={{ fontWeight: 700, display: "block", marginBottom: 4 }}>Order: <NotationDisplay root={{ type: "group", oven: false, minSum: null, children: [{ type: "layer", element: "red" }, { type: "layer", element: "black" }, { type: "layer", element: "red" }] }} size="small" /></span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>You need one red card, one black card, and one more red card. The 5♥ is red. The 8♠ is black. The 3♦ is red. Done.</span>
            </ExampleBlock>
        </div>
    ),

    // SLIDE 4: Basic Loop - Build & Serve
    (
        <div>
            <HeadingLevel3>Step 3 — Build a stack on Prep</HeadingLevel3>
            <Paragraph>Once you have the right cards, place them one at a time onto a Prep spot to build a <strong>stack</strong>.</Paragraph>
            <Paragraph>
                <strong>Cards must go in order, left to right.</strong> The first symbol in the order is the bottom card, the last symbol is the top card. If the order is wrong, the dish is wrong.
            </Paragraph>
            <Paragraph style={{ color: "#FF453A", fontWeight: 600 }}>
                Critical rule: you cannot pull individual cards out of a stack. The whole stack moves together — to another Prep spot, to Trash, or to serve. If you made a mistake, the entire stack goes to Trash and you start over. Think before you put a card down.
            </Paragraph>

            <HeadingLevel3>Step 4 — Serve it</HeadingLevel3>
            <Paragraph>When a Prep stack matches everything the order asks for, pick it up, say <strong>"Served!"</strong>, and tap that customer in the app. The cards go to Trash.</Paragraph>
            <Paragraph>That's the whole loop: <strong>search → read → build → serve</strong>.</Paragraph>

            <ArtPlaceholder imageSrc="/rules/basic_loop.png" text="IMAGE: THE FULL BASIC LOOP. Flowchart of Search (flip card) -> Read (app order) -> Build (stacking cards) -> Serve (tapping phone)." />
        </div>
    ),

    // SLIDE 5: Advanced Mechanics - Royals & Bundles
    (
        <div>
            <HeadingLevel2>Advanced mechanics</HeadingLevel2>
            <Paragraph>The basic loop stays the same, but harder difficulty levels introduce new requirements.</Paragraph>

            <HeadingLevel3>Royals — face cards only</HeadingLevel3>
            <Paragraph>A Royal slot (♛) can only be filled by a <strong>Jack, Queen, or King</strong> of any suit. Face cards still belong to their suit too (a Queen♥ can fill a ♥ or a ♛ slot).</Paragraph>

            <HeadingLevel3>Bundles — cards that add up</HeadingLevel3>
            <Paragraph>Some dishes need several cards from the same category whose values <strong>add up</strong> to a minimum total. A bundle is written like this: <span style={{ display: "inline-block" }}><NotationDisplay root={{ type: "group", oven: false, minSum: 10, children: [{ type: "layer", element: "spades" }] }} size="small" /></span></Paragraph>

            <div style={{ background: "rgba(255,255,255,0.05)", padding: 12, borderRadius: 8, marginBottom: 16 }}>
                <table style={{ width: "100%", fontSize: 14 }}>
                    <tbody>
                        <tr><td style={{ padding: 4 }}><strong>Ace</strong></td><td>1</td></tr>
                        <tr><td style={{ padding: 4 }}><strong>2 through 10</strong></td><td>Face value</td></tr>
                        <tr><td style={{ padding: 4, color: "#FF8C42" }}><strong>Jack, Queen, King</strong></td><td style={{ color: "#FF8C42" }}><strong>1 each</strong></td></tr>
                    </tbody>
                </table>
            </div>

            <Paragraph>This is important — <strong>face cards are worth 1 in bundles</strong>. They're powerful for Royal slots but weak for adding up. Use as many cards as you need to hit the total into the same stack.</Paragraph>

            <ExampleBlock>
                <span style={{ fontWeight: 700, display: "block", marginBottom: 4 }}>Order: <NotationDisplay root={{ type: "group", oven: false, minSum: null, children: [{ type: "group", oven: false, minSum: 10, children: [{ type: "layer", element: "red" }] }, { type: "layer", element: "black" }] }} size="small" /></span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>Red cards adding up to 10+, then any black card alongside. The 6♥ and 5♦ together make 11. Both red, both count.</span>
            </ExampleBlock>
        </div>
    ),

    // SLIDE 6: Advanced Mechanics - Oven & Chopping
    (
        <div>
            <HeadingLevel2>Advanced mechanics (That happen later)</HeadingLevel2>

            <HeadingLevel3>The Oven — cooking with 🔥</HeadingLevel3>
            <Paragraph>Some orders show a 🔥. That stack must be <strong>cooked</strong> before serving.</Paragraph>
            <Paragraph><strong>To cook:</strong> place your <strong>open hand flat on top of the stack</strong> and <strong>count to 20 out loud</strong>. Your hand stays down. If it lifts before 20, restart from zero. Reach 20? <strong>Flip the stack face-down</strong>. Cooked twice? Burnt. Trash it.</Paragraph>
            <ArtPlaceholder imageSrc="/rules/oven_cooking.png" text="IMAGE: A PLAYER COOKING. Hand pressed flat on a stack. Mouth open counting '...17, 18...' Other players frantic." />

            <HeadingLevel3>The Knife — chopping with 🔪</HeadingLevel3>
            <Paragraph>Some orders show a 🔪. That stack must be <strong>chopped</strong> before serving.</Paragraph>
            <Paragraph><strong>To chop:</strong> strike the <strong>side of your hand onto the stack 10 times</strong> while counting out loud. Deliberate hits, no tapping. Reach 10? <strong>Rotate the stack sideways</strong>. Lose count? Restart.</Paragraph>
            <ExampleBlock>
                <span style={{ fontSize: 14, fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}>"Someone chop these Spades!" You lean over — side of hand — 1, 2, 3 — a customer timer flashes — 4, 5, 6 — 7, 8, 9, 10. Rotate sideways. Done.</span>
            </ExampleBlock>
            <ArtPlaceholder imageSrc="/rules/knife_chopping.png" text="IMAGE: A PLAYER CHOPPING. Karate-chop style hits onto a deck. Motion blur. Counting out loud." />
        </div>
    ),

    // SLIDE 7: The Joker
    (
        <div>
            <HeadingLevel2>The Health Inspector</HeadingLevel2>
            <Paragraph>The two Jokers in the deck are Health Inspectors.</Paragraph>
            <Paragraph>A player who reveals one must stop what they're doing and <strong>take out the trash</strong> — shuffle the Deck, the Joker, and the Trash pile together while counting to 10 out loud.</Paragraph>
            <Paragraph>When they're done, the combined pile becomes the new Deck and they continue playing normally. The Pantry slot stays empty.</Paragraph>
            <Paragraph style={{ color: "#FF453A", fontWeight: 600 }}>
                Meanwhile, customer timers keep ticking and nobody else stops. You're down a pair of hands at the worst possible time.
            </Paragraph>

            <ArtPlaceholder imageSrc="/rules/health_inspector.png" text="IMAGE: HEALTH INSPECTOR. One player standing back shuffling frantically, counting. The other players are visibly stressed, pointing at red timers." />
        </div>
    ),

    // SLIDE 8: Housekeeping
    (
        <div>
            <HeadingLevel2>Housekeeping rules</HeadingLevel2>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12, fontSize: 16, color: "rgba(255,255,255,0.85)", marginBottom: 24 }}>
                <li><strong>Refilling the Pantry</strong> — empty slots don't refill on their own. Anyone can take the top card of the Deck and place it face-down into an empty slot.</li>
                <li><strong>Trashing from the Pantry</strong> — if you flip a useless card, you can send it straight to Trash instead of putting it back. The slot stays empty.</li>
                <li><strong>Stacks cannot be split</strong> — individual cards cannot be pulled out of a stack. The whole stack moves as one unit. The most common mistake!</li>
            </ul>

            <HeadingLevel2>The most important rule</HeadingLevel2>
            <Paragraph style={{ fontSize: 24, fontWeight: 800, color: "#4ADE80", textAlign: "center", margin: "24px 0" }}>Talk. Constantly.</Paragraph>
            <Paragraph>Call out what you flip. Announce what you need. Warn people about timers. Shout when something's in the oven. Ask for help chopping. Tell your teammate where you saw that King of Spades three turns ago.</Paragraph>
            <Paragraph>The game is won or lost by communication, not card skill. A quiet table is a losing table.</Paragraph>

            <ArtPlaceholder imageSrc="/rules/communication.png" text="IMAGE: COMMUNICATION. 4 players shouting commands: 'Need a red card!', 'Cooking!', 'Timer table 3!'. Energetic, fun." />
        </div>
    ),
];

export function RulebookWizard({ onClose }: Props) {
    const [slide, setSlide] = useState(0);

    // Esc to close
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const canPrev = slide > 0;
    const canNext = slide < SLIDES.length - 1;

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 16
        }}>
            <div style={{
                background: "#1E2028", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)",
                width: "100%", maxWidth: 640, height: "85vh", display: "flex", flexDirection: "column",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)", overflow: "hidden"
            }}>

                {/* Header */}
                <div style={{
                    padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "rgba(0,0,0,0.2)"
                }}>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
                        How to Play <span style={{ color: "#FF8C42" }}>({slide + 1}/{SLIDES.length})</span>
                    </div>
                    <button onClick={onClose} style={{
                        background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 24, cursor: "pointer", padding: "0 8px", lineHeight: 1
                    }}>×</button>
                </div>

                {/* Content Body */}
                <div style={{
                    flex: 1, overflowY: "auto", padding: "32px 32px 16px 32px"
                }}>
                    {SLIDES[slide]}
                </div>

                {/* Footer Navigation */}
                <div style={{
                    padding: 24, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)",
                    display: "flex", justifyContent: "space-between", gap: 12, background: "rgba(0,0,0,0.2)"
                }}>
                    <button
                        onClick={() => canPrev && setSlide(s => s - 1)}
                        disabled={!canPrev}
                        style={{
                            flex: 1, padding: 16, borderRadius: 12, border: "1px solid transparent",
                            background: canPrev ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
                            color: canPrev ? "#fff" : "rgba(255,255,255,0.2)",
                            fontSize: 16, fontWeight: 700, cursor: canPrev ? "pointer" : "default",
                            transition: "0.15s ease"
                        }}
                    >
                        ← Previous
                    </button>

                    <button
                        onClick={() => {
                            if (canNext) setSlide(s => s + 1);
                            else onClose();
                        }}
                        style={{
                            flex: 1, padding: 16, borderRadius: 12, border: "none",
                            background: canNext ? "#0A84FF" : "#4ADE80",
                            color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer",
                            boxShadow: canNext ? "0 4px 12px rgba(10,132,255,0.3)" : "0 4px 12px rgba(74,222,128,0.3)",
                            transition: "0.15s ease"
                        }}
                    >
                        {canNext ? "Next →" : "Got it!"}
                    </button>
                </div>
            </div>
        </div>
    );
}
