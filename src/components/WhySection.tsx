import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/* ─── Borderless Custom SVG Illustrations ─── */

function QuoteChartVisual() {
  return (
    <svg viewBox="0 0 300 120" className="w-full text-primary/10 relative z-0 mt-6 h-28 select-none pointer-events-none">
      <path
        d="M 10 100 Q 80 90 130 50 T 280 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-primary/25"
      />
      <path
        d="M 10 100 Q 80 90 130 50 T 280 10 L 280 120 L 10 120 Z"
        fill="url(#grad)"
        className="opacity-30"
      />
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(119 99% 46%)" stopOpacity="0.0" />
          <stop offset="100%" stopColor="hsl(119 99% 46%)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <circle cx="280" cy="10" r="4" fill="hsl(119 99% 46%)" className="animate-pulse" />
    </svg>
  );
}

function FastTurnaroundVisual() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-primary/80 shrink-0 group-hover:scale-110 transition-transform duration-300">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
      <path d="M24 12v12l6 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </svg>
  );
}

function PricingVisual() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-primary/80 shrink-0 group-hover:scale-110 transition-transform duration-300">
      <path d="M8 14h32M8 24h24M8 34h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="36" cy="29" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M36 26v6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function GlobalVisual() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-primary/80 shrink-0 group-hover:scale-110 transition-transform duration-300">
      <circle cx="18" cy="24" r="11" stroke="currentColor" strokeWidth="1" />
      <circle cx="30" cy="24" r="11" stroke="currentColor" strokeWidth="1" />
      <path d="M24 16v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HandoffVisual() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-primary/80 shrink-0 group-hover:scale-110 transition-transform duration-300">
      <rect x="14" y="22" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M19 22v-6a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="30" r="2" fill="currentColor" />
    </svg>
  );
}

const stats = [
  { value: "40+", label: "Projects delivered" },
  { value: "2-4", label: "Weeks avg. delivery" },
  { value: "100%", label: "Code ownership" },
  { value: "2", label: "Markets served" },
];

const differentiators = [
  {
    visual: <FastTurnaroundVisual />,
    title: "Fast turnaround",
    stat: "2-4 wks",
    description: "Most projects ship in 2-4 weeks. No dragged-out timelines, no scope creep.",
  },
  {
    visual: <PricingVisual />,
    title: "Startup pricing",
    stat: "Flat rate",
    description: "Transparent flat-rate packages built for seed-stage budgets. No hourly billing.",
  },
  {
    visual: <GlobalVisual />,
    title: "India + USA ready",
    stat: "IST · EST",
    description: "Teams and time zones that work for both markets. Overlap hours built in.",
  },
  {
    visual: <HandoffVisual />,
    title: "Full handoff",
    stat: "100% yours",
    description: "You own everything - code, designs, assets, domains. No lock-in. Ever.",
  },
];

export function WhySection() {
  const { ref: sectionRef, inView: sectionInView } = useInView();

  return (
    <div className="relative">
      {/* ─── Creative Laser Line Divider ─── */}
      <div className="w-full relative h-20 flex items-center justify-center overflow-hidden z-20 bg-background border-t border-white/5">
        <div className="w-[90%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent relative">
          <div className="absolute top-0 left-0 w-36 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-[laser_4s_ease-in-out_infinite]" />
        </div>
        <div className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_#77fd76] border-2 border-background animate-pulse" />
      </div>

      <section
        id="why"
        className="relative bg-background py-28 px-6 md:px-16 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at bottom left, rgba(119, 253, 118, 0.03) 0%, transparent 60%)
          `,
        }}
      >
        <div
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12"
        >
          {/* ── Left Column: Sticky Brand Headline & Quote ── */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-12 lg:sticky lg:top-28 lg:h-[calc(100vh-200px)]">
            <div>
              <p className={cn("text-primary text-[10px] uppercase tracking-[0.3em] mb-4 opacity-0", sectionInView && "animate-fade-up")}>
                WHY US
              </p>
              <h2 className={cn("text-[clamp(2.25rem,5vw,3.8rem)] font-bold tracking-tight leading-[1.0] max-w-xl text-foreground opacity-0", sectionInView && "animate-fade-up")} style={{ animationDelay: "0.1s" }}>
                Built for founders,
                <br />
                not enterprises.
              </h2>
            </div>

            <div className={cn("relative pl-6 border-l-2 border-primary/30 py-2 opacity-0", sectionInView && "animate-fade-up")} style={{ animationDelay: "0.2s" }}>
              <blockquote className="text-xl md:text-2xl font-bold leading-snug text-foreground/90">
                "Most agencies sell you a retainer.
                <span className="text-primary"> We sell you a result.</span>"
              </blockquote>
              <div className="flex items-center gap-3.5 mt-6">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold font-mono">
                  CX
                </div>
                <div>
                  <p className="text-foreground text-sm font-bold leading-none">Codexgen</p>
                  <p className="text-muted-foreground/60 text-[10px] uppercase tracking-wider mt-1.5 font-semibold">Since day one</p>
                </div>
              </div>
              {/* Embedded vector growth chart */}
              <QuoteChartVisual />
            </div>
          </div>

          {/* ── Right Column: borderless Stats & Differentiators ── */}
          <div className="lg:col-span-7 flex flex-col gap-20">
            
            {/* Section A: Borderless Stats Strip */}
            <div className={cn("opacity-0", sectionInView && "animate-fade-up")} style={{ animationDelay: "0.3s" }}>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40 font-bold mb-8">
                BY THE NUMBERS
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col group">
                    <span className="text-4xl md:text-5xl font-black text-foreground group-hover:text-primary transition-colors leading-none tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-muted-foreground/80 text-[10px] uppercase tracking-widest font-semibold mt-3">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section B: Borderless Differentiators Open List */}
            <div className={cn("opacity-0", sectionInView && "animate-fade-up")} style={{ animationDelay: "0.4s" }}>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40 font-bold mb-8">
                OUR PROTOCOL
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                {differentiators.map((item, i) => (
                  <div
                    key={item.title}
                    className={cn("flex items-start gap-5 group opacity-0", sectionInView && "animate-fade-up")}
                    style={{ animationDelay: \`\${0.4 + i * 0.1}s\` }}
                  >
                    {/* Styled Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                      {item.visual}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-foreground font-bold text-base group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[9px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded font-bold leading-none shrink-0 font-mono">
                          {item.stat}
                        </span>
                      </div>
                      <p className="text-muted-foreground/75 text-sm font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
