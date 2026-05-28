import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/* ─── Visual interactive mockups constructed with pure CSS ─── */

function WebsiteVisual() {
  return (
    <div className="w-full h-40 bg-[#070707] rounded-xl border border-white/5 relative overflow-hidden flex flex-col group-hover:border-primary/20 transition-all duration-300">
      {/* Browser Window Header */}
      <div className="h-7 bg-white/3 border-b border-white/5 flex items-center px-3.5 gap-1.5 shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
        <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
        <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
        <div className="h-4 bg-white/5 rounded-md flex-1 max-w-[140px] mx-auto flex items-center justify-center">
          <span className="text-[7px] text-white/20 tracking-wider font-mono">codexgen.com/preview</span>
        </div>
      </div>
      {/* Browser Page Body */}
      <div className="p-4 flex-1 flex flex-col gap-3 relative justify-between">
        <div className="flex flex-col gap-2">
          {/* Main wireframe hero blocks */}
          <div className="w-2/3 h-3 bg-primary/25 rounded" />
          <div className="w-full h-1.5 bg-white/5 rounded" />
          <div className="w-4/5 h-1.5 bg-white/5 rounded" />
        </div>
        
        {/* Interactive layout grid columns */}
        <div className="grid grid-cols-3 gap-2.5 mt-2">
          <div className="h-12 bg-white/2 border border-white/5 rounded-lg p-2 flex flex-col justify-between group-hover:border-primary/10 transition-colors">
            <div className="w-4 h-4 rounded bg-primary/20" />
            <div className="w-full h-1 bg-white/10 rounded-full" />
          </div>
          <div className="h-12 bg-white/2 border border-white/5 rounded-lg p-2 flex flex-col justify-between group-hover:border-primary/10 transition-colors">
            <div className="w-4 h-4 rounded bg-primary/20" />
            <div className="w-full h-1 bg-white/10 rounded-full" />
          </div>
          <div className="h-12 bg-white/2 border border-white/5 rounded-lg p-2 flex flex-col justify-between group-hover:border-primary/10 transition-colors">
            <div className="w-4 h-4 rounded bg-primary/20" />
            <div className="w-full h-1 bg-white/10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrototypeVisual() {
  return (
    <div className="w-full h-40 bg-gradient-to-b from-[#0c0c0c] to-background rounded-xl border border-white/5 relative overflow-hidden flex items-end justify-center group-hover:border-primary/20 transition-all duration-300">
      {/* Mobile Device Mockup */}
      <div className="w-[110px] h-[130px] rounded-t-2xl border-t-[3px] border-x-[3px] border-white/10 bg-[#070707] relative overflow-hidden p-2.5 flex flex-col gap-2.5 shadow-[0_-12px_30px_rgba(0,0,0,0.6)]">
        {/* Notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-9 h-1.5 rounded-full bg-white/15" />
        
        {/* Header inside screen */}
        <div className="w-8 h-2 bg-white/10 rounded mt-1.5" />
        
        {/* Interactive mini analytics card */}
        <div className="bg-[#121212] border border-white/5 rounded-lg p-1.5 flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <div className="w-7 h-1 bg-white/30 rounded-full" />
            <div className="w-4 h-1 bg-primary/40 rounded-full" />
          </div>
          <div className="w-full h-7 bg-primary/5 rounded relative overflow-hidden flex items-end">
            {/* Micro bar chart */}
            <div className="w-full h-full flex items-end gap-[1.5px] px-1 pt-1.5">
              <div className="h-[25%] w-full bg-primary/40 rounded-t-[1px]" />
              <div className="h-[45%] w-full bg-primary/40 rounded-t-[1px]" />
              <div className="h-[35%] w-full bg-primary/40 rounded-t-[1px]" />
              <div className="h-[70%] w-full bg-primary/60 rounded-t-[1px]" />
              <div className="h-[85%] w-full bg-primary rounded-t-[1px]" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating interactive notification bubble */}
      <div className="absolute top-8 right-6 w-24 bg-[#0a0a0a]/90 border border-primary/20 rounded-lg p-2.5 shadow-2xl flex items-center gap-2 transform rotate-6 translate-x-1 translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-md">
        <div className="w-5 h-5 rounded-full bg-primary/25 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor" className="text-primary">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-9 h-1 bg-white/40 rounded-full" />
          <div className="w-12 h-0.5 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function UXVisual() {
  return (
    <div className="w-full h-40 bg-[#070707] rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center group-hover:border-primary/20 transition-all duration-300">
      {/* Canvas dots background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:12px_12px]" />
      
      {/* Overlapping vectors and shapes */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Main shape container */}
        <div className="w-20 h-20 rounded-full border border-[#FF5C00]/30 relative flex items-center justify-center transform rotate-12">
          {/* Inner shape */}
          <div className="w-12 h-12 border border-[#00AFFF]/40 rounded-lg" />
          
          {/* Vector anchors / handles */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white border border-[#FF5C00] rounded-sm" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white border border-[#FF5C00] rounded-sm" />
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 bg-white border border-[#FF5C00] rounded-sm" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 bg-white border border-[#FF5C00] rounded-sm" />
          
          {/* Connecting line to handle */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-[#FF5C00]/50" />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#FF5C00] rounded-full" />
        </div>
        
        {/* Selection Tool Crosshair */}
        <div className="absolute top-12 left-16 flex items-center gap-2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-105 transition-transform duration-300">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary" strokeWidth="2.5">
            <path d="M12 2v20M2 12h20" />
          </svg>
          <span className="text-[7px] text-white/50 bg-black/75 border border-white/10 px-1.5 py-0.5 rounded font-mono uppercase tracking-widest leading-none">
            R12.5
          </span>
        </div>
      </div>
    </div>
  );
}

interface Service {
  number: string;
  title: string;
  description: string;
  tags: string[];
  visual: React.ReactNode;
}

const services: Service[] = [
  {
    number: "01",
    title: "Website Building",
    description:
      "From landing pages that convert to full-stack web apps. We build fast, SEO-ready, mobile-first websites that make your startup look like it's already won.",
    tags: ["Landing Pages", "Web Apps", "SEO-Ready", "CMS Integration"],
    visual: <WebsiteVisual />,
  },
  {
    number: "02",
    title: "App Prototypes",
    description:
      "Got an app idea? We turn it into a clickable, investor-ready prototype in 2 weeks. Validate before you build. Ship before you burn runway.",
    tags: ["Clickable Prototypes", "Investor Decks", "User Flows", "Rapid MVP"],
    visual: <PrototypeVisual />,
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "Interfaces that users actually understand - and enjoy. Clean design systems, intuitive flows, and pixel-perfect execution built for real product teams.",
    tags: ["Design Systems", "Figma Handoff", "User Research", "Mobile UI"],
    visual: <UXVisual />,
  },
];

export function ServicesSection() {
  const { ref: headRef, inView: headInView } = useInView();
  const { ref: cardsRef, inView: cardsInView } = useInView();

  return (
    <section id="services" className="bg-background py-28 px-6 md:px-16 border-t border-border/20">
      {/* Header */}
      <div ref={headRef}>
        <p
          className={cn(
            "text-primary text-[10px] uppercase tracking-[0.3em] mb-4 opacity-0",
            headInView && "animate-fade-up"
          )}
        >
          WHAT WE BUILD
        </p>
        <h2
          className={cn(
            "text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] opacity-0",
            headInView && "animate-fade-up"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          Three things we do.
          <br />
          All of them, right.
        </h2>
        <p
          className={cn(
            "text-muted-foreground text-lg font-light max-w-xl mt-4 opacity-0",
            headInView && "animate-fade-up"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          No retainers. No bloated teams. Just sharp execution on the things
          that move your business.
        </p>
      </div>

      {/* Cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
      >
        {services.map((svc, i) => (
          <div
            key={svc.number}
            className={cn(
              "relative bg-[#0e0e0e]/40 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-6 hover:border-primary/25 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 group overflow-hidden opacity-0",
              cardsInView && "animate-fade-up"
            )}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {/* Visual Header Block */}
            {svc.visual}

            <div className="flex flex-col gap-3.5 relative z-10 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {svc.title}
                </h3>
                <span className="text-primary/20 text-3xl font-extrabold leading-none select-none pointer-events-none group-hover:text-primary/40 transition-colors">
                  {svc.number}
                </span>
              </div>
              <p className="text-muted-foreground/80 text-sm font-light leading-relaxed flex-1">
                {svc.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap relative z-10">
              {svc.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/5 border border-white/5 text-muted-foreground text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md font-semibold group-hover:border-white/10 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
