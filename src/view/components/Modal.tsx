import type { ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  color?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, color = "#4ADE80", children }: Props) {
  if (!open) return null;
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:200,
      background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:24,
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background:"#1a1a2e", borderRadius:20, padding:24,
        maxWidth:340, width:"100%",
        border:`1px solid ${color}33`,
        animation:"modal-pop 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {title && <div style={{ fontSize:18, fontWeight:700, color, textAlign:"center", marginBottom:12 }}>{title}</div>}
        {children}
      </div>
    </div>
  );
}
