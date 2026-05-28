import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);
const easeOutExpo = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));

/* ─── Starfield ─── */
const stars = Array.from({ length: 30 }, (_, i) => ({
  top: `${5 + ((i * 37) % 90)}%`,
  left: `${3 + ((i * 53) % 94)}%`,
  delay: `${(i * 0.37) % 3}s`,
  size: 1 + ((i * 0.7) % 1.5),
}));

/* ─── Explosion Item type ─── */
interface ExplosionItem {
  label: string;
  slug: string;
  ring: "inner" | "mid" | "outer";
  txVal: number;
  tyVal: number;
  txMobileVal: number;
  tyMobileVal: number;
  finalOpacity: number;
  driftY: string;
  driftDuration: string;
  hideOnMobile?: boolean;
}

/* ─── Build explosion items in concentric rings ─── */
function buildItemsConfig(): ExplosionItem[] {
  const INNER = [
    { label: "UI/UX Design", slug: "figma" },
    { label: "Web Development", slug: "react" },
    { label: "App Prototypes", slug: "nextdotjs" },
    { label: "Figma", slug: "figma" },
    { label: "React", slug: "react" },
    { label: "Next.js", slug: "nextdotjs" },
    { label: "Framer", slug: "framer" },
    { label: "Tailwind CSS", slug: "tailwindcss" },
  ];

  const MID = [
    { label: "TypeScript", slug: "typescript", hide: false },
    { label: "Supabase", slug: "supabase", hide: false },
    { label: "Node.js", slug: "nodedotjs", hide: false },
    { label: "Webflow", slug: "webflow", hide: false },
    { label: "Spline", slug: "threedotjs", hide: false },
    { label: "Shopify", slug: "shopify", hide: true },
    { label: "Storybook", slug: "storybook", hide: true },
    { label: "Lottie", slug: "lottiefiles", hide: true },
    { label: "REST APIs", slug: "postman", hide: true },
    { label: "Vercel", slug: "vercel", hide: false },
    { label: "Firebase", slug: "firebase", hide: false },
    { label: "Prisma", slug: "prisma", hide: false },
  ];

  const OUTER = [
    { label: "Fast Delivery", slug: "vercel" },
    { label: "Clean Handoff", slug: "github" },
    { label: "Mobile First", slug: "apple" },
    { label: "SEO Ready", slug: "google" },
    { label: "Startup Focused", slug: "stripe" },
    { label: "Design Systems", slug: "figma" },
    { label: "India & USA", slug: "cloudflare" },
    { label: "Zero Lock-in", slug: "docker" },
  ];

  const result: ExplosionItem[] = [];

  const addRing = (
    items: { label: string; slug: string; hide?: boolean }[],
    ring: "inner" | "mid" | "outer",
    rVw: number,
    rVh: number,
    startAngle: number,
    step: number,
    opacity: number,
  ) => {
    items.forEach((item, idx) => {
      const rad = ((startAngle + idx * step) * Math.PI) / 180;
      const tx = +(rVw * Math.cos(rad)).toFixed(2);
      const ty = +(rVh * Math.sin(rad)).toFixed(2);
      result.push({
        label: item.label,
        slug: item.slug,
        ring,
        txVal: tx,
        tyVal: ty,
        txMobileVal: +(tx * 0.55).toFixed(2),
        tyMobileVal: +(ty * 0.55).toFixed(2),
        finalOpacity: opacity,
        driftY: `${(-6 + ((idx * 4.1) % 12)).toFixed(1)}px`,
        driftDuration: `${(3.5 + ((idx * 1.3) % 2.5)).toFixed(1)}s`,
        hideOnMobile: item.hide,
      });
    });
  };

  addRing(INNER, "inner", 18, 18, 0, 45, 0.85);
  addRing(MID, "mid", 34, 32, 22.5, 30, 0.65);
  addRing(OUTER, "outer", 44, 42, 11.25, 45, 0.45);

  return result;
}

