import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

const stars = [
  { top: "8%", left: "12%", delay: "0.2s", size: 1 },
  { top: "14%", left: "28%", delay: "1.5s", size: 1.5 },
  { top: "5%", left: "48%", delay: "0.8s", size: 1 },
  { top: "19%", left: "68%", delay: "2.1s", size: 2 },
  { top: "11%", left: "88%", delay: "0.4s", size: 1 },
  { top: "25%", left: "8%", delay: "1.7s", size: 1.5 },
  { top: "32%", left: "24%", delay: "2.9s", size: 1 },
  { top: "22%", left: "42%", delay: "0.9s", size: 2 },
  { top: "28%", left: "58%", delay: "1.3s", size: 1.2 },
  { top: "35%", left: "78%", delay: "2.5s", size: 1 },
  { top: "42%", left: "92%", delay: "0.7s", size: 1.5 },
  { top: "48%", left: "15%", delay: "1.1s", size: 2 },
  { top: "52%", left: "38%", delay: "2.3s", size: 1 },
  { top: "58%", left: "62%", delay: "0.5s", size: 1.5 },
  { top: "46%", left: "82%", delay: "1.8s", size: 1 },
  { top: "64%", left: "6%", delay: "2.7s", size: 1.2 },
  { top: "72%", left: "22%", delay: "0.3s", size: 2 },
  { top: "80%", left: "45%", delay: "1.6s", size: 1 },
  { top: "68%", left: "75%", delay: "2.2s", size: 1.5 },
  { top: "78%", left: "90%", delay: "0.9s", size: 1 },
  { top: "88%", left: "14%", delay: "1.4s", size: 2 },
  { top: "92%", left: "32%", delay: "2.6s", size: 1 },
  { top: "85%", left: "54%", delay: "0.2s", size: 1.5 },
  { top: "90%", left: "78%", delay: "1.9s", size: 1.2 },
  { top: "95%", left: "94%", delay: "2.8s", size: 1 },
];

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

