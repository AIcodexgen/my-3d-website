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

/* ─── Explosion Item ─── */
interface ExplosionItem {
  label: string;
  slug: string;
  color: string; // hex brand color (no #)
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

/* ─── Build explosion items with BRAND COLORS ─── */
function buildItemsConfig(): ExplosionItem[] {
  const INNER = [
    { label: "Figma", slug: "figma", color: "F24E1E" },
    { label: "React", slug: "react", color: "61DAFB" },
    { label: "Next.js", slug: "nextdotjs", color: "ffffff" },
    { label: "Vue.js", slug: "vuedotjs", color: "4FC08D" },
    { label: "Angular", slug: "angular", color: "DD0031" },
    { label: "Svelte", slug: "svelte", color: "FF3E00" },
    { label: "Framer", slug: "framer", color: "0055FF" },
    { label: "Tailwind", slug: "tailwindcss", color: "06B6D4" },
  ];

  const MID = [
    { label: "TypeScript", slug: "typescript", color: "3178C6", hide: false },
    { label: "Supabase", slug: "supabase", color: "3FCF8E", hide: false },
    { label: "Node.js", slug: "nodedotjs", color: "5FA04E", hide: false },
    { label: "Webflow", slug: "webflow", color: "4353FF", hide: false },
    { label: "Three.js", slug: "threedotjs", color: "ffffff", hide: false },
    { label: "Shopify", slug: "shopify", color: "7AB55C", hide: true },
    { label: "Storybook", slug: "storybook", color: "FF4785", hide: true },
    { label: "Lottie", slug: "lottiefiles", color: "00DDB3", hide: true },
    { label: "Postman", slug: "postman", color: "FF6C37", hide: true },
    { label: "Vercel", slug: "vercel", color: "ffffff", hide: false },
    { label: "Firebase", slug: "firebase", color: "DD2C00", hide: false },
    { label: "Prisma", slug: "prisma", color: "2D3748", hide: false },
  ];

  const OUTER = [
    { label: "GitHub", slug: "github", color: "ffffff" },
    { label: "Docker", slug: "docker", color: "2496ED" },
    { label: "Stripe", slug: "stripe", color: "635BFF" },
    { label: "Google", slug: "google", color: "4285F4" },
    { label: "Apple", slug: "apple", color: "ffffff" },
    { label: "Cloudflare", slug: "cloudflare", color: "F38020" },
    { label: "AWS", slug: "amazonaws", color: "FF9900" },
    { label: "Notion", slug: "notion", color: "ffffff" },
  ];

  const result: ExplosionItem[] = [];

  const addRing = (
    items: { label: string; slug: string; color: string; hide?: boolean }[],
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
        color: item.color,
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

  addRing(INNER, "inner", 18, 18, 0, 45, 0.9);
  addRing(MID, "mid", 34, 32, 22.5, 30, 0.7);
  addRing(OUTER, "outer", 44, 42, 11.25, 45, 0.5);

  return result;
}

const EXPLOSION_ITEMS = buildItemsConfig();
const BUILD_LETTERS = ["B", "U", "I", "L", "D"];

/* ═══════════════════════ COMPONENT ═══════════════════════ */
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

  /* ── Trigger BUILD entrance after mount ── */
  useEffect(() => {
    const t = setTimeout(() => setBuildVisible(true), 300);
    return () => clearTimeout(t);
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
      const p = clamp(scrollY / total, 0, 1);
      const mobile = window.innerWidth < 768;

      /* Phase 1: BUILD sinks (0% → 30%) */
      if (buildContainerRef.current) {
        const sink = clamp(p / 0.30, 0, 1);
        const scale = 1 - 0.35 * sink;
        const opacity = 1 - sink * sink;
        const blur = sink * 14;
        const rotX = sink * 30;
        const ty = sink * 80;
        buildContainerRef.current.style.transform =
          `translate(-50%, calc(-50% + ${ty}px)) perspective(900px) rotateX(${rotX}deg) scale(${scale})`;
        buildContainerRef.current.style.opacity = opacity.toString();
        buildContainerRef.current.style.filter = `blur(${blur}px)`;
      }

      /* Phase 2: Shockwave rings (22% → 40%) */
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

      /* Phase 3: Logo explosion trajectories (5% → 70%) */
      EXPLOSION_ITEMS.forEach((item, idx) => {
        const el = itemRefs.current[idx];
        if (!el) return;

        if ((item.ring === "outer" || item.hideOnMobile) && mobile) {
          el.style.display = "none";
          return;
        }
        el.style.display = "";

        if (p <= 0.70) {
          const start = 0.04 + idx * 0.005;
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
      });

      /* Phase 4: Ambient glow */
      if (glowRef.current) {
        glowRef.current.style.opacity = `${clamp(p * 2.5, 0, 0.15)}`;
      }

      /* Phase 5: Hero content staggered fade-in (55% → 85%) */
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

      /* Phase 6: Bottom fade */
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

  /* ═══════════════════ RENDER ═══════════════════ */
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

        {/* ── Explosion items — LOGOS ONLY with brand colors ── */}
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
                className="explosion-item-inner pointer-events-auto relative flex items-center justify-center"
                style={{
                  "--drift-y": item.driftY,
                  "--drift-dur": item.driftDuration,
                  width: item.ring === "inner" ? "52px" : item.ring === "mid" ? "46px" : "40px",
                  height: item.ring === "inner" ? "52px" : item.ring === "mid" ? "46px" : "40px",
                } as React.CSSProperties}
              >
                {/* Glassmorphism logo card */}
                <div
                  className="logo-card w-full h-full rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: `rgba(${parseInt(item.color.slice(0,2),16)}, ${parseInt(item.color.slice(2,4),16)}, ${parseInt(item.color.slice(4,6),16)}, 0.08)`,
                    border: `1px solid rgba(${parseInt(item.color.slice(0,2),16)}, ${parseInt(item.color.slice(2,4),16)}, ${parseInt(item.color.slice(4,6),16)}, 0.2)`,
                    backdropFilter: "blur(12px)",
                    boxShadow: `0 0 20px rgba(${parseInt(item.color.slice(0,2),16)}, ${parseInt(item.color.slice(2,4),16)}, ${parseInt(item.color.slice(4,6),16)}, 0.12), inset 0 1px 0 rgba(255,255,255,0.06)`,
                  }}
                >
                  <img
                    src={`https://cdn.simpleicons.org/${item.slug}/${item.color}`}
                    alt={item.label}
                    className="object-contain"
                    style={{
                      width: item.ring === "inner" ? "26px" : item.ring === "mid" ? "22px" : "18px",
                      height: item.ring === "inner" ? "26px" : item.ring === "mid" ? "22px" : "18px",
                      filter: `drop-shadow(0 0 8px rgba(${parseInt(item.color.slice(0,2),16)}, ${parseInt(item.color.slice(2,4),16)}, ${parseInt(item.color.slice(4,6),16)}, 0.5))`,
                    }}
                    loading="lazy"
                  />
                </div>
                {/* Tooltip on hover */}
                <div className="logo-tooltip absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-medium text-white/60 whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none">
                  {item.label}
                </div>
              </div>
            </div>
          ))}

          {/* ══ Liquid Balloon Glass 3D "BUILD" Text ══ */}
          <div
            ref={buildContainerRef}
            className="absolute top-1/2 left-1/2 flex items-center justify-center pointer-events-none select-none"
            style={{
              transform: "translate(-50%, -50%)",
              zIndex: 20,
              willChange: "transform, opacity, filter",
            }}
          >
            <div className="build-word flex items-center" style={{ perspective: "1200px" }}>
              {BUILD_LETTERS.map((letter, i) => (
                <span
                  key={letter + i}
                  className={cn("build-letter", buildVisible && "build-letter--in")}
                  style={{ "--i": i } as React.CSSProperties}
                  data-letter={letter}
                >
                  {letter}
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
            <a href="#contact" className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_25px_rgba(119,253,118,0.3)] text-center w-full sm:w-auto shrink-0 pointer-events-auto">
              Start a Project
            </a>
            <a href="#work" className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest bg-white/[0.05] border border-white/10 text-white hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer text-center w-full sm:w-auto flex items-center justify-center gap-2 shrink-0 backdrop-blur-sm pointer-events-auto">
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

      {/* ═══════════════════ STYLES ═══════════════════ */}
      <style>{`
        /* ── Parallax vars ── */
        .explosion-item { --pf:0; --px:0px; --py:0px; }

        /* ── Float when settled ── */
        .explosion-item.settled .explosion-item-inner {
          animation: drift var(--drift-dur, 4s) ease-in-out infinite;
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(var(--drift-y, -5px)); }
        }

        /* ── Logo tooltip on hover ── */
        .explosion-item-inner:hover .logo-tooltip { opacity: 1; }
        .explosion-item-inner:hover .logo-card { transform: scale(1.12); }

        /* ══════════════════════════════════════════════
           LIQUID BALLOON GLASS TEXT
           ══════════════════════════════════════════════ */

        .build-letter {
          display: inline-block;
          position: relative;
          font-family: 'Titan One', system-ui, sans-serif;
          font-size: clamp(6rem, 16vw, 15rem);
          line-height: 1.1;
          letter-spacing: 0.03em;
          color: transparent;
          transform-style: preserve-3d;
          
          /* Entrance Animation (Pop in like balloons) */
          opacity: 0;
          transform: scale(0.4) translateY(60px) rotate(-10deg);
          transition: all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
          transition-delay: calc(0.1s + var(--i) * 0.12s);
        }

        .build-letter--in {
          opacity: 1;
          transform: scale(1) translateY(0) rotate(0deg);
        }

        /* ── FRONT FACE: Glass gradient fill + Balloon Stroke ── */
        .build-letter::before {
          content: attr(data-letter);
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          
          /* Highly transparent bubble glass gradient */
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 0.15) 15%,
            rgba(255, 255, 255, 0.0) 50%,
            rgba(255, 255, 255, 0.05) 85%,
            rgba(255, 255, 255, 0.5) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          
          /* Inner highlight simulating a bevel */
          filter: drop-shadow(0 -4px 6px rgba(255, 255, 255, 0.3))
                  drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));

          /* Thick shiny stroke for the bubble edge */
          -webkit-text-stroke: 3px rgba(255, 255, 255, 0.85);
          z-index: 2;
        }

        /* ── BACKGROUND: Thick Liquid 3D Extrusion ── */
        .build-letter::after {
          content: attr(data-letter);
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0;
          z-index: 1;

          /* Faint transparent liquid 3D shadow stack */
          text-shadow:
            0px 1px 0 rgba(255, 255, 255, 0.15),
            0px 2px 0 rgba(255, 255, 255, 0.10),
            0px 3px 0 rgba(255, 255, 255, 0.08),
            0px 4px 0 rgba(255, 255, 255, 0.05),
            0px 5px 0 rgba(255, 255, 255, 0.03),
            0px 6px 0 rgba(255, 255, 255, 0.02),
            0px 8px 10px rgba(0, 0, 0, 0.2),
            0px 15px 25px rgba(0, 0, 0, 0.15),
            0px 30px 60px rgba(119, 253, 118, 0.20);
        }

        /* ── SHINE SWEEP across glass ── */
        .build-letter--in::before {
          animation: glassShine 4s ease-in-out 1.5s infinite;
        }

        @keyframes glassShine {
          0%, 100% {
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.8) 0%,
              rgba(255, 255, 255, 0.15) 15%,
              rgba(255, 255, 255, 0.0) 50%,
              rgba(255, 255, 255, 0.05) 85%,
              rgba(255, 255, 255, 0.5) 100%
            );
            -webkit-background-clip: text;
            background-clip: text;
          }
          50% {
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.95) 0%,
              rgba(255, 255, 255, 0.40) 25%,
              rgba(255, 255, 255, 0.15) 50%,
              rgba(255, 255, 255, 0.40) 75%,
              rgba(255, 255, 255, 0.8) 100%
            );
            -webkit-background-clip: text;
            background-clip: text;
          }
        }

        /* Subtle balloon bobbing animation */
        .build-word:has(.build-letter--in) {
          animation: balloonBob 6s ease-in-out 1s infinite;
        }
        
        @keyframes balloonBob {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.01); }
        }
      `}</style>
    </div>
  );
}
