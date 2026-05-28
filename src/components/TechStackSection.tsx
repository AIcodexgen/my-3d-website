import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/* ─── Brand Colored SVG Logos ─── */

interface LogoProps {
  className?: string;
}

function FigmaLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-full h-full", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#F24E1E"/>
      <path d="M12 11.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#A259FF"/>
      <path d="M12 17.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#0ACF83"/>
      <path d="M12 11.5a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" fill="#FF7262"/>
      <path d="M12 17.5a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" fill="#18A0FB"/>
    </svg>
  );
}

function FramerLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-full h-full", className)} fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2h16v8h-8l8 8v6H4v-8h8L4 10z" />
    </svg>
  );
}

function ReactLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-full h-full", className)} fill="none" stroke="#61DAFB" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
    </svg>
  );
}

function NextLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-full h-full", className)} fill="none" stroke="#FFFFFF" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 17V8.5l7.5 9M15 8.5v6" stroke="#FFFFFF" strokeLinecap="round" />
    </svg>
  );
}

function TSLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-full h-full rounded", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#3178C6"/>
      <text x="20" y="20" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" fontFamily="system-ui, sans-serif" textAnchor="end">TS</text>
    </svg>
  );
}

function TailwindLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-full h-full", className)} fill="#38BDF8" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
  );
}

function NodeLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-full h-full", className)} fill="none" stroke="#68A063" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2z" strokeLinejoin="round" />
      <path d="M12 2v20M4 6.5l8 4.5 8-4.5" />
    </svg>
  );
}

function SupabaseLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-full h-full", className)} fill="#3ECF8E" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.36 11.23l-8.6 10.66a1.1 1.1 0 0 1-1.85-.86l1.35-7.53h-7.1c-.84 0-1.4-.87-.97-1.6L12.82 2.1c.36-.45 1.1-.33 1.28.25l-1.35 7.53h7.1c.84 0 1.4.87.97 1.6l.54-.25z" />
    </svg>
  );
}

function SplineLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-full h-full", className)} fill="none" stroke="#FF5C00" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" strokeLinejoin="round"/>
      <path d="M12 2v20M4 7l8 5 8-5" />
    </svg>
  );
}

function LottieLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-full h-full", className)} fill="none" stroke="#00D2FF" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8m-4-4v8" strokeLinecap="round"/>
    </svg>
  );
}

function StorybookLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-full h-full", className)} fill="#FF4785" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.8 5.7c-.8-.8-2-1.3-3.2-1.3H6.4C5.1 4.4 4 5.5 4 6.8v10.4c0 1.3 1.1 2.4 2.4 2.4h7.2c1.2 0 2.4-.5 3.2-1.3.8-.8 1.2-1.9 1.2-3.2V8.9c0-1.3-.4-2.4-1.2-3.2zm-2.4 11.5H8.8c-.4 0-.8-.4-.8-.8V7.6c0-.4.4-.8.8-.8h5.6c.4 0 .8.4.8.8v8.8c0 .4-.4.8-.8.8z"/>
    </svg>
  );
}

function WebflowLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-full h-full", className)} fill="#146EF5" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.16 3H16.4l-2.3 8.35L11.8 3H9.04l-2.3 8.35L4.44 3H1.5l3.85 13.9c.28 1 .97 1.63 1.95 1.63.95 0 1.6-.58 1.9-1.5l2.1-7.7 2.1 7.7c.3.92.95 1.5 1.9 1.5.98 0 1.67-.63 1.95-1.63L21.4 3h-2.24z"/>
    </svg>
  );
}

function ShopifyLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-full h-full", className)} fill="#96BF48" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.2 6.4L17.6 1.6c-.2-.5-.7-.8-1.2-.8H7.6c-.5 0-1 .3-1.2.8L4.8 6.4H2v2.4l1.6 12.8c.1 1 .9 1.6 1.8 1.6h13.2c.9 0 1.7-.6 1.8-1.6L22 8.8V6.4h-2.8zM9.2 2.4h5.6L16 6.4H8l1.2-4.0z"/>
    </svg>
  );
}

/* ─── Circular Orbit Definitions ─── */

interface ToolItem {
  id: string;
  name: string;
  logo: React.ReactNode;
  glow: string;
}

const innerOrbit: ToolItem[] = [
  { id: "react", name: "React", logo: <ReactLogo />, glow: "#61DAFB" },
  { id: "figma", name: "Figma", logo: <FigmaLogo />, glow: "#F24E1E" },
  { id: "typescript", name: "TypeScript", logo: <TSLogo />, glow: "#3178C6" },
  { id: "nextjs", name: "Next.js", logo: <NextLogo />, glow: "#FFFFFF" },
];

