import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/* ─── Mock visual components rendered with pure CSS ─── */

function BrowserMockup() {
  return (
    <div className="w-full h-full flex flex-col p-4 gap-2">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="ml-3 h-4 flex-1 rounded bg-white/5 max-w-[140px]" />
      </div>
      {/* Fake navbar */}
      <div className="flex items-center justify-between px-3 py-2 rounded bg-white/[0.03] border border-white/5">
        <div className="h-2.5 w-16 rounded-sm bg-primary/40" />
        <div className="flex gap-2">
          <div className="h-2 w-8 rounded-sm bg-white/10" />
          <div className="h-2 w-8 rounded-sm bg-white/10" />
          <div className="h-2 w-8 rounded-sm bg-white/10" />
        </div>
        <div className="h-5 w-16 rounded-sm bg-primary/30 border border-primary/20" />
      </div>
      {/* Hero area */}
      <div className="flex-1 flex flex-col items-start justify-center px-3 gap-2 mt-1">
        <div className="h-3 w-10 rounded-sm bg-primary/30 border border-primary/20" />
        <div className="h-6 w-48 rounded-sm bg-white/15" />
        <div className="h-6 w-36 rounded-sm bg-white/10" />
        <div className="h-2.5 w-52 rounded-sm bg-white/[0.06] mt-1" />
        <div className="h-2.5 w-44 rounded-sm bg-white/[0.06]" />
        <div className="flex gap-2 mt-2">
          <div className="h-7 w-24 rounded-sm bg-primary/40 border border-primary/30" />
          <div className="h-7 w-20 rounded-sm bg-white/10 border border-white/10" />
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mt-auto">
        {["+34%", "2.1s", "99"].map((v) => (
          <div key={v} className="rounded-lg bg-white/[0.04] border border-white/5 p-2 text-center">
            <div className="text-[10px] font-bold text-primary/70">{v}</div>
            <div className="h-1.5 w-8 rounded-sm bg-white/10 mx-auto mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="w-full h-full flex items-center justify-center py-4">
      <div className="relative h-full max-h-[220px] aspect-[9/16] rounded-[20px] border-2 border-white/10 bg-white/[0.03] overflow-hidden flex flex-col mx-auto">
        {/* Status bar */}
        <div className="flex justify-between px-3 py-1.5 shrink-0">
          <div className="h-1.5 w-6 rounded-sm bg-white/20" />
          <div className="w-12 h-3 rounded-full bg-black/60 -mt-0.5" />
          <div className="h-1.5 w-6 rounded-sm bg-white/20" />
        </div>
        {/* App header */}
        <div className="px-3 py-2 flex items-center justify-between shrink-0">
          <div className="h-2.5 w-16 rounded-sm bg-white/20" />
          <div className="w-5 h-5 rounded-full bg-primary/30 border border-primary/20" />
        </div>
        {/* Card stack */}
        <div className="flex-1 px-3 flex flex-col gap-2 overflow-hidden">
          <div className="h-20 rounded-xl bg-primary/10 border border-primary/20 p-2 flex flex-col justify-end shrink-0">
            <div className="h-2 w-16 rounded-sm bg-primary/50 mb-1" />
            <div className="h-1.5 w-10 rounded-sm bg-white/20" />
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="h-12 rounded-xl bg-white/[0.04] border border-white/5 p-2 flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-white/10 shrink-0" />
              <div className="flex flex-col gap-1 flex-1">
                <div className="h-1.5 w-16 rounded-sm bg-white/20" />
                <div className="h-1.5 w-10 rounded-sm bg-white/10" />
              </div>
              <div className="h-5 w-10 rounded-md bg-primary/20 border border-primary/10 shrink-0" />
            </div>
          ))}
        </div>
        {/* Bottom nav */}
        <div className="px-3 py-2 flex justify-around border-t border-white/5 mt-auto shrink-0">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={cn("w-4 h-4 rounded", i === 0 ? "bg-primary/50" : "bg-white/10")} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesignSystemMockup() {
  const colors = ["bg-primary", "bg-primary/60", "bg-primary/30", "bg-white/40", "bg-white/20", "bg-white/10"];
  return (
    <div className="w-full h-full flex gap-6 p-4 items-center">
      {/* Color swatches */}
      <div className="flex flex-col gap-1.5 shrink-0">
        {colors.map((c, i) => (
          <div key={i} className={cn("rounded-md", c, i === 0 ? "w-10 h-10" : i < 3 ? "w-8 h-8" : "w-6 h-6")} />
        ))}
      </div>
      {/* Typography + components */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="h-6 w-32 rounded-sm bg-white/20" />
          <div className="h-4 w-24 rounded-sm bg-white/12" />
          <div className="h-3 w-20 rounded-sm bg-white/8" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 w-20 rounded-md bg-primary/40 border border-primary/30" />
          <div className="h-7 w-20 rounded-md border border-white/10" />
          <div className="h-7 w-20 rounded-md bg-white/5 border border-white/5" />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 rounded-lg bg-white/[0.04] border border-white/5 flex items-center px-2 gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-primary/30" />
              <div className="h-1.5 flex-1 rounded-sm bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Project data ─── */
const projects = [
  {
    id: "01",
    name: "Launchpad",
    category: "SaaS Website",
    year: "2024",
    oneliner: "Conversion-focused landing page that doubled trial signups.",
    tags: ["React", "Next.js", "Framer Motion", "CMS"],
    visual: <BrowserMockup />,
    featured: true,          // spans 2 cols on desktop
    accent: "from-primary/5 to-transparent",
  },
  {
    id: "02",
    name: "FlowKit",
    category: "App Prototype",
    year: "2024",
    oneliner: "Investor-ready prototype that closed a pre-seed round.",
    tags: ["Figma", "React Native", "Protopie"],
    visual: <MobileMockup />,
    featured: false,
    accent: "from-blue-500/5 to-transparent",
  },
  {
    id: "03",
    name: "NexaUI",
    category: "Design System",
    year: "2025",
    oneliner: "End-to-end design system with 60+ components and Figma handoff.",
    tags: ["Design Tokens", "Figma", "Storybook", "React"],
    visual: <DesignSystemMockup />,
    featured: false,
    wide: true,              // spans 3 cols, horizontal layout
    accent: "from-primary/5 to-transparent",
  },
];

export function WorkSection() {
  const { ref: headRef, inView: headInView } = useInView();
  const { ref: p1Ref, inView: p1InView } = useInView();
  const { ref: p2Ref, inView: p2InView } = useInView();
  const { ref: p3Ref, inView: p3InView } = useInView();
  const inViews = [p1InView, p2InView, p3InView];
  const refs = [p1Ref, p2Ref, p3Ref];

  return (
    <section id="work" className="bg-background py-24 px-6 md:px-16">
      {/* Header */}
      <div ref={headRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <p className={cn("text-primary text-[10px] uppercase tracking-[0.3em] mb-4 opacity-0", headInView && "animate-fade-up")}>
            SELECTED WORK
          </p>
          <h2
            className={cn("text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] opacity-0", headInView && "animate-fade-up")}
            style={{ animationDelay: "0.1s" }}
          >
            Projects that shipped.
          </h2>
        </div>
        <a
          href="#"
          className={cn("text-muted-foreground text-sm hover:text-primary transition-colors shrink-0 opacity-0 group flex items-center gap-2", headInView && "animate-fade-up")}
          style={{ animationDelay: "0.2s" }}
        >
          View all projects
          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </a>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={refs[i]}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-secondary border border-border",
              "hover:border-primary/40 transition-all duration-300 cursor-pointer",
              "flex flex-col",
              project.featured && "md:col-span-2",
              project.wide && "md:col-span-3 md:flex-row",
              "opacity-0",
              inViews[i] && "animate-fade-up"
            )}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            {/* Subtle radial gradient accent */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                project.accent
              )}
            />

            {/* Visual area */}
            <div
              className={cn(
                "relative overflow-hidden bg-hero-bg border-b border-border group-hover:border-primary/20 transition-colors duration-300",
                project.wide ? "md:border-b-0 md:border-r md:w-[55%] md:shrink-0" : "h-52 md:h-64"
              )}
              style={{ minHeight: project.wide ? "220px" : undefined }}
            >
              {/* Grid overlay - subtle depth texture */}
              <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,hsl(0,0%,100%),hsl(0,0%,100%) 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,hsl(0,0%,100%),hsl(0,0%,100%) 1px,transparent 1px,transparent 32px)",
                }}
              />
              {/* Green corner glow on hover */}
              <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />
              {project.visual}
            </div>

            {/* Info area */}
            <div className={cn("flex flex-col justify-between p-6 gap-4", project.wide && "flex-1")}>
              <div>
                {/* Number + category row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-primary/30 text-4xl font-bold leading-none select-none">
                    {project.id}
                  </span>
                  <span className="text-primary text-[10px] uppercase tracking-[0.2em] font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-foreground font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.name}
                </h3>

                {/* One-liner */}
                <p className="text-muted-foreground text-sm font-light leading-relaxed">
                  {project.oneliner}
                </p>
              </div>

              {/* Bottom row: tags + arrow */}
              <div className="flex items-end justify-between gap-3 flex-wrap">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted text-muted-foreground text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors duration-300 shrink-0">
                  <span className="text-xs uppercase tracking-widest">{project.year}</span>
                  <span className="text-base group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
