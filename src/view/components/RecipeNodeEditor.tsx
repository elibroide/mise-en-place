import type { RecipeNode } from "../../model/types";
import { SUIT_CONFIG } from "../../model/data/theme";

interface Props {
  node: RecipeNode;
  onUpdate: (updated: RecipeNode) => void;
  onDelete: () => void;
}

export function RecipeNodeEditor({ node, onUpdate, onDelete }: Props) {
  if (node.type === "layer")
  {
    return (
      <div style={{
        background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 12,
        border: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
      }}>
        <select
          value={node.element || "any"}
          onChange={(e) => onUpdate({ ...node, element: e.target.value as any })}
          style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", borderRadius: 6, padding: "6px 8px", fontSize: 12,
          }}
        >
          <option value="any">-- Any --</option>
          <option value="red">Red</option>
          <option value="black">Black</option>
          <option value="royal">Royal</option>
          {Object.keys(SUIT_CONFIG).map((s) => (
            <option key={s} value={s}>{SUIT_CONFIG[s as keyof typeof SUIT_CONFIG].name}</option>
          ))}
        </select>



        <button onClick={onDelete} style={{
          background: "rgba(255,75,110,0.1)", border: "1px solid rgba(255,75,110,0.2)",
          borderRadius: 6, color: "#FF4B6E", padding: "6px 8px", fontSize: 11, fontWeight: 600,
          cursor: "pointer", marginLeft: "auto", WebkitTapHighlightColor: "transparent",
        }}>Delete</button>
      </div>
    );
  }

  if (node.type === "group")
  {
    return (
      <div style={{
        background: node.oven ? "rgba(255,140,66,0.08)" : "rgba(255,255,255,0.04)",
        borderRadius: 10, padding: 12,
        border: node.oven ? "1px solid rgba(255,140,66,0.2)" : "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap", rowGap: 12 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
            {node.oven ? "🔥 Oven" : node.chopping ? "🔪 Chopping" : "Group"}
          </label>
          <input
            type="checkbox" checked={node.oven}
            onChange={(e) => onUpdate({ ...node, oven: e.target.checked })}
            style={{ marginLeft: 8 }}
          />

          <label style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginLeft: 8 }}>
            🔪 Chop
          </label>
          <input
            type="checkbox" checked={node.chopping || false}
            onChange={(e) => onUpdate({ ...node, chopping: e.target.checked })}
            style={{ marginLeft: 4 }}
          />

          <input
            type="number" min="0" placeholder="Min Sum (e.g. 5)"
            value={node.minSum || ""}
            onChange={(e) => onUpdate({ ...node, minSum: e.target.value ? parseInt(e.target.value) : null })}
            style={{
              width: 120, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff", borderRadius: 6, padding: "4px 8px", fontSize: 11, marginLeft: 16
            }}
          />

          <button onClick={onDelete} style={{
            background: "rgba(255,75,110,0.1)", border: "1px solid rgba(255,75,110,0.2)",
            borderRadius: 6, color: "#FF4B6E", padding: "4px 8px", fontSize: 10, fontWeight: 600,
            cursor: "pointer", WebkitTapHighlightColor: "transparent", marginLeft: "auto"
          }}>Delete</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 8 }}>
          {(node.children || []).map((child, idx) => (
            <RecipeNodeEditor
              key={idx}
              node={child}
              onUpdate={(updated) => {
                const newChildren = [...node.children];
                newChildren[idx] = updated;
                onUpdate({ ...node, children: newChildren });
              }}
              onDelete={() => {
                const newChildren = node.children.filter((_, i) => i !== idx);
                onUpdate({ ...node, children: newChildren });
              }}
            />
          ))}
          <button
            onClick={() => {
              const newChildren = [...(node.children || []), { type: "layer" as const, element: "clubs" as const }];
              onUpdate({ ...node, children: newChildren });
            }}
            style={{
              padding: "6px 10px", borderRadius: 8,
              background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
              color: "#4ADE80", fontSize: 11, fontWeight: 600,
              cursor: "pointer", WebkitTapHighlightColor: "transparent",
            }}
          >+ Add Layer inside group</button>
        </div>
      </div>
    );
  }

  return null;
}