const EXPLOSION_ITEMS = buildItemsConfig();
const BUILD_LETTERS = ["B", "U", "I", "L", "D"];

/* ─────────────────────── COMPONENT ─────────────────────── */
export function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bottomFadeRef = useRef<HTMLDivElement>(null);
  const buildContainerRef = useRef<HTMLDivElement>(null);
  const sw1Ref = useRef<SVGCircleElement>(null);
  const sw2Ref = useRef<SVGCircleElement>(null);

  const [buildVisible, setBuildVisible] = useState(false);

  /* ── Entrance: Trigger "BUILD" letter reveal after mount ── */
  useEffect(() => {
    const timer = setTimeout(() => setBuildVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  /* ── Desktop mouse parallax ── */
  useEffect(() => {
    if (window.innerWidth < 768) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf: number;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX - window.innerWidth / 2;
      ty = e.clientY - window.innerHeight / 2;
    };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      stickyRef.current?.style.setProperty("--mouse-x", cx.toFixed(2));
      stickyRef.current?.style.setProperty("--mouse-y", cy.toFixed(2));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  /* ── Scroll-driven animation ── */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onScroll = () => {
      const wH = wrapper.offsetHeight;
      const vH = window.innerHeight;
      const scrollY = window.scrollY - wrapper.offsetTop;
      const total = wH - vH;
      if (total <= 0) return;
      const p = clamp(scrollY / total, 0, 1); // master scroll progress 0..1
      const mobile = window.innerWidth < 768;

      /* ── Phase 1: BUILD sinks (0% → 30%) ── */
      if (buildContainerRef.current) {
        const sink = clamp(p / 0.30, 0, 1);
        const scale = 1 - 0.35 * sink;
        const opacity = 1 - sink * sink;
        const blur = sink * 12;
        const rotX = sink * 25; // 3D tilt as it sinks
        buildContainerRef.current.style.transform =
          `translate(-50%, -50%) perspective(800px) rotateX(${rotX}deg) scale(${scale})`;
        buildContainerRef.current.style.opacity = opacity.toString();
        buildContainerRef.current.style.filter = `blur(${blur}px)`;
      }

      /* ── Phase 2: Morph text → logo (20% → 45%) ── */
      const morph = clamp((p - 0.20) / 0.25, 0, 1);

      /* ── Phase 3: Shockwave rings (22% → 40%) ── */
      const s1 = clamp((p - 0.22) / 0.18, 0, 1);
      if (sw1Ref.current) {
        sw1Ref.current.setAttribute("r", `${s1 * 55}vw`);
        sw1Ref.current.style.opacity = `${(1 - s1) * 0.6}`;
      }
      const s2 = clamp((p - 0.28) / 0.18, 0, 1);
      if (sw2Ref.current) {
        sw2Ref.current.setAttribute("r", `${s2 * 55}vw`);
        sw2Ref.current.style.opacity = `${(1 - s2) * 0.4}`;
      }

      /* ── Phase 4: Explosion trajectories (5% → 70%) ── */
      EXPLOSION_ITEMS.forEach((item, idx) => {
        const el = itemRefs.current[idx];
        if (!el) return;

        if ((item.ring === "outer" || item.hideOnMobile) && mobile) {
          el.style.display = "none";
          return;
        }
        el.style.display = "";

        // Each item's text and logo children
        const textEl = el.querySelector<HTMLElement>(".item-text");
        const logoEl = el.querySelector<HTMLElement>(".item-logo");

        if (p <= 0.70) {
          const start = 0.04 + idx * 0.006;
          const dur = 0.70 - start;
          const ip = clamp((p - start) / dur, 0, 1);
          const e = easeOutExpo(ip);

          const tx = mobile ? item.txMobileVal : item.txVal;
          const ty = mobile ? item.tyMobileVal : item.tyVal;

          el.style.transform = `translate(calc(-50% + ${tx * e}vw), calc(-50% + ${ty * e}vh)) scale(${0.3 + 0.7 * e})`;
          el.style.opacity = `${e * item.finalOpacity}`;
          el.classList.remove("settled");
        } else {
          const tx = mobile ? item.txMobileVal : item.txVal;
          const ty = mobile ? item.tyMobileVal : item.tyVal;
          el.style.transform = `translate(calc(-50% + ${tx}vw + var(--px,0px)), calc(-50% + ${ty}vh + var(--py,0px))) scale(1)`;
          el.style.opacity = `${item.finalOpacity}`;
          el.classList.add("settled");
        }

        // Morph: text fades out, logo fades in
        if (textEl) {
          const textOpacity = Math.max(0, 1 - morph * 2.5);
          textEl.style.opacity = `${textOpacity}`;
          textEl.style.transform = `translate(-50%, -50%) scale(${1 - morph * 0.3})`;
          textEl.style.pointerEvents = morph > 0.5 ? "none" : "auto";
        }
        if (logoEl) {
          const logoOpacity = Math.max(0, morph * 2 - 0.8);
          logoEl.style.opacity = `${logoOpacity}`;
          logoEl.style.transform = `translate(-50%, -50%) scale(${0.5 + morph * 0.5})`;
          logoEl.style.pointerEvents = morph > 0.5 ? "auto" : "none";
        }
      });

      /* ── Phase 5: Ambient glow ── */
      if (glowRef.current) {
        glowRef.current.style.opacity = `${clamp(p * 2.5, 0, 0.15)}`;
      }

      /* ── Phase 6: Hero content staggered fade-in (55% → 85%) ── */
      const refs = [
        { ref: eyebrowRef, start: 0.55 },
        { ref: h1Ref, start: 0.60 },
        { ref: subRef, start: 0.65 },
        { ref: ctaRef, start: 0.70 },
        { ref: trustRef, start: 0.78 },
      ];
      refs.forEach(({ ref, start }) => {
        if (!ref.current) return;
        const rp = easeOutCubic(clamp((p - start) / 0.18, 0, 1));
        ref.current.style.opacity = `${rp}`;
        ref.current.style.transform = `translateY(${(1 - rp) * 28}px)`;
        if (ref === ctaRef) ref.current.style.pointerEvents = rp > 0.5 ? "auto" : "none";
      });

      /* ── Phase 7: Bottom fade ── */
      if (bottomFadeRef.current) {
        const fh = p >= 0.85 ? 200 + ((p - 0.85) / 0.15) * 200 : 200;
        bottomFadeRef.current.style.height = `${fh}px`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <div ref={wrapperRef} className="relative h-[200vh] md:h-[300vh] bg-hero-bg">
      <div
        ref={stickyRef}
        id="hero-sticky"
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none"
        style={{ perspective: "1200px" } as React.CSSProperties}
      >
        {/* ── Starfield ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {stars.map((s, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/60 animate-pulse"
              style={{
                top: s.top, left: s.left,
                width: `${s.size}px`, height: `${s.size}px`,
                animationDelay: s.delay,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            />
          ))}
          <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/[0.03] blur-3xl" />
          <div className="absolute bottom-[10%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-[#805ad5]/[0.025] blur-3xl" />
        </div>

        {/* ── Shockwave rings ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <circle ref={sw1Ref} cx="50%" cy="50%" r="0" fill="none" stroke="hsl(119,99%,46%)" strokeWidth="1.5" style={{ opacity: 0 }} />
          <circle ref={sw2Ref} cx="50%" cy="50%" r="0" fill="none" stroke="hsl(119,99%,46%)" strokeWidth="1" style={{ opacity: 0 }} />
        </svg>

        {/* ── Explosion items ── */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 2 }}>
          {EXPLOSION_ITEMS.map((item, idx) => (
            <div
              key={idx}
              ref={el => { itemRefs.current[idx] = el; }}
              className="explosion-item absolute top-1/2 left-1/2 pointer-events-none select-none"
              style={{
                "--pf": item.ring === "inner" ? 0.012 : item.ring === "mid" ? 0.007 : 0.003,
                "--px": "calc(var(--mouse-x,0) * var(--pf) * 1px)",
                "--py": "calc(var(--mouse-y,0) * var(--pf) * 1px)",
                willChange: "transform, opacity",
                opacity: 0,
              } as React.CSSProperties}
            >
              <div
                className="explosion-item-inner pointer-events-auto relative w-0 h-0 flex items-center justify-center"
                style={{
                  "--drift-y": item.driftY,
                  "--drift-dur": item.driftDuration,
                } as React.CSSProperties}
              >
                {/* Text pill */}
                <div
                  className="item-text absolute bg-secondary/60 border border-border backdrop-blur-sm rounded-lg px-3.5 py-2 text-xs font-medium tracking-wide text-muted-foreground whitespace-nowrap select-none hover:border-primary/40 hover:text-foreground transition-colors duration-200"
                  style={{ opacity: 1, transform: "translate(-50%,-50%)" }}
                >
                  {item.label}
                </div>
                {/* Logo card */}
                <div
                  className="item-logo absolute w-12 h-12 bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl rounded-xl flex items-center justify-center shadow-[0_0_24px_rgba(255,255,255,0.06)] hover:bg-white/[0.12] transition-all duration-300"
                  style={{ opacity: 0, transform: "translate(-50%,-50%) scale(0.5)" }}
                >
                  <img
                    src={`https://cdn.simpleicons.org/${item.slug}/ffffff`}
                    alt={item.label}
                    className="w-6 h-6 object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* ── Glassmorphism "BUILD" Text ── */}
          <div
            ref={buildContainerRef}
            className="absolute top-1/2 left-1/2 flex items-center justify-center pointer-events-none select-none"
            style={{
              transform: "translate(-50%, -50%)",
              zIndex: 20,
              willChange: "transform, opacity, filter",
            }}
          >
            <div className="flex items-center gap-[0.5vw] md:gap-[1vw]">
              {BUILD_LETTERS.map((letter, i) => (
                <span
                  key={letter}
                  className={cn(
                    "build-letter inline-block relative",
                    buildVisible && "build-letter--visible",
                  )}
                  style={{
                    "--letter-index": i,
                    "--letter-delay": `${0.15 + i * 0.12}s`,
                  } as React.CSSProperties}
                >
                  {/* Glass face */}
                  <span className="build-letter-face" aria-hidden="true">
                    {letter}
                  </span>
                  {/* Reflection / shine layer */}
                  <span className="build-letter-shine" aria-hidden="true">
                    {letter}
                  </span>
                  {/* Screen-reader text */}
                  <span className="sr-only">{letter}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Radial glow ── */}
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
          style={{
            zIndex: 1,
            background: "radial-gradient(ellipse at center, hsl(119 99% 46% / 0.08) 0%, transparent 70%)",
            opacity: 0,
          }}
        />

        {/* ── Vignette ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            background: "radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 8% / 0.85) 100%)",
          }}
        />

        {/* ── Hero copy ── */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-6 px-6 text-center pointer-events-none" style={{ zIndex: 10 }}>
          <div
            ref={eyebrowRef}
            className="bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-[0.25em] px-4 py-1.5 rounded-full inline-flex font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
            style={{ opacity: 0 }}
          >
            Digital Product Studio
          </div>

          <h1
            ref={h1Ref}
            className="text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[1.0] tracking-[-0.05em] uppercase text-white mt-2 max-w-4xl"
            style={{ opacity: 0 }}
          >
            We build <br /> what startups <span className="text-primary">ship.</span>
          </h1>

          <p
            ref={subRef}
            className="text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl"
            style={{ opacity: 0 }}
          >
            Websites. Prototypes. UI/UX.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 w-full sm:w-auto font-bold pointer-events-none"
            style={{ opacity: 0 }}
          >
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_25px_rgba(119,253,118,0.3)] text-center w-full sm:w-auto shrink-0 pointer-events-auto"
            >
              Start a Project
            </a>
            <a
              href="#work"
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest bg-white/[0.05] border border-white/10 text-white hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer text-center w-full sm:w-auto flex items-center justify-center gap-2 shrink-0 backdrop-blur-sm pointer-events-auto"
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              See Our Work
            </a>
          </div>

          <p
            ref={trustRef}
            className="text-muted-foreground/60 text-xs font-light tracking-wide mt-4"
            style={{ opacity: 0 }}
          >
            Serving startups in India &amp; USA · 40+ projects delivered · Design to deployment
          </p>
        </div>

        {/* ── Bottom fade ── */}
        <div
          ref={bottomFadeRef}
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            zIndex: 20,
            height: "200px",
            background: "linear-gradient(to bottom, transparent 0%, hsl(var(--hero-bg)) 100%)",
          }}
        />
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        /* ─── Parallax CSS vars ─── */
        .explosion-item {
          --pf: 0;
          --px: 0px;
          --py: 0px;
        }

        /* ─── Float when settled ─── */
        .explosion-item.settled .explosion-item-inner {
          animation: drift var(--drift-dur, 4s) ease-in-out infinite;
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(var(--drift-y, -5px)); }
        }

        /* ══════════════════════════════════════════
           GLASSMORPHISM BUILD LETTERS
           ══════════════════════════════════════════ */

        .build-letter {
          font-size: clamp(4.5rem, 14vw, 12rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          position: relative;
          display: inline-block;

          /* Start state: invisible, pushed down + scaled */
          opacity: 0;
          transform: translateY(60px) scale(0.7) rotateX(40deg);
          filter: blur(8px);
          transition:
            opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.1s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--letter-delay, 0s);
        }

        .build-letter--visible {
          opacity: 1;
          transform: translateY(0) scale(1) rotateX(0deg);
          filter: blur(0);
        }

        /* The main glass face */
        .build-letter-face {
          position: relative;
          display: inline-block;

          /* Glassmorphism: translucent fill + frosted border */
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.04) 50%,
            rgba(255, 255, 255, 0.10) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;

          /* Outer glow + text shadow for depth */
          filter:
            drop-shadow(0 0 40px rgba(119, 253, 118, 0.12))
            drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5));
        }

        /* Shine / reflection sweep */
        .build-letter-shine {
          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;

          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255, 255, 255, 0.35) 45%,
            rgba(255, 255, 255, 0.55) 50%,
            rgba(255, 255, 255, 0.35) 55%,
            transparent 80%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;

          animation: glassShine 4s ease-in-out infinite;
          animation-delay: calc(var(--letter-delay, 0s) + 1.2s);
          opacity: 0.7;
        }

        @keyframes glassShine {
          0%, 100% {
            background-position: 200% center;
          }
          50% {
            background-position: -50% center;
          }
        }

        /* Subtle glow ring behind each letter */
        .build-letter::before {
          content: '';
          position: absolute;
          inset: -10%;
          border-radius: 24px;
          background: radial-gradient(
            ellipse at center,
            rgba(119, 253, 118, 0.06) 0%,
            transparent 70%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 1.2s ease;
          transition-delay: calc(var(--letter-delay, 0s) + 0.5s);
        }

        .build-letter--visible::before {
          opacity: 1;
        }

        /* ─── Stroke outline for extra glass edge ─── */
        .build-letter::after {
          content: attr(data-letter);
          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.18);
          -webkit-text-fill-color: transparent;
          pointer-events: none;
          opacity: 0;
          transition: opacity 1s ease;
          transition-delay: calc(var(--letter-delay, 0s) + 0.3s);
        }
        .build-letter--visible::after {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