const middleOrbit: ToolItem[] = [
  { id: "nodejs", name: "Node.js", logo: <NodeLogo />, glow: "#68A063" },
  { id: "tailwind", name: "Tailwind CSS", logo: <TailwindLogo />, glow: "#38BDF8" },
  { id: "framer", name: "Framer", logo: <FramerLogo />, glow: "#FFFFFF" },
  { id: "supabase", name: "Supabase", logo: <SupabaseLogo />, glow: "#3ECF8E" },
  { id: "spline", name: "Spline", logo: <SplineLogo />, glow: "#FF5C00" },
];

const outerOrbit: ToolItem[] = [
  { id: "lottie", name: "Lottie", logo: <LottieLogo />, glow: "#00D2FF" },
  { id: "storybook", name: "Storybook", logo: <StorybookLogo />, glow: "#FF4785" },
  { id: "webflow", name: "Webflow", logo: <WebflowLogo />, glow: "#146EF5" },
  { id: "shopify", name: "Shopify", logo: <ShopifyLogo />, glow: "#96BF48" },
];

// Generates 2D circular keyframes for flat orbits (no vertical squashing or rotation matrix)
const generateCircularOrbitAnimation = (name: string, radius: number, direction: 'clockwise' | 'counter') => {
  let keyframes = `@keyframes ${name} {\n`;
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const pct = (i / steps) * 100;
    const progress = i / steps;
    const angle = progress * 2 * Math.PI * (direction === 'clockwise' ? 1 : -1);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    keyframes += `  ${pct.toFixed(1)}% { transform: translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0); }\n`;
  }
  keyframes += '}\n';
  return keyframes;
};

