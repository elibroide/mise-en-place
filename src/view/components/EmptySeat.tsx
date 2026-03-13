export function EmptySeat() {
  return (
    <div style={{
      borderRadius: 16,
      border: "2px dashed rgba(255,255,255,0.06)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      height: "100%",
      minHeight: 100,
      background: "rgba(255,255,255,0.01)",
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: "rgba(255,255,255,0.06)",
      }} />
    </div>
  );
}
