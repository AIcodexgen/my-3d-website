import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/* ─── Borderless, transparent visual mockups for each step ─── */

function DiscoveryStepVisual() {
  return (
    <div className="w-full h-32 relative flex flex-col justify-center gap-3 select-none">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-primary/[0.01] blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-4 h-4 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <span className="text-[10px] font-semibold text-foreground/80 tracking-wider">User Interviews & Scope</span>
      </div>
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-4 h-4 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <span className="text-[10px] font-semibold text-foreground/80 tracking-wider">Competitive Audit</span>
      </div>
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>
        <span className="text-[10px] font-semibold text-muted-foreground tracking-wider">Technical Architecture</span>
      </div>
    </div>
  );
}

function DesignStepVisual() {
  return (
    <div className="w-full h-32 relative flex items-center justify-center select-none">
      <div className="absolute inset-0 bg-primary/[0.01] blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Design Artboard Wireframe (Borderless & Floating) */}
      <div className="w-[140px] h-[90px] border border-white/10 rounded-lg p-2.5 bg-white/[0.01] flex flex-col gap-2 relative z-10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
        <div className="w-full h-8 border border-dashed border-white/15 rounded flex items-center justify-center bg-white/1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/10" strokeWidth="1.5">
            <path d="M3 3l18 18M3 21L21 3" />
          </svg>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-12 h-1 bg-white/10 rounded-full" />
          <div className="w-5 h-1 bg-primary/40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function BuildStepVisual() {
  return (
    <div className="w-full h-32 relative flex flex-col justify-center gap-2.5 font-mono text-[9px] leading-tight text-white/55 select-none">
      <div className="absolute inset-0 bg-primary/[0.01] blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center gap-1.5 relative z-10">
        <span className="text-primary font-bold">$</span>
        <span>git commit -m "feat: core UI v1"</span>
      </div>
      <div className="text-white/25 pl-2.5 relative z-10">
        <span>- compiling assets...</span>
      </div>
      <div className="flex items-center gap-1.5 text-primary pl-2.5 relative z-10">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
        <span>production bundle built [83.6kB]</span>
      </div>
    </div>
  );
}

function LaunchStepVisual() {
  return (
    <div className="w-full h-32 relative flex flex-col justify-center gap-3.5 select-none">
      <div className="absolute inset-0 bg-primary/[0.01] blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center justify-between border-b border-white/5 pb-2 relative z-10">
        <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">PRODUCTION</span>
        <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[7px] text-primary font-bold uppercase tracking-widest font-mono">LIVE</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 relative z-10 font-mono text-[9px]">
        <div>
          <div className="text-white/35">LATENCY</div>
          <div className="text-white font-bold mt-0.5">14ms</div>
        </div>
        <div>
          <div className="text-white/35">HEALTH</div>
          <div className="text-primary font-bold mt-0.5">100%</div>
        </div>
      </div>
    </div>
  );
}

interface Step {
  number: string;
  title: string;
  description: string;
  visual: React.ReactNode;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn your business, goals, users, and constraints. No templates. Every project starts from scratch.",
    visual: <DiscoveryStepVisual />,
  },
  {
    number: "02",
    title: "Design",
    description:
      "Wireframes, flows, and high-fidelity UI built in Figma. You review, we refine. Fast feedback loops.",
    visual: <DesignStepVisual />,
  },
  {
    number: "03",
    title: "Build",
    description:
      "Development using modern stacks - React, Next.js, or no-code where it makes sense. Clean code, clean handoffs.",
    visual: <BuildStepVisual />,
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Deployment, QA, performance checks, and post-launch support. We stay until it's live and stable.",
    visual: <LaunchStepVisual />,
  },
];

export function ProcessSection() {
  const { ref: headRef, inView: headInView } = useInView();
  const { ref: stepsRef, inView: stepsInView } = useInView();

  return (
    <section id="process" className="bg-hero-bg py-28 px-6 md:px-16 border-t border-border/20">
      {/* Header */}
      <div ref={headRef}>
        <p
          className={cn(
            "text-primary text-[10px] uppercase tracking-[0.3em] mb-4 opacity-0",
            headInView && "animate-fade-up"
          )}
        >
          HOW WE WORK
        </p>
        <h2
          className={cn(
            "text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] opacity-0",
            headInView && "animate-fade-up"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          From idea to live
          <br />
          in four steps.
        </h2>
      </div>

      {/* Steps Grid */}
      <div ref={stepsRef} className="relative mt-24">
        {/* Animated Connecting Pathway Line */}
        <div className="hidden lg:block absolute top-[110px] left-[12%] right-[12%] z-0 h-[2px] overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={cn(
                "relative flex flex-col gap-6 group opacity-0",
                stepsInView && "animate-fade-up"
              )}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Subtle top indicator dot on line (desktop) */}
              <div className="hidden lg:block absolute top-[109px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary border-4 border-background group-hover:scale-150 transition-transform duration-300 z-20" />

              {/* Visual Panel Area */}
              <div className="h-32 flex items-center">
                {step.visual}
              </div>

              {/* Content Metadata */}
              <div className="flex flex-col gap-3.5 relative mt-4">
                {/* Subtle top indicator line */}
                <div className="w-8 h-[2px] bg-primary/40 group-hover:w-16 transition-all duration-300" />
                
                <div className="flex items-end justify-between">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <span className="text-primary/15 text-5xl font-black tracking-tighter select-none leading-none pointer-events-none group-hover:text-primary/30 group-hover:scale-105 transition-all duration-300">
                    {step.number}
                  </span>
                </div>
                
                <p className="text-muted-foreground/75 text-sm font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