const buildItemsConfig = (): ExplosionItem[] => {
  const INNER_ITEMS = [
    { label: "UI/UX Design", slug: "figma" },
    { label: "Web Development", slug: "react" },
    { label: "App Prototypes", slug: "nextdotjs" },
    { label: "Figma", slug: "figma" },
    { label: "React", slug: "react" },
    { label: "Next.js", slug: "nextdotjs" },
    { label: "Framer", slug: "framer" },
    { label: "Tailwind CSS", slug: "tailwindcss" },
  ];

  const MID_ITEMS = [
    { label: "TypeScript", slug: "typescript", hideOnMobile: false },
    { label: "Supabase", slug: "supabase", hideOnMobile: false },
    { label: "Node.js", slug: "nodedotjs", hideOnMobile: false },
    { label: "Webflow", slug: "webflow", hideOnMobile: false },
    { label: "Spline", slug: "spline", hideOnMobile: false },
    { label: "Shopify", slug: "shopify", hideOnMobile: true },
    { label: "Storybook", slug: "storybook", hideOnMobile: true },
    { label: "Lottie", slug: "lottiefiles", hideOnMobile: true },
    { label: "REST APIs", slug: "postman", hideOnMobile: true },
    { label: "Vercel", slug: "vercel", hideOnMobile: false },
    { label: "Firebase", slug: "firebase", hideOnMobile: false },
    { label: "Prisma", slug: "prisma", hideOnMobile: false },
  ];

  const OUTER_ITEMS = [
    { label: "Fast Delivery", slug: "vercel" },
    { label: "Clean Handoff", slug: "github" },
    { label: "Mobile First", slug: "apple" },
    { label: "SEO Ready", slug: "google" },
    { label: "Startup Focused", slug: "stripe" },
    { label: "Design Systems", slug: "figma" },
    { label: "India & USA", slug: "cloudflare" },
    { label: "Zero Lock-in", slug: "docker" },
  ];

  const config: ExplosionItem[] = [];

  // Inner ring
  INNER_ITEMS.forEach((item, idx) => {
    const angleDeg = idx * 45;
    const angleRad = (angleDeg * Math.PI) / 180;
    const rVw = 18;
    const rVh = 18;
    const txVal = Number((rVw * Math.cos(angleRad)).toFixed(2));
    const tyVal = Number((rVh * Math.sin(angleRad)).toFixed(2));
    const txMobileVal = Number((rVw * 0.6 * Math.cos(angleRad)).toFixed(2));
    const tyMobileVal = Number((rVh * 0.6 * Math.sin(angleRad)).toFixed(2));

    config.push({
      label: item.label,
      slug: item.slug,
      ring: "inner",
      txVal,
      tyVal,
      txMobileVal,
      tyMobileVal,
      finalOpacity: 0.8,
      driftY: `${(-8 + (idx * 3.7) % 16).toFixed(1)}px`,
      driftDuration: `${(3 + (idx * 1.3) % 3).toFixed(1)}s`,
    });
  });

  // Mid ring
  MID_ITEMS.forEach((item, idx) => {
    const angleDeg = 22.5 + idx * 30;
    const angleRad = (angleDeg * Math.PI) / 180;
    const rVw = 34;
    const rVh = 32;
    const txVal = Number((rVw * Math.cos(angleRad)).toFixed(2));
    const tyVal = Number((rVh * Math.sin(angleRad)).toFixed(2));
    const txMobileVal = Number((rVw * 0.6 * Math.cos(angleRad)).toFixed(2));
    const tyMobileVal = Number((rVh * 0.6 * Math.sin(angleRad)).toFixed(2));

    config.push({
      label: item.label,
      slug: item.slug,
      ring: "mid",
      txVal,
      tyVal,
      txMobileVal,
      tyMobileVal,
      finalOpacity: 0.6,
      driftY: `${(-8 + (idx * 4.3) % 16).toFixed(1)}px`,
      driftDuration: `${(3 + (idx * 1.7) % 3).toFixed(1)}s`,
      hideOnMobile: item.hideOnMobile,
    });
  });

  // Outer ring
  OUTER_ITEMS.forEach((item, idx) => {
    const angleDeg = 11.25 + idx * 45;
    const angleRad = (angleDeg * Math.PI) / 180;
    const rVw = 44;
    const rVh = 42;
    const txVal = Number((rVw * Math.cos(angleRad)).toFixed(2));
    const tyVal = Number((rVh * Math.sin(angleRad)).toFixed(2));
    const txMobileVal = Number((rVw * 0.6 * Math.cos(angleRad)).toFixed(2));
    const tyMobileVal = Number((rVh * 0.6 * Math.sin(angleRad)).toFixed(2));

    config.push({
      label: item.label,
      slug: item.slug,
      ring: "outer",
      txVal,
      tyVal,
      txMobileVal,
      tyMobileVal,
      finalOpacity: 0.4,
      driftY: `${(-8 + (idx * 5.1) % 16).toFixed(1)}px`,
      driftDuration: `${(3 + (idx * 1.9) % 3).toFixed(1)}s`,
    });
  });

  return config;
};

const EXPLOSION_ITEMS = buildItemsConfig();

