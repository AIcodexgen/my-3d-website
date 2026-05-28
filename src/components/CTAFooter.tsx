import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/* ─── White Monochrome SVG Logos for Physics Bubbles ─── */

function FigmaLogo() {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" className="text-white/80">
      <path d="M12 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path d="M12 9a3 3 0 0 1 3 3 3 3 0 1 1-3-3z" />
      <path d="M12 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path d="M12 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path d="M12 15a3 3 0 0 1 3 3 3 3 0 1 1-3-3z" />
    </svg>
  );
}

function ReactLogo() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" className="text-white/80" strokeWidth="1.5">
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function NextLogo() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" className="text-white/80" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 17V8.5l7.5 9M15 8.5v6" strokeLinecap="round" />
    </svg>
  );
}

function TSLogo() {
  return (
    <span className="text-white/80 font-bold text-xl tracking-tighter select-none">TS</span>
  );
}

function TailwindLogo() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="text-white/80">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
  );
}

function NodeLogo() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" className="text-white/80" strokeWidth="1.5">
      <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2z" strokeLinejoin="round" />
      <path d="M12 2v20M4 6.5l8 4.5 8-4.5" />
    </svg>
  );
}

function SupabaseLogo() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="text-white/80">
      <path d="M21.36 11.23l-8.6 10.66a1.1 1.1 0 0 1-1.85-.86l1.35-7.53h-7.1c-.84 0-1.4-.87-.97-1.6L12.82 2.1c.36-.45 1.1-.33 1.28.25l-1.35 7.53h7.1c.84 0 1.4.87.97 1.6l.54-.25z" />
    </svg>
  );
}

function FramerLogo() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="text-white/80">
      <path d="M4 2h16v8h-8l8 8v6H4v-8h8L4 10z" />
    </svg>
  );
}

const circlesData = [
  { name: "Figma", logo: <FigmaLogo />, radius: 68 },
  { name: "React", logo: <ReactLogo />, radius: 76 },
  { name: "Next.js", logo: <NextLogo />, radius: 72 },
  { name: "TypeScript", logo: <TSLogo />, radius: 64 },
  { name: "Tailwind", logo: <TailwindLogo />, radius: 68 },
  { name: "Node.js", logo: <NodeLogo />, radius: 68 },
  { name: "Supabase", logo: <SupabaseLogo />, radius: 72 },
  { name: "Framer", logo: <FramerLogo />, radius: 64 },
];

interface PhysicsObject {
  id: number;
  name: string;
  logo: React.ReactNode;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rotation: number;
  angularVelocity: number;
}

const initPhysics = (width: number, _height: number): PhysicsObject[] => {
  return circlesData.map((c, i) => {
    const radius = width < 768 ? c.radius * 0.75 : c.radius;
    return {
      id: i,
      name: c.name,
      logo: c.logo,
      radius,
      // Distribute evenly horizontally across the screen
      x: radius + (i * (width - radius * 2.5)) / (circlesData.length - 1),
      // Staggered launch from top
      y: -radius - i * 65 - Math.random() * 40,
      vx: (Math.random() - 0.5) * 1.5,
      vy: 1.5 + Math.random() * 2,
      rotation: (Math.random() - 0.5) * 45,
      angularVelocity: (Math.random() - 0.5) * 2,
    };
  });
};

