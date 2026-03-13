/** Global CSS keyframes and styles, injected via <style> tag in the root component */
export const GLOBAL_STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { overflow-x: hidden; }

  @keyframes customer-enter {
    0% { opacity:0; transform:translateY(40px) scale(0.85) rotate(-2deg); }
    60% { transform:translateY(-6px) scale(1.03) rotate(0.5deg); }
    100% { opacity:1; transform:translateY(0) scale(1) rotate(0deg); }
  }

  @keyframes urgent-pulse {
    0%, 100% { box-shadow: 0 0 10px rgba(255,75,110,0.2); }
    50% { box-shadow: 0 0 30px rgba(255,75,110,0.5), inset 0 0 10px rgba(255,75,110,0.1); }
  }

  @keyframes timer-throb {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }

  @keyframes glow-pulse {
    0%, 100% { filter:brightness(1); }
    50% { filter:brightness(1.4); }
  }

  @keyframes slide-up {
    0% { transform:translateY(100%); }
    100% { transform:translateY(0); }
  }

  @keyframes modal-pop {
    0% { opacity:0; transform:scale(0.8); }
    50% { transform:scale(1.03); }
    100% { opacity:1; transform:scale(1); }
  }

  @keyframes fade-in {
    0% { opacity:0; }
    100% { opacity:1; }
  }

  @keyframes stagger-in {
    0% { opacity:0; transform:translateY(16px); }
    100% { opacity:1; transform:translateY(0); }
  }

  @keyframes expand-in {
    0% { opacity:0; max-height:0; }
    100% { opacity:1; max-height:600px; }
  }

  @keyframes urgent-flash {
    0% { opacity:0; }
    100% { opacity:1; }
  }

  @keyframes particle-fly {
    0% { opacity:1; transform:translate(0,0) scale(1); }
    100% { opacity:0; transform:translate(var(--tx),var(--ty)) scale(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  button, div[onclick] {
    -webkit-tap-highlight-color: transparent;
  }

  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:2px; }

  button:active {
    transform: scale(0.97) !important;
    filter: brightness(0.9);
  }
`;
