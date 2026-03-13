import { useState } from "react";
import type { Recipe } from "../../model/types";
import { NotationDisplay } from "./NotationDisplay";

interface Props {
  open: boolean;
  onClose: () => void;
  recipes: Recipe[];
}

export function RecipeBook({ open, onClose, recipes }: Props) {
  const [search, setSearch] = useState("");
  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!open) return null;

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:100,
      background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)",
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position:"absolute", bottom:0, left:0, right:0,
          maxHeight:"80vh", overflowY:"auto",
          background:"#1a1a2e", borderRadius:"20px 20px 0 0",
          padding:"20px 16px", paddingBottom:40,
          animation:"slide-up 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <div style={{
          width:40, height:4, borderRadius:2, background:"rgba(255,255,255,0.2)",
          margin:"0 auto 16px",
        }} />
        <div style={{ fontSize:18, fontWeight:700, color:"#fff", marginBottom:12, textAlign:"center" }}>
          Recipe Book
        </div>
        <input
          type="text" placeholder="Search recipes..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          style={{
            width:"100%", padding:"10px 14px", borderRadius:10,
            border:"1px solid rgba(255,255,255,0.1)",
            background:"rgba(255,255,255,0.05)", color:"#fff",
            fontSize:14, outline:"none", boxSizing:"border-box",
            marginBottom:12,
          }}
        />
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {filtered.map((recipe) => (
            <div key={String(recipe.id)} style={{
              background:"rgba(255,255,255,0.04)", borderRadius:12, padding:"12px",
              border:"1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:6, textAlign:"center" }}>
                {recipe.name}
              </div>
              <NotationDisplay root={recipe.root} size="normal" />
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", marginTop:6, textAlign:"center" }}>
                {recipe.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