const updatePhysics = (
  objects: PhysicsObject[],
  width: number,
  height: number,
  gravity = 0.35,
  elasticity = 0.45,
  friction = 0.98,
  airResistance = 0.99
) => {
  // Update positions and velocities
  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    
    obj.vy += gravity;
    obj.vx *= airResistance;
    obj.vy *= airResistance;
    
    obj.x += obj.vx;
    obj.y += obj.vy;
    obj.rotation += obj.angularVelocity;
    obj.angularVelocity *= 0.98; // friction on spin

    // Floor check
    if (obj.y + obj.radius > height) {
      obj.y = height - obj.radius;
      obj.vy = -obj.vy * elasticity;
      obj.vx *= friction;
      obj.angularVelocity += obj.vx * 0.15;
    }

    // Wall checks
    if (obj.x - obj.radius < 0) {
      obj.x = obj.radius;
      obj.vx = -obj.vx * elasticity;
      obj.angularVelocity += obj.vy * 0.15;
    } else if (obj.x + obj.radius > width) {
      obj.x = width - obj.radius;
      obj.vx = -obj.vx * elasticity;
      obj.angularVelocity -= obj.vy * 0.15;
    }
  }

  // Handle circle-to-circle collision (2D Elastic)
  for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
      const obj1 = objects[i];
      const obj2 = objects[j];

      const dx = obj2.x - obj1.x;
      const dy = obj2.y - obj1.y;
      const dist = Math.hypot(dx, dy);
      const minDist = obj1.radius + obj2.radius;

      if (dist < minDist) {
        // Resolve overlap
        const overlap = minDist - dist;
        const nx = dx / dist;
        const ny = dy / dist;

        obj1.x -= nx * overlap * 0.5;
        obj1.y -= ny * overlap * 0.5;
        obj2.x += nx * overlap * 0.5;
        obj2.y += ny * overlap * 0.5;

        // Relative velocity along normal
        const kx = obj1.vx - obj2.vx;
        const ky = obj1.vy - obj2.vy;
        const vn = kx * nx + ky * ny;

        if (vn > 0) {
          const impulse = (2 * vn) / 2; // Equal masses assumed
          
          obj1.vx -= impulse * nx * elasticity;
          obj1.vy -= impulse * ny * elasticity;
          obj2.vx += impulse * nx * elasticity;
          obj2.vy += impulse * ny * elasticity;

          // Introduce spin based on relative tangent velocity
          const tx = -ny;
          const ty = nx;
          const vt = kx * tx + ky * ty;
          obj1.angularVelocity -= vt * 0.04;
          obj2.angularVelocity += vt * 0.04;
        }
      }
    }
  }
};

