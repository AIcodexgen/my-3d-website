const items = [
  "SAAS STARTUP",
  "E-COMMERCE",
  "FINTECH",
  "EDTECH",
  "HEALTHTECH",
  "B2B PLATFORM",
  "D2C BRAND",
  "MVP LAUNCH",
];

function MarqueeRow() {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  return (
    <div className="flex items-center whitespace-nowrap">
      {doubled.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="text-muted-foreground/50 text-[10px] uppercase tracking-[0.3em] font-medium">
            {item}
          </span>
          <span className="text-primary mx-8 select-none">·</span>
        </span>
      ))}
    </div>
  );
}

export function MarqueeStrip() {
  return (
    <div
      className="relative overflow-hidden py-5 border-b border-border"
      style={{
        background: "linear-gradient(to bottom, hsl(var(--hero-bg)) 0%, hsl(var(--secondary) / 0.4) 80px)",
        marginTop: "-2px",
        paddingTop: "calc(1.25rem + 2px)",
      }}
    >
      {/* Above label */}
      <p className="text-center text-muted-foreground/40 text-[10px] uppercase tracking-[0.2em] mb-3">
        Trusted by founders building the next big thing
      </p>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        <div
          className="flex"
          style={{
            animation: "marquee 25s linear infinite",
            width: "max-content",
          }}
        >
          <MarqueeRow />
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