export function TechStackSection() {
  const { ref: sectionRef, inView: sectionInView } = useInView();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Create flat circular orbits (Rx = Ry) centered in the viewport
  const innerKeyframes = generateCircularOrbitAnimation("orbit-inner", 100, "clockwise");
  const middleKeyframes = generateCircularOrbitAnimation("orbit-middle", 180, "counter");
  const outerKeyframes = generateCircularOrbitAnimation("orbit-outer", 260, "clockwise");

  return (
    <div className="relative">
      {/* ─── Creative Laser Line Divider ─── */}
      <div className="w-full relative h-20 flex items-center justify-center overflow-hidden z-20 bg-background">
        <div className="w-[90%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent relative">
          <div className="absolute top-0 left-0 w-36 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-[laser_4s_ease-in-out_infinite]" />
        </div>
        <div className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_#77fd76] border-2 border-background animate-pulse" />
      </div>

      {/* ─── Rich Forest Green Visual Portal Section ─── */}
      <section
        id="stack"
        className="relative bg-gradient-to-b from-[#010c05] to-[#000502] py-28 px-6 md:px-16 overflow-hidden border-t border-white/5"
        style={{
          backgroundImage: `
            radial-gradient(circle at top, rgba(119, 253, 118, 0.08) 0%, transparent 60%),
            radial-gradient(rgba(119, 253, 118, 0.02) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "100% 100%, 24px 24px",
        }}
      >
        {/* Subtle Ambient Background Glow behind the orbits */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 bg-gradient-to-r from-primary/0 via-primary/[0.04] to-primary/0 blur-3xl pointer-events-none" />

        <div
          ref={sectionRef}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10 relative"
        >
          {/* Left Column - Text & Content (approx 40% / 5 grid cols) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left relative z-30">
            <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-[0.2em] mb-6 opacity-0", sectionInView && "animate-fade-up")}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Our Tech Stack
            </div>
            
            <h2 className={cn("text-[clamp(2.25rem,4.5vw,3.25rem)] font-extrabold tracking-tight leading-[1.08] text-foreground mb-6 opacity-0", sectionInView && "animate-fade-up")} style={{ animationDelay: "0.1s" }}>
              Key Technologies <br className="hidden sm:inline" /> &amp; Platforms
            </h2>
            
            <p className={cn("text-muted-foreground/75 text-sm font-light leading-relaxed mb-8 max-w-md opacity-0", sectionInView && "animate-fade-up")} style={{ animationDelay: "0.2s" }}>
              We work with leading platforms and technologies that empower digital transformation, accelerate delivery, and drive measurable business results.
            </p>
            
            <a 
              href="#contact" 
              className={cn("inline-block bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background hover:border-primary transition-all duration-300 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest pointer-events-auto cursor-pointer shadow-lg active:scale-95 text-center opacity-0", sectionInView && "animate-fade-up")}
              style={{ animationDelay: "0.3s" }}
            >
              Sync Your Stack
            </a>
          </div>

          {/* Right Column - Flat Circular Orbit Showcase (approx 60% / 7 grid cols) */}
          <div className={cn("lg:col-span-7 flex justify-center items-center h-[350px] sm:h-[500px] md:h-[600px] overflow-hidden w-full relative z-20 select-none opacity-0", sectionInView && "animate-scale-in")} style={{ animationDelay: "0.4s" }}>
            {/* Responsive scale wrapper */}
            <div className="relative w-[600px] h-[600px] flex items-center justify-center shrink-0 scale-[0.55] sm:scale-[0.8] md:scale-[0.9] lg:scale-100 transition-transform duration-300">
              
              {/* Pulsing Center Core */}
              <div className="absolute top-1/2 left-1/2 w-16 h-16 -mt-8 -ml-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(119,253,118,0.35)] z-30 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-primary shadow-[0_0_15px_#77fd76] flex items-center justify-center">
                  <span className="text-[10px] font-black text-background">CX</span>
                </div>
              </div>

              {/* Ring 1 - Inner Orbit Path (Perfect 2D Circle, Radius: 100px) */}
              <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] -mt-[100px] -ml-[100px] rounded-full border border-primary/10 pointer-events-none z-10" />
              {innerOrbit.map((tool, i) => {
                const delay = -(i / innerOrbit.length) * 24;
                return (
                  <div
                    key={tool.id}
                    className="absolute top-1/2 left-1/2 w-14 h-14 -mt-7 -ml-7 flex items-center justify-center z-20 cursor-pointer hover:scale-125 transition-transform duration-300 group"
                    style={{
                      animation: `orbit-inner 24s linear infinite`,
                      animationDelay: `${delay}s`,
                    }}
                    onMouseEnter={() => setHoveredId(tool.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div 
                      className="transition-all duration-300 w-9 h-9 flex items-center justify-center opacity-80 group-hover:opacity-100"
                      style={{
                        filter: hoveredId === tool.id ? `drop-shadow(0 0 12px ${tool.glow})` : 'none',
                      }}
                    >
                      {tool.logo}
                    </div>
                  </div>
                );
              })}

              {/* Ring 2 - Middle Orbit Path (Perfect 2D Circle, Radius: 180px) */}
              <div className="absolute top-1/2 left-1/2 w-[360px] h-[360px] -mt-[180px] -ml-[180px] rounded-full border border-primary/10 pointer-events-none z-10" />
              {middleOrbit.map((tool, i) => {
                const delay = -(i / middleOrbit.length) * 36;
                return (
                  <div
                    key={tool.id}
                    className="absolute top-1/2 left-1/2 w-14 h-14 -mt-7 -ml-7 flex items-center justify-center z-20 cursor-pointer hover:scale-125 transition-transform duration-300 group"
                    style={{
                      animation: `orbit-middle 36s linear infinite`,
                      animationDelay: `${delay}s`,
                    }}
                    onMouseEnter={() => setHoveredId(tool.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div 
                      className="transition-all duration-300 w-9 h-9 flex items-center justify-center opacity-80 group-hover:opacity-100"
                      style={{
                        filter: hoveredId === tool.id ? `drop-shadow(0 0 12px ${tool.glow})` : 'none',
                      }}
                    >
                      {tool.logo}
                    </div>
                  </div>
                );
              })}

              {/* Ring 3 - Outer Orbit Path (Perfect 2D Circle, Radius: 260px) */}
              <div className="absolute top-1/2 left-1/2 w-[520px] h-[520px] -mt-[260px] -ml-[260px] rounded-full border border-primary/10 pointer-events-none z-10" />
              {outerOrbit.map((tool, i) => {
                const delay = -(i / outerOrbit.length) * 48;
                return (
                  <div
                    key={tool.id}
                    className="absolute top-1/2 left-1/2 w-14 h-14 -mt-7 -ml-7 flex items-center justify-center z-20 cursor-pointer hover:scale-125 transition-transform duration-300 group"
                    style={{
                      animation: `orbit-outer 48s linear infinite`,
                      animationDelay: `${delay}s`,
                    }}
                    onMouseEnter={() => setHoveredId(tool.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div 
                      className="transition-all duration-300 w-9 h-9 flex items-center justify-center opacity-80 group-hover:opacity-100"
                      style={{
                        filter: hoveredId === tool.id ? `drop-shadow(0 0 12px ${tool.glow})` : 'none',
                      }}
                    >
                      {tool.logo}
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </section>

      {/* Generated CSS keyframe animations for smooth GPU-composited circular orbits */}
      <style>{`
        ${innerKeyframes}
        ${middleKeyframes}
        ${outerKeyframes}
        
        .group:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}