function PhysicsStackDOM() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [objects, setObjects] = useState<PhysicsObject[]>([]);
  const { ref: viewRef, inView } = useInView({ threshold: 0.05 });
  const requestRef = useRef<number>(0);
  const prevInViewRef = useRef<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    if (inView && !prevInViewRef.current) {
      setObjects(initPhysics(width, height));
    }
    prevInViewRef.current = inView;
  }, [inView]);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      setObjects((prev) => {
        return prev.map((obj) => {
          const baseRadius = circlesData[obj.id].radius;
          const radius = width < 768 ? baseRadius * 0.75 : baseRadius;
          return {
            ...obj,
            radius,
            x: Math.min(Math.max(obj.x, radius), width - radius),
            y: Math.min(Math.max(obj.y, radius), height - radius),
          };
        });
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!inView) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      return;
    }

    const loop = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      setObjects((prev) => {
        if (prev.length === 0) return prev;
        const copy = prev.map((o) => ({ ...o }));
        updatePhysics(copy, width, height);
        return copy;
      });

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [inView]);

  return (
    <div
      ref={viewRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      <div ref={containerRef} className="w-full h-full relative">
        {objects.map((obj) => (
          <div
            key={obj.id}
            className="absolute flex items-center justify-center rounded-full bg-[#031d0e] border border-[#063319]/50 shadow-[inset_0_2px_8px_rgba(255,255,255,0.06),0_15px_30px_rgba(0,0,0,0.5)] select-none pointer-events-auto cursor-grab active:cursor-grabbing hover:border-primary/30 transition-colors duration-300 group"
            style={{
              width: `${obj.radius * 2}px`,
              height: `${obj.radius * 2}px`,
              left: 0,
              top: 0,
              transform: `translate3d(${obj.x - obj.radius}px, ${obj.y - obj.radius}px, 0) rotate(${obj.rotation}deg)`,
              willChange: "transform",
            }}
          >
            {/* Subtle glow behind logo */}
            <div className="absolute inset-0 rounded-full bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
            <div className="flex flex-col items-center gap-1 select-none pointer-events-none">
              {obj.logo}
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-white/35 font-bold mt-1">
                {obj.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const footerLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Stack", href: "#stack" },
];

interface ScopeOption {
  id: string;
  label: string;
  timeline: string;
  days: number;
  description: string;
}

const scopeOptions: ScopeOption[] = [
  {
    id: "saas",
    label: "SaaS Web App",
    timeline: "2-4 Weeks",
    days: 21,
    description: "Full-stack React/Next.js dashboard with secure auth & database.",
  },
  {
    id: "mobile",
    label: "Mobile App",
    timeline: "4 Weeks",
    days: 28,
    description: "Cross-platform iOS/Android app built using React Native.",
  },
  {
    id: "marketing",
    label: "Marketing Site",
    timeline: "10 Days",
    days: 10,
    description: "High-performance marketing page optimized for search and conversion.",
  },
  {
    id: "design",
    label: "Design System",
    timeline: "7 Days",
    days: 7,
    description: "Comprehensive UI Kit, React components, and Figma source files.",
  },
];

export function CTAFooter() {
  const { ref: ctaRef, inView: ctaInView } = useInView();
  const [selectedScope, setSelectedScope] = useState<string>("saas");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const activeOption = scopeOptions.find((o) => o.id === selectedScope) || scopeOptions[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getShipDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Pre-footer CTA Block */}
      <section
        ref={ctaRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-hero-bg border-t border-border/20 py-24 px-6 md:px-16 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at top, hsl(119 99% 46% / 0.03) 0%, transparent 70%), hsl(var(--hero-bg))",
        }}
      >
        {/* Dynamic Spotlight Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(119, 253, 118, 0.05), transparent 80%)`,
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy + Scope Selection */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <p
              className={cn(
                "text-primary text-[10px] uppercase tracking-[0.3em] mb-4 opacity-0",
                ctaInView && "animate-fade-up"
              )}
            >
              START TODAY
            </p>

            <h2
              className={cn(
                "text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-[-0.04em] leading-[1.05] opacity-0 mb-6 text-foreground",
                ctaInView && "animate-fade-up"
              )}
              style={{ animationDelay: "0.1s" }}
            >
              Your product.
              <br />
              <span className="text-primary">Our execution.</span>
            </h2>

            <p
              className={cn(
                "text-muted-foreground/80 text-base font-light max-w-lg mb-8 opacity-0",
                ctaInView && "animate-fade-up"
              )}
              style={{ animationDelay: "0.2s" }}
            >
              Select what you are building below to see how fast we can design, build, and ship it to production.
            </p>

            {/* Interactive Scope Pills Grid */}
            <div 
              className={cn(
                "grid grid-cols-2 gap-3 w-full max-w-lg opacity-0",
                ctaInView && "animate-fade-up"
              )}
              style={{ animationDelay: "0.3s" }}
            >
              {scopeOptions.map((opt) => {
                const isSelected = opt.id === selectedScope;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedScope(opt.id)}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col gap-1.5 active:scale-[0.98]",
                      isSelected
                        ? "bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(119,253,118,0.15)]"
                        : "bg-white/[0.01] border-white/5 text-muted-foreground hover:border-white/20 hover:bg-white/[0.03] hover:text-foreground"
                    )}
                  >
                    <span className={cn("text-xs font-bold uppercase tracking-wider", isSelected ? "text-primary" : "")}>
                      {opt.label}
                    </span>
                    <span className="text-[10px] font-light leading-relaxed line-clamp-1 opacity-70">
                      {opt.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Scoping Calculator Estimate Panel */}
          <div 
            className={cn(
              "lg:col-span-5 w-full opacity-0",
              ctaInView && "animate-fade-up"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="bg-secondary/40 border border-white/5 hover:border-primary/20 transition-all duration-500 rounded-2xl p-8 flex flex-col justify-between gap-8 backdrop-blur-md relative overflow-hidden shadow-[inset_0_2px_8px_rgba(255,255,255,0.02),0_20px_40px_rgba(0,0,0,0.4)]">
              {/* Corner accent glow */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-primary/5 blur-xl pointer-events-none" />

              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60 font-bold block mb-1">
                    PROJECT ESTIMATE
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-black text-white tracking-tight">
                      {activeOption.timeline}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 border-t border-white/5 pt-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground/60 uppercase tracking-widest font-semibold">
                      CODE OWNERSHIP
                    </span>
                    <span className="text-primary font-bold tracking-wider uppercase bg-primary/10 px-2 py-0.5 rounded text-[10px]">
                      100% Yours
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground/60 uppercase tracking-widest font-semibold">
                      EXPECTED SHIP DATE
                    </span>
                    <span className="text-white font-mono font-semibold">
                      {getShipDate(activeOption.days)}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground/70 text-xs font-light leading-relaxed">
                  {activeOption.description}
                </p>
              </div>

              {/* Call-to-actions */}
              <div className="flex flex-col gap-3.5 mt-2">
                <button className="w-full bg-primary text-primary-foreground py-4 text-xs rounded-xl font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_20px_rgba(119,253,118,0.25)]">
                  Book a Free Call
                </button>
                <button className="w-full bg-white/5 border border-white/10 text-white py-4 text-xs rounded-xl font-bold uppercase tracking-widest hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer">
                  Email Us
                </button>
              </div>

              <div className="text-center text-[10px] text-muted-foreground/40 font-light">
                No commitment. 30-min scoping call. Response within 24h.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Footer matching Mockup */}
      <footer
        id="contact"
        className="relative bg-gradient-to-b from-[#020c06] to-[#010603] border-t border-white/5 px-6 md:px-16 pt-24 pb-28 overflow-hidden min-h-[520px] md:min-h-[580px] flex flex-col justify-between"
      >
        {/* Interactive falling tech circles */}
        <PhysicsStackDOM />

        {/* Top/Main Row */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          {/* Column 1: Logo Info */}
          <div className="md:col-span-6 flex items-start gap-3">
            {/* Custom Green Chevron Arrow Brand Icon */}
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/25 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6h9L17 12L13 18H4L8 12L4 6Z" fill="#77fd76" />
              </svg>
            </div>
            <div>
              <a href="#" className="text-2xl font-bold tracking-tight text-white block leading-none">
                CODEXGEN
              </a>
              <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-bold block mt-2">
                STUDIO PARTNER
              </span>
            </div>
          </div>

          {/* Column 2: Large Vertical Navigation */}
          <div className="md:col-span-6 flex flex-col md:items-end gap-3.5 text-left md:text-right">
            <div className="flex flex-col md:items-end gap-3.5">
              {footerLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-3xl md:text-5xl font-bold tracking-tight text-white/50 hover:text-primary transition-all duration-300 block w-fit",
                    i === 0 && "text-primary" // Highlight home
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Separate Copyright Stripe (Safe from physics bodies) */}
      <div className="relative z-10 bg-[#010603] border-t border-white/5 py-8 px-6 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-muted-foreground/50">
          <span>© 2026 CODEXGEN LIMITED. ALL RIGHTS RESERVED.</span>
          <span className="hidden sm:inline text-white/10">|</span>
          <a href="#" className="hover:text-foreground transition-colors font-semibold">
            PRIVACY POLICY
          </a>
        </div>
        <div className="text-muted-foreground/40 font-bold tracking-widest text-[9px] uppercase">
          WEBSITE BY <span className="text-foreground font-extrabold">CODEXGEN</span>
        </div>
      </div>
    </>
  );
}