export function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bottomFadeRef = useRef<HTMLDivElement>(null);
  const wordContainerRef = useRef<HTMLDivElement>(null);
  const shockwave1Ref = useRef<SVGCircleElement>(null);
  const shockwave2Ref = useRef<SVGCircleElement>(null);

  // Mouse Parallax Effect (desktop only)
  useEffect(() => {
    if (window.innerWidth < 768) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = e.clientX - centerX;
      targetY = e.clientY - centerY;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const stickyEl = document.getElementById("hero-sticky");
      if (stickyEl) {
        stickyEl.style.setProperty("--mouse-x", currentX.toFixed(2));
        stickyEl.style.setProperty("--mouse-y", currentY.toFixed(2));
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Scroll Pinned Animations Drive
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate active scroll offset relative to page layout
      const scrollY = window.scrollY - (wrapper.offsetTop || 0);
      const totalScrollable = wrapperHeight - windowHeight;
      if (totalScrollable <= 0) return;
      const scrollProgress = clamp(scrollY / totalScrollable, 0, 1);

      const isMobile = window.innerWidth < 768;

      // 1. "BUILD" text sink animation (0.0% -> 25.0%)
      if (wordContainerRef.current) {
        const sinkProgress = clamp(scrollProgress / 0.25, 0, 1);
        const scale = 1 - (0.4 * sinkProgress); // Scales down from 1 to 0.6
        const opacity = 1 - Math.pow(sinkProgress, 2); // Fades out completely

        wordContainerRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
        wordContainerRef.current.style.opacity = opacity.toString();
        // Slightly blur it out as it sinks for depth
        wordContainerRef.current.style.filter = `blur(${sinkProgress * 10}px)`;
      }

      // 2. Morph scattered text into logos (15.0% -> 35.0%)
      const morphProgress = clamp((scrollProgress - 0.15) / 0.20, 0, 1);
      wrapper.style.setProperty("--morph-progress", morphProgress.toString());

      // 3. Shockwave Rings (18.0% -> 35.0%)
      const swP1 = clamp((scrollProgress - 0.18) / 0.17, 0, 1);
      if (shockwave1Ref.current) {
        shockwave1Ref.current.setAttribute("r", `${swP1 * 55}vw`);
        shockwave1Ref.current.style.opacity = (1 - swP1).toString();
      }

      const swP2 = clamp((scrollProgress - 0.22) / 0.17, 0, 1);
      if (shockwave2Ref.current) {
        shockwave2Ref.current.setAttribute("r", `${swP2 * 55}vw`);
        shockwave2Ref.current.style.opacity = (1 - swP2).toString();
      }

      // 4. Logo Explosion Trajectories (0.0% -> 75.0%)
      EXPLOSION_ITEMS.forEach((item, idx) => {
        const element = itemRefs.current[idx];
        if (!element) return;

        // Verify if logo is omitted for mobile layout
        const isHidden = (item.ring === "outer" || item.hideOnMobile) && isMobile;
        if (isHidden) {
          element.style.display = "none";
          return;
        } else {
          element.style.display = "";
        }

        if (scrollProgress <= 0.75) {
          const start = 0.05 + idx * 0.007; // Staggered start slightly after scroll begins
          const duration = 0.75 - start;
          const itemProgress = clamp((scrollProgress - start) / duration, 0, 1);
          // Strong exponential ease-out for a snappy fly-out
          const eased = itemProgress === 1 ? 1 : 1 - Math.pow(2, -10 * itemProgress);
          
          const tx = isMobile ? item.txMobileVal : item.txVal;
          const ty = isMobile ? item.tyMobileVal : item.tyVal;
          
          element.style.transform = `translate(calc(-50% + ${tx * eased}vw), calc(-50% + ${ty * eased}vh)) scale(${eased})`;
          element.style.opacity = (eased * item.finalOpacity).toString();
          element.classList.remove("settled");
        } else {
          // Hand off position to drift CSS keyframes and mouse parallax variables
          const tx = isMobile ? item.txMobileVal : item.txVal;
          const ty = isMobile ? item.tyMobileVal : item.tyVal;
          element.style.transform = `translate(calc(-50% + ${tx}vw + var(--parallax-x, 0px)), calc(-50% + ${ty}vh + var(--parallax-y, 0px))) scale(1)`;
          element.style.opacity = item.finalOpacity.toString();
          element.classList.add("settled");
        }
      });

      // 5. Radial Ambient Glow Opacity (0.0% -> 75.0%)
      if (glowRef.current) {
        const glowOpacity = clamp(scrollProgress * 3, 0, 0.12);
        glowRef.current.style.opacity = glowOpacity.toString();
      }

      // 6. Hero Content Fades & Offsets (60.0% -> 85.0%)
      const eyebrowP = clamp((scrollProgress - 0.60) / 0.2, 0, 1);
      const h1P = clamp((scrollProgress - 0.65) / 0.2, 0, 1);
      const subP = clamp((scrollProgress - 0.70) / 0.2, 0, 1);
      const ctaP = clamp((scrollProgress - 0.75) / 0.2, 0, 1);
      const trustP = clamp((scrollProgress - 0.80) / 0.2, 0, 1);

      const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

      if (eyebrowRef.current) {
        const eased = easeOutCubic(eyebrowP);
        eyebrowRef.current.style.opacity = eased.toString();
        eyebrowRef.current.style.transform = `translateY(${(1 - eased) * 24}px)`;
      }
      if (h1Ref.current) {
        const eased = easeOutCubic(h1P);
        h1Ref.current.style.opacity = eased.toString();
        h1Ref.current.style.transform = `translateY(${(1 - eased) * 24}px)`;
      }
      if (subRef.current) {
        const eased = easeOutCubic(subP);
        subRef.current.style.opacity = eased.toString();
        subRef.current.style.transform = `translateY(${(1 - eased) * 24}px)`;
      }
      if (ctaRef.current) {
        const eased = easeOutCubic(ctaP);
        ctaRef.current.style.opacity = eased.toString();
        ctaRef.current.style.transform = `translateY(${(1 - eased) * 24}px)`;
        ctaRef.current.style.pointerEvents = ctaP > 0.5 ? "auto" : "none";
      }
      if (trustRef.current) {
        const eased = easeOutCubic(trustP);
        trustRef.current.style.opacity = eased.toString();
        trustRef.current.style.transform = `translateY(${(1 - eased) * 24}px)`;
      }

      // 7. Transition Bottom Fade Height (85.0% -> 100.0%)
      if (bottomFadeRef.current) {
        const fadeHeight = scrollProgress >= 0.85
          ? 200 + ((scrollProgress - 0.85) / 0.15) * 200
          : 200;
        bottomFadeRef.current.style.height = `${fadeHeight}px`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Initial frame setup
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[200vh] md:h-[300vh] bg-hero-bg">
      {/* Sticky viewport window */}
      <div
        id="hero-sticky"
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none"
        style={{ perspective: "1200px", "--morph-progress": "0" } as React.CSSProperties}
      >
        {/* ── Twinkling Space Starfield Background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {stars.map((star, idx) => (
            <div
              key={idx}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: star.delay,
                animationDuration: `${1.5 + Math.random() * 2}s`,
                opacity: 0.15 + Math.random() * 0.7,
              }}
            />
          ))}

          {/* Ambient Dark Green/Purple Space Dust Glows */}
          <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/[0.03] blur-3xl" />
          <div className="absolute bottom-[10%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-[#805ad5]/[0.025] blur-3xl" />
        </div>

        {/* Shockwave Rings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-1">
          <circle
            ref={shockwave1Ref}
            cx="50%"
            cy="50%"
            r="0vw"
            fill="none"
            stroke="hsl(119,99%,46%)"
            strokeWidth="1.5"
            style={{ opacity: 0, transformOrigin: "center" }}
          />
          <circle
            ref={shockwave2Ref}
            cx="50%"
            cy="50%"
            r="0vw"
            fill="none"
            stroke="hsl(119,99%,46%)"
            strokeWidth="1.0"
            style={{ opacity: 0, transformOrigin: "center" }}
          />
        </svg>

        {/* Layer 0: Explosion Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          {EXPLOSION_ITEMS.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className={cn(
                "explosion-item absolute top-1/2 left-1/2 pointer-events-none select-none"
              )}
              style={{
                "--tx-desktop": `${item.txVal}vw`,
                "--ty-desktop": `${item.tyVal}vh`,
                "--tx-mobile": `${item.txMobileVal}vw`,
                "--ty-mobile": `${item.tyMobileVal}vh`,
                "--final-opacity": item.finalOpacity,
                "--parallax-factor": item.ring === "inner" ? 0.012 : item.ring === "mid" ? 0.007 : 0.003,
                willChange: "transform, opacity",
                opacity: 0,
              } as React.CSSProperties}
            >
              <div
                className="explosion-item-inner pointer-events-auto relative w-0 h-0 flex items-center justify-center"
                style={{
                  "--drift-y": item.driftY,
                  "--drift-duration": item.driftDuration,
                  willChange: "transform",
                } as React.CSSProperties}
              >
                {/* Text Label State */}
                <div className="item-text absolute bg-secondary/60 border border-border backdrop-blur-sm rounded-lg px-3.5 py-2 text-xs font-medium tracking-wide text-muted-foreground whitespace-nowrap select-none hover:border-primary/40 hover:text-foreground transition-colors duration-200">
                  {item.label}
                </div>
                {/* Logo Morph State */}
                <div className="item-logo absolute w-12 h-12 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white/10 transition-colors duration-200">
                  <img 
                    src={`https://cdn.simpleicons.org/${item.slug}/ffffff`} 
                    alt={item.label}
                    className="w-6 h-6 object-contain opacity-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Centered Glass SVG "BUILD" Text */}
          <div
            ref={wordContainerRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center select-none pointer-events-none w-[90vw] md:w-[60vw]"
            style={{ willChange: "transform, opacity, filter" }}
          >
            <svg 
              viewBox="0 0 800 250" 
              className="w-full h-auto overflow-visible drop-shadow-[0_4px_24px_rgba(119,253,118,0.15)]"
            >
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                className="build-glass-text font-black"
                style={{ fontSize: "180px", letterSpacing: "0.02em", fontFamily: "inherit" }}
              >
                BUILD
              </text>
            </svg>
          </div>
        </div>

        {/* Layer 1: Radial Glow */}
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-1"
          style={{
            background: "radial-gradient(ellipse at center, hsl(119,99%,46%,0.07) 0%, transparent 70%)",
            opacity: 0,
            willChange: "opacity",
          }}
        />

        {/* Layer 2: Dark Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, hsl(0,0%,8%,0.85) 100%)",
          }}
        />

        {/* Layer 3: Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6 px-6 text-center pointer-events-none">
          {/* Eyebrow Pill */}
          <div
            ref={eyebrowRef}
            className="bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-[0.25em] px-4 py-1.5 rounded-full inline-flex font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.4)] pointer-events-none"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            Digital Product Studio
          </div>

          {/* Headline */}
          <h1
            ref={h1Ref}
            className="text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[1.0] tracking-[-0.05em] uppercase text-center text-white mt-2 max-w-4xl pointer-events-none"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            We build <br /> what startups <span className="text-primary">ship.</span>
          </h1>

          {/* Subhead */}
          <p
            ref={subRef}
            className="text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl text-center pointer-events-none"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            Websites. Prototypes. UI/UX.
          </p>

          {/* Centered CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 w-full sm:w-auto font-bold pointer-events-none"
            style={{ opacity: 0, willChange: "transform, opacity" }}
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
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              See Our Work
            </a>
          </div>

          {/* Trust stripe */}
          <p
            ref={trustRef}
            className="text-muted-foreground/60 text-xs font-light tracking-wide text-center pointer-events-none mt-4"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            Serving startups in India &amp; USA · 40+ projects delivered · Design to deployment
          </p>
        </div>

        {/* Bottom Fade */}
        <div
          ref={bottomFadeRef}
          className="absolute bottom-0 left-0 right-0 h-[200px] z-20 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, hsl(var(--hero-bg)) 100%)",
            willChange: "height",
          }}
        />
      </div>

      <style>{`
        /* Dynamic Parallax Setup */
        .explosion-item {
          --tx: var(--tx-mobile);
          --ty: var(--ty-mobile);
          --parallax-x: calc(var(--mouse-x, 0) * var(--parallax-factor, 0) * 1px);
          --parallax-y: calc(var(--mouse-y, 0) * var(--parallax-factor, 0) * 1px);
        }

        @media (min-width: 768px) {
          .explosion-item {
            --tx: var(--tx-desktop);
            --ty: var(--ty-desktop);
          }
        }

        /* Float Animation when settled */
        .explosion-item.settled .explosion-item-inner {
          animation: drift var(--drift-duration) ease-in-out infinite;
          animation-delay: 0s;
        }

        @keyframes drift {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(var(--drift-y));
          }
        }

        /* Glassmorphism Text Animation */
        .build-glass-text {
          fill: rgba(255, 255, 255, 0);
          stroke: rgba(255, 255, 255, 0.9);
          stroke-width: 2.5px;
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: drawBuild 2.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes drawBuild {
          0% {
            stroke-dashoffset: 800;
            fill: rgba(255, 255, 255, 0);
          }
          40% {
            stroke-dashoffset: 0;
            fill: rgba(255, 255, 255, 0);
          }
          100% {
            stroke-dashoffset: 0;
            fill: rgba(255, 255, 255, 0.12); /* Glassy translucent fill */
          }
        }

        /* Morphing Logic via CSS Variable */
        .item-text {
          opacity: calc(1 - var(--morph-progress, 0) * 2); /* Fade out faster */
          transform: translate(-50%, -50%) scale(calc(1 - var(--morph-progress, 0)));
          will-change: transform, opacity;
        }
        
        .item-logo {
          opacity: calc(var(--morph-progress, 0) * 2 - 1); /* Fade in later */
          transform: translate(-50%, -50%) scale(var(--morph-progress, 0));
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
