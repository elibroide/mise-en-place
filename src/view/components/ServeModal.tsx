import type { Customer, Recipe, KitchenColors } from "../../model/types";
import { RECIPES } from "../../model/data/recipes";
import { NotationDisplay } from "./NotationDisplay";

interface Props {
  customer: Customer | null;
  onConfirm: (customerId: string) => void;
  onClose: () => void;
  kitchenColors: KitchenColors;
  displayRecipes?: Recipe[];
}

export function ServeModal({ customer, onConfirm, onClose, kitchenColors, displayRecipes }: Props) {
  if (!customer) return null;
  const recipes = displayRecipes || RECIPES;
  const recipe = customer.recipe || recipes.find((r) => r.id === customer.recipeId);
  if (!recipe) return null;
  const kc = kitchenColors;

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:200,
      background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:24,
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background:"#1a1a2e", borderRadius:20, padding:24,
        maxWidth:340, width:"100%",
        border:`1px solid ${kc.primary}33`,
        animation:"modal-pop 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", textAlign:"center", marginBottom:4 }}>
          Serving {customer.name}
        </div>
        <div style={{ fontSize:20, fontWeight:800, color:"#fff", textAlign:"center", marginBottom:12 }}>
          {recipe.name}
        </div>
        <div style={{ marginBottom:16 }}>
          <NotationDisplay root={recipe.root} size="large" />
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", textAlign:"center", marginBottom:16 }}>
          Is this order ready?
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onClose} style={{
            flex:1, padding:12, borderRadius:10,
            background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)",
            fontSize:14, fontWeight:600, color:"rgba(255,255,255,0.5)", cursor:"pointer",
          }}>Not yet</button>
          <button onClick={() => onConfirm(customer.id)} style={{
            flex:1, padding:12, borderRadius:10,
            background:`linear-gradient(135deg, ${kc.primary}, ${kc.secondary})`,
            border:"none", fontSize:14, fontWeight:700, color:"#1a1a2e", cursor:"pointer",
            boxShadow:`0 4px 12px ${kc.primary}44`,
          }}>Serve!</button>
        </div>
      </div>
    </div>
  );
}
