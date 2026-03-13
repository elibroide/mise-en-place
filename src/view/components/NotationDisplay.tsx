import React from "react";
import type { RecipeNode, GroupNode } from "../../model/types";
import { SUIT_CONFIG } from "../../model/data/theme";

interface Props {
  root: GroupNode | null;
  size?: "small" | "normal" | "large";
}

const SIZES = {
  large: { suit: 32, num: 18, gap: 6, pad: "8px 12px" },
  normal: { suit: 26, num: 15, gap: 5, pad: "5px 9px" },
  small: { suit: 18, num: 11, gap: 3, pad: "3px 5px" },
};

function renderLayer(layer: RecipeNode & { type: "layer" }, key: string | number, sz: typeof SIZES.normal) {
  if (layer.element === "clubs" || layer.element === "diamonds" || layer.element === "hearts" || layer.element === "spades")
  {
    const sc = SUIT_CONFIG[layer.element];

    return (
      <span key={key} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: sc.bg, borderRadius: 8, padding: sz.pad, margin: 1, border: `2px solid ${sc.color}44` }}>
        <span style={{ fontSize: sz.suit, color: sc.color, lineHeight: 1, filter: `drop-shadow(0 0 4px ${sc.color}66)` }}>{sc.symbol}</span>
      </span>
    );
  }

  if (layer.element === "red" || layer.element === "black")
  {
    const colorConf = layer.element === "red"
      ? { dot: "#FF2D55", bg: "rgba(255,45,85,0.15)", border: "rgba(255,45,85,0.5)" }
      : { dot: "#0A84FF", bg: "rgba(10,132,255,0.15)", border: "rgba(10,132,255,0.5)" };

    const visual = (
      <span style={{
        display: "inline-block", width: sz.suit * 0.55, height: sz.suit * 0.55,
        borderRadius: "50%", background: colorConf.dot, flexShrink: 0,
        boxShadow: `0 0 6px ${colorConf.dot}`,
      }} />
    );

    return (
      <span key={key} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: colorConf.bg, borderRadius: 8, padding: sz.pad, margin: 1, border: `2px solid ${colorConf.border}` }}>
        {visual}
      </span>
    );
  }

  if (layer.element === "royal")
  {
    const anyRoyalIcon = <span style={{ fontSize: sz.suit * 0.7, color: "#fff", textShadow: "0 0 4px rgba(255,215,0,0.8)" }}>♛</span>;
    return (
      <span key={key} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "rgba(255,215,0,0.15)", borderRadius: 8, padding: sz.pad, margin: 1, border: "2px solid rgba(255,215,0,0.4)" }}>
        {anyRoyalIcon}
      </span>
    );
  }

  // No suit, no color, no royal — "any card"
  return (
    <span key={key} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: sz.pad, margin: 1, border: "2px solid rgba(255,255,255,0.15)" }}>
      <span style={{ fontSize: Math.max(sz.suit - 4, 12), color: "rgba(255,255,255,0.4)", fontWeight: 700, lineHeight: 1 }}>★</span>
    </span>
  );
}

function renderNode(node: RecipeNode, key: string | number, sz: typeof SIZES.normal): React.ReactNode {
  if (node.type === "layer") return renderLayer(node, key, sz);
  if (node.type === "group")
  {
    let content = <>{node.children.map((c, i) => renderNode(c, `${key}-${i}`, sz))}</>;

    if (node.minSum)
    {
      content = (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 4, margin: 1, border: "2px dashed rgba(255,255,255,0.4)" }}>
          <span style={{ fontSize: sz.num, color: "#ffffffdd", fontWeight: 800, paddingLeft: 2 }}>{node.minSum}+</span>
          {content}
        </span>
      );
    }

    if (node.chopping)
    {
      content = (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "rgba(74,222,128,0.12)", borderRadius: node.minSum ? 12 : 10, padding: node.minSum ? 5 : "3px 6px", border: "2px solid rgba(74,222,128,0.5)", margin: 1, boxShadow: "0 0 8px rgba(74,222,128,0.15)" }}>
          <span style={{ fontSize: sz.num, margin: "0 -2px", marginRight: 2, fontWeight: 700 }}>🔪</span>
          {content}
        </span>
      );
    }

    if (node.oven)
    {
      content = (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "rgba(255,140,66,0.12)", borderRadius: (node.minSum || node.chopping) ? 14 : 10, padding: (node.minSum || node.chopping) ? 5 : "3px 6px", border: "2px solid rgba(255,140,66,0.5)", margin: 1, boxShadow: "0 0 8px rgba(255,140,66,0.15)" }}>
          <span style={{ fontSize: sz.num, color: "#FF8C42", marginRight: 2, fontWeight: 700 }}>🔥</span>
          {content}
        </span>
      );
    }

    // Must wrap with key if we created a wrapper, otherwise fragments handle themselves.
    // If it's a raw fragment, we return it as-is. If we wrapped it, we need to apply the key.
    if (node.minSum || node.oven || node.chopping)
    {
      return React.cloneElement(content as React.ReactElement, { key });
    }

    return content;
  }
  return null;
}

export function NotationDisplay({ root, size = "normal" }: Props) {
  const sz = SIZES[size];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: sz.gap, justifyContent: "center" }}>
      {root && root.children ? root.children.map((c, i) => renderNode(c, i, sz)) : null}
    </div>
  );
}
