import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  body: string;
  tag: "Launch Speed" | "UI/UX Design" | "Tech Stack";
  metric?: string;
  avatarBg: string;
  glow: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Arjun Menon",
    role: "Founder",
    body: "Codexgen built our entire SaaS landing page in 10 days. It looked better than anything we'd seen in our space. Conversions went up 34% in the first month.",
    tag: "Launch Speed",
    metric: "+34% Conversions",
    avatarBg: "from-[#119946] to-[#0a5c2a]",
    glow: "rgba(119, 253, 118, 0.15)",
  },
  {
    name: "Sarah Lin",
    role: "Co-Founder",
    body: "We had an idea and a pitch deck. They gave us a prototype that made investors actually get it. Closed our pre-seed two weeks later.",
    tag: "UI/UX Design",
    avatarBg: "from-blue-600 to-indigo-900",
    glow: "rgba(59, 130, 246, 0.15)",
  },
  {
    name: "Rohan Gupta",
    role: "CEO",
    body: "Flat pricing, clear timelines, zero drama. They're the agency I wish I'd found two years ago.",
    tag: "Tech Stack",
    avatarBg: "from-purple-600 to-indigo-900",
    glow: "rgba(168, 85, 247, 0.15)",
  },
  {
    name: "Devon Harris",
    role: "Product Lead",
    body: "The visual polish they brought to Capex was incredible. They took our complex financial dashboards and turned them into something clean and highly intuitive.",
    tag: "UI/UX Design",
    metric: "10/10 Design System",
    avatarBg: "from-amber-500 to-red-800",
    glow: "rgba(245, 158, 11, 0.15)",
  },
  {
    name: "Nikhil Sharma",
    role: "Founder",
    body: "We needed to ship our mobile web portal ahead of a major campaign. Codexgen worked around the clock to deliver a super-fast, responsive web app in record time.",
    tag: "Launch Speed",
    avatarBg: "from-cyan-500 to-blue-800",
    glow: "rgba(6, 182, 212, 0.15)",
  },
  {
    name: "Amara Okafor",
    role: "Co-Founder",
    body: "No lock-in. We got fully owned React code, Figma assets, and a clean documentation package. The handoff was seamless and our team owned it on day one.",
    tag: "Tech Stack",
    avatarBg: "from-pink-600 to-rose-900",
    glow: "rgba(236, 72, 153, 0.15)",
  },
];

// Split into columns for vertical scroll
const col1 = [testimonials[0], testimonials[3]];
const col2 = [testimonials[1], testimonials[4]];
const col3 = [testimonials[2], testimonials[5]];

export function TestimonialsSection() {
  const { ref: sectionRef } = useInView();

  const renderCard = (t: Testimonial, keyStr: string) => {
    return (
      <div
        key={keyStr}
        className="w-full bg-[#080e0a]/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between gap-5 transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden h-[220px] shrink-0"
        style={{
          '--card-glow': t.glow,
        } as React.CSSProperties}
      >
        {/* Spot glow */}
        <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" />

        <div className="flex flex-col gap-3">
          {/* Rating & Tag */}
          <div className="flex items-center justify-between">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <svg
                  key={j}
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-primary"
                >
                  <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.784 1.4 8.168L12 18.896l-7.334 3.856 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
                </svg>
              ))}
            </div>
            <span className="text-[8px] uppercase tracking-widest text-muted-foreground/60 border border-white/10 rounded-full px-2 py-0.5 bg-white/5 font-semibold">
              {t.tag}
            </span>
          </div>

          {/* Metric */}
          {t.metric && (
            <div className="self-start text-[9px] font-bold text-primary bg-primary/10 border border-primary/20 rounded px-2.5 py-0.5">
              {t.metric}
            </div>
          )}

          {/* Quote Body */}
          <p className="text-foreground/80 font-light text-xs md:text-sm leading-relaxed line-clamp-3">
            "{t.body}"
          </p>
        </div>

        {/* Client Meta */}
        <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-auto">
          <div
            className={cn(
              "w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-white text-[10px] shadow-sm shrink-0 uppercase",
              t.avatarBg
            )}
          >
            {t.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h4 className="text-foreground font-bold text-xs leading-none group-hover:text-primary transition-colors">
              {t.name}
            </h4>
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1.5 font-semibold">
              {t.role}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-background py-28 px-6 md:px-16 border-t border-border/20 overflow-hidden relative">
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(119,253,118,0.015),transparent_60%)] pointer-events-none" />

      {/* Header */}
      <div ref={sectionRef} className="max-w-6xl mx-auto mb-16">
        <p className="text-primary text-[10px] uppercase tracking-[0.3em] mb-4">
          WHAT FOUNDERS SAY
        </p>
        <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.1] text-foreground">
          Endorsed by founders. <br />
          Backed by results.
        </h2>
      </div>

      {/* Testimonials Wall Container */}
      <div className="max-w-6xl mx-auto relative h-[500px] overflow-hidden select-none">
        
        {/* Fading Mask Overlays */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

        {/* Desktop Sliding Columns Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 h-full">
          
          {/* Column 1: UP */}
          <div className="relative h-full overflow-hidden flex flex-col justify-start">
            <div className="flex flex-col gap-6 animate-[scroll-y-up_22s_linear_infinite] scroll-col">
              {[...col1, ...col1, ...col1].map((t, idx) => renderCard(t, `col1-${idx}`))}
            </div>
          </div>

          {/* Column 2: DOWN */}
          <div className="relative h-full overflow-hidden flex flex-col justify-start">
            <div className="flex flex-col gap-6 animate-[scroll-y-down_22s_linear_infinite] scroll-col">
              {[...col2, ...col2, ...col2].map((t, idx) => renderCard(t, `col2-${idx}`))}
            </div>
          </div>

          {/* Column 3: UP */}
          <div className="relative h-full overflow-hidden flex flex-col justify-start">
            <div className="flex flex-col gap-6 animate-[scroll-y-up_26s_linear_infinite] scroll-col">
              {[...col3, ...col3, ...col3].map((t, idx) => renderCard(t, `col3-${idx}`))}
            </div>
          </div>

        </div>

        {/* Mobile Horizontal Sliding Row */}
        <div className="flex md:hidden overflow-x-auto gap-5 pb-6 px-1 snap-x snap-mandatory scrollbar-none h-full items-center">
          {testimonials.map((t, idx) => (
            <div key={t.name} className="w-[85vw] max-w-[340px] shrink-0 snap-center">
              {renderCard(t, `mobile-${idx}`)}
            </div>
          ))}
        </div>

      </div>

      {/* Testimonials Keyframes Style Block */}
      <style>{`
        @keyframes scroll-y-up {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, -33.333%, 0); }
        }
        @keyframes scroll-y-down {
          0% { transform: translate3d(0, -33.333%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .scroll-col {
          will-change: transform;
        }
        .scroll-col:hover {
          animation-play-state: paused !important;
        }
        /* custom card glow on hover */
        .group:hover {
          border-color: var(--card-glow) !important;
          box-shadow: 0 10px 30px -10px var(--card-glow);
        }
        /* hide scrollbar for chrome, safari, opera */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        /* hide scrollbar for ie, edge and firefox */
        .scrollbar-none {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
}
