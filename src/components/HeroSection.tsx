import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ── TYPES ──
type Token = { text: string; colorClass: string };
type Line = { id: number; tokens: Token[]; uiElementId: number | null };
type SceneConfig = {
  id: string;
  title: string;
  filename: string;
  device: "browser" | "mobile";
  lines: Line[];
};

// ── TOKENIZER ──
function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let remaining = code;
  
  while (remaining.length > 0) {
    let match = remaining.match(/^(\/\/.*)/);
    if (match) {
      tokens.push({ text: match[1], colorClass: "text-muted-foreground/40 italic" });
      remaining = remaining.slice(match[1].length);
      continue;
    }
    match = remaining.match(/^("[^"]*")/);
    if (match) {
      tokens.push({ text: match[1], colorClass: "text-[#a5d6ff]" });
      remaining = remaining.slice(match[1].length);
      continue;
    }
    match = remaining.match(/^(export default function|return|const|export|default)\b/);
    if (match) {
      tokens.push({ text: match[1], colorClass: "text-[#ff7b72]" });
      remaining = remaining.slice(match[1].length);
      continue;
    }
    match = remaining.match(/^(<\/?)([A-Z][A-Za-z0-9]*)/);
    if (match) {
      tokens.push({ text: match[1], colorClass: "text-foreground/70" });
      tokens.push({ text: match[2], colorClass: "text-[#ffa657]" });
      remaining = remaining.slice(match[0].length);
      continue;
    }
    match = remaining.match(/^(<\/?)([a-z][a-z0-9]*)/);
    if (match) {
      tokens.push({ text: match[1], colorClass: "text-foreground/70" });
      tokens.push({ text: match[2], colorClass: "text-[#7ee787]" });
      remaining = remaining.slice(match[0].length);
      continue;
    }
    match = remaining.match(/^([a-zA-Z0-9_]+)=/);
    if (match) {
      tokens.push({ text: match[1], colorClass: "text-[#79c0ff]" });
      tokens.push({ text: "=", colorClass: "text-foreground/70" });
      remaining = remaining.slice(match[0].length);
      continue;
    }
    match = remaining.match(/^([^{}<"/\w\s]+|[\w\s]+?(?=[{<"/]|\b(?:export|default|function|return|const)\b|$))/);
    if (match) {
      tokens.push({ text: match[1], colorClass: "text-foreground/70" });
      remaining = remaining.slice(match[1].length);
      continue;
    }
    tokens.push({ text: remaining[0], colorClass: "text-foreground/70" });
    remaining = remaining.slice(1);
  }
  return tokens;
}

function processScene(rawCode: string, lineMappings: Record<number, number>): Line[] {
  return rawCode.split('\n').map((lineText, i) => ({
    id: i,
    tokens: tokenize(lineText),
    uiElementId: lineMappings[i] ?? null
  }));
}

// ── DATA ──
const rawScene1 = `// Startup landing page hero
export default function HeroSection() {
  return (
    <section className="hero-wrapper">
      <Navbar logo="Launchpad" />
      <div className="hero-content">
        <span className="badge">Now in Beta</span>
        <h1 className="headline">
          Ship faster than
          <br />
          your competitors.
        </h1>
        <p className="subtext">
          The all-in-one platform for
          modern startup teams.
        </p>
        <div className="cta-group">
          <button className="btn-primary">
            Get Started Free
          </button>
          <button className="btn-outline">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  )
}`;
const scene1Mappings: Record<number, number> = { 4: 0, 6: 1, 8: 2, 10: 3, 13: 4, 14: 5, 17: 6, 20: 7 };

const rawScene2 = `// Mobile onboarding screen
export default function OnboardingScreen() {
  return (
    <div className="screen-wrapper">
      <div className="status-bar" />
      <div className="illustration-area">
        <AppIllustration />
      </div>
      <div className="content-area">
        <h2 className="onboard-title">
          Track everything.
          Stress nothing.
        </h2>
        <p className="onboard-body">
          Your tasks, goals and habits
          in one clean space.
        </p>
        <ProgressDots active={0} />
        <button className="btn-primary full">
          Get Started
        </button>
        <p className="sign-in-link">
          Already have an account?
        </p>
      </div>
    </div>
  )
}`;
const scene2Mappings: Record<number, number> = { 4: 0, 6: 1, 10: 2, 11: 3, 14: 4, 15: 5, 17: 6, 19: 7, 22: 8 };

const rawScene3 = `// SaaS analytics dashboard
export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar>
        <NavItem icon="home" label="Overview" />
        <NavItem icon="chart" label="Analytics" />
        <NavItem icon="users" label="Customers" />
        <NavItem icon="settings" label="Settings" />
      </Sidebar>
      <main className="main-content">
        <TopBar title="Overview" />
        <div className="stats-grid">
          <StatCard label="Revenue" value="$48,200" />
          <StatCard label="Users" value="3,842" />
          <StatCard label="Churn" value="1.4%" />
        </div>
        <RevenueChart />
        <RecentActivity />
      </main>
    </div>
  )
}`;
const scene3Mappings: Record<number, number> = { 4: 0, 11: 1, 13: 2, 14: 3, 15: 4, 17: 5, 18: 6 };

const SCENES: SceneConfig[] = [
  { id: "landing", title: "Landing Page", filename: "HeroSection.tsx", device: "browser", lines: processScene(rawScene1, scene1Mappings) },
  { id: "mobile", title: "Mobile App", filename: "OnboardingScreen.tsx", device: "mobile", lines: processScene(rawScene2, scene2Mappings) },
  { id: "dashboard", title: "Dashboard", filename: "Dashboard.tsx", device: "browser", lines: processScene(rawScene3, scene3Mappings) }
];

const CYCLE_DURATION = 8000;
const CHAR_TYPING_MS = 28;
const LINE_PAUSE_MS = 150;

// ── COMPONENT ──
export function HeroSection() {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<Line[]>([]);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [revealedElements, setRevealedElements] = useState<number[]>([]);
  const [isResetting, setIsResetting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeScene = SCENES[activeSceneIndex];

  // Typing Loop
  useEffect(() => {
    if (isResetting) return;

    const currentLine = activeScene.lines[activeLineIndex];
    if (!currentLine) return; // Finished typing all lines

    const totalChars = currentLine.tokens.reduce((acc, t) => acc + t.text.length, 0);

    if (typedChars < totalChars) {
      const timer = setTimeout(() => {
        setTypedChars(prev => prev + 1);
      }, CHAR_TYPING_MS);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        if (currentLine.uiElementId !== null && !revealedElements.includes(currentLine.uiElementId)) {
          setRevealedElements(prev => [...prev, currentLine.uiElementId as number]);
        }
        setDisplayedLines(prev => [...prev, currentLine]);
        setActiveLineIndex(prev => prev + 1);
        setTypedChars(0);
      }, LINE_PAUSE_MS);
      return () => clearTimeout(timer);
    }
  }, [activeScene, activeLineIndex, typedChars, isResetting, revealedElements]);

  // Scroll to active line
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [activeLineIndex]);

  // Master Cycle Loop
  useEffect(() => {
    const cycleTimer = setTimeout(() => {
      setIsResetting(true);
      
      // Wait for fade out
      setTimeout(() => {
        setActiveSceneIndex(prev => (prev + 1) % SCENES.length);
        setDisplayedLines([]);
        setActiveLineIndex(0);
        setTypedChars(0);
        setRevealedElements([]);
        setIsResetting(false);
      }, 400);

    }, CYCLE_DURATION);

    return () => clearTimeout(cycleTimer);
  }, [activeSceneIndex]);

  const handleDotClick = (index: number) => {
    setIsResetting(true);
    setTimeout(() => {
      setActiveSceneIndex(index);
      setDisplayedLines([]);
      setActiveLineIndex(0);
      setTypedChars(0);
      setRevealedElements([]);
      setIsResetting(false);
    }, 400);
  };

  const showMobileDevice = activeScene.device === 'mobile' && !isMobile;

  return (
    <section className="relative min-h-screen bg-hero-bg overflow-hidden flex flex-col">
      {/* Top split panel */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[70vh]">
        
        {/* Left: Code Editor */}
        <div className="relative bg-[#0d0d0d] border-b md:border-b-0 md:border-r border-border flex flex-col h-[45vh] md:h-auto">
          {/* Editor Chrome */}
          <div className="bg-[#111111] border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="bg-secondary/60 text-muted-foreground text-xs px-4 py-1 rounded-md border border-border transition-opacity duration-300">
              {activeScene.filename}
            </div>
            <div className="text-muted-foreground/30 text-[10px] uppercase tracking-widest hidden sm:block">
              CODEXGEN STUDIO
            </div>
          </div>
          
          {/* Editor Body */}
          <div 
            ref={editorRef}
            className={cn(
              "flex-1 overflow-y-auto px-4 py-5 font-mono text-[11px] md:text-[13px] leading-[1.8] relative scrollbar-hide",
              "transition-opacity duration-400",
              isResetting ? "opacity-0" : "opacity-100"
            )}
          >
            {/* Gutter */}
            <div className="absolute left-0 top-0 bottom-0 w-10 border-r border-border/40 flex flex-col items-end pr-2 pt-5 select-none pointer-events-none text-muted-foreground/20 text-[11px] font-mono">
              {activeScene.lines.map((_, i) => (
                <div key={i} style={{ height: "calc(1.8 * 1em)" }}>{i + 1}</div>
              ))}
            </div>

            {/* Code Lines */}
            <div className="pl-10">
              {displayedLines.map((line) => (
                <div key={line.id} className="whitespace-pre">
                  <TypedLine line={line} typedChars={Infinity} />
                </div>
              ))}
              
              {activeScene.lines[activeLineIndex] && (
                <div ref={activeLineRef} className="whitespace-pre">
                  <TypedLine line={activeScene.lines[activeLineIndex]} typedChars={typedChars} />
                  <span className="w-[6px] md:w-[8px] h-[1em] bg-primary inline-block ml-[1px] animate-[pulse_1s_infinite] align-middle" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Device Preview */}
        <div className="relative bg-hero-bg flex items-center justify-center overflow-hidden p-8 md:p-12 h-[45vh] md:h-auto">
          {/* Radial Glow */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, hsl(119,99%,46%,0.05) 0%, transparent 65%)" }}
          />

          {/* Device Frame */}
          <div 
            className={cn(
              "relative shadow-2xl shadow-black/60 overflow-hidden transition-all duration-300 mx-auto",
              isResetting ? "opacity-0 scale-95" : "opacity-100 scale-100",
              showMobileDevice 
                ? "w-[220px] rounded-[2.5rem] border-[6px] border-[#1a1a1a] bg-[#0a0a0a]" 
                : cn(
                    "w-full rounded-xl border border-border bg-[#111111]",
                    activeScene.id === 'dashboard' ? "max-w-[480px]" : "max-w-[420px]"
                  )
            )}
          >
            {/* Chrome */}
            {showMobileDevice ? (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#1a1a1a] rounded-b-xl z-20" />
            ) : (
              <div className="bg-[#1a1a1a] border-b border-border px-3 py-2.5 flex items-center gap-2 shrink-0">
                <div className="flex gap-1.5 opacity-50">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="bg-secondary/40 rounded-md flex-1 mx-3 py-1 px-3 text-[10px] text-muted-foreground/40 text-center font-mono tracking-wider">
                  launchpad.io
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className={cn(
              "relative overflow-hidden bg-[#0a0a0a] w-full",
              showMobileDevice ? "min-h-[380px] p-4" : (activeScene.id === 'dashboard' ? "min-h-[320px] p-5" : "min-h-[280px] p-5")
            )}>
              {/* RENDER UI ELEMENTS based on activeScene and revealedElements */}
              {activeScene.id === 'landing' && (
                <div className="flex flex-col gap-4">
                  <UIElement show={revealedElements.includes(0)} className="h-8 bg-white/5 rounded-md w-full shrink-0" />
                  <div className="flex flex-col items-center text-center mt-2">
                    <UIElement show={revealedElements.includes(1)} className="bg-primary/20 text-[9px] px-2 py-0.5 rounded-full w-fit mb-4">
                      <div className="w-12 h-1 bg-primary/40 rounded" />
                    </UIElement>
                    <UIElement show={revealedElements.includes(2)} className="h-4 bg-foreground/80 rounded w-4/5" />
                    <UIElement show={revealedElements.includes(3)} className="h-4 bg-foreground/80 rounded w-3/5 mt-1.5" />
                    <UIElement show={revealedElements.includes(4)} className="h-2.5 bg-foreground/20 rounded w-full mt-5" />
                    <UIElement show={revealedElements.includes(5)} className="h-2.5 bg-foreground/20 rounded w-4/5 mt-1.5" />
                    <div className="flex items-center gap-2 mt-6">
                      <UIElement show={revealedElements.includes(6)} className="h-8 bg-primary rounded-md w-28 shrink-0" />
                      <UIElement show={revealedElements.includes(7)} className="h-8 border border-border rounded-md w-24 shrink-0" />
                    </div>
                  </div>
                </div>
              )}

              {activeScene.id === 'mobile' && (
                <div className="flex flex-col">
                  <UIElement show={revealedElements.includes(0)} className="h-3 bg-white/5 rounded w-full shrink-0" />
                  <UIElement show={revealedElements.includes(1)} className="h-28 bg-secondary/60 rounded-2xl w-full mt-4 shrink-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border-4 border-white/10" />
                  </UIElement>
                  <div className="flex flex-col text-center mt-6">
                    <UIElement show={revealedElements.includes(2)} className="h-4 bg-foreground/80 rounded w-4/5 mx-auto" />
                    <UIElement show={revealedElements.includes(3)} className="h-4 bg-foreground/80 rounded w-3/5 mx-auto mt-1.5" />
                    <UIElement show={revealedElements.includes(4)} className="h-2.5 bg-foreground/20 rounded w-full mt-4" />
                    <UIElement show={revealedElements.includes(5)} className="h-2.5 bg-foreground/20 rounded w-3/4 mx-auto mt-1.5" />
                    <UIElement show={revealedElements.includes(6)} className="flex items-center justify-center gap-1.5 mt-5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    </UIElement>
                    <UIElement show={revealedElements.includes(7)} className="h-10 bg-primary rounded-xl w-full mt-6 shrink-0" />
                    <UIElement show={revealedElements.includes(8)} className="h-2 bg-foreground/10 rounded w-1/2 mx-auto mt-4 shrink-0" />
                  </div>
                </div>
              )}

              {activeScene.id === 'dashboard' && (
                <div className="flex h-full">
                  <UIElement show={revealedElements.includes(0)} className="absolute left-0 top-0 bottom-0 w-14 bg-secondary/40 border-r border-border flex flex-col items-center py-4 gap-3">
                    <div className="w-6 h-6 rounded bg-primary/20 mb-4" />
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-5 h-5 rounded bg-white/10" style={{ opacity: revealedElements.includes(0) ? 1 : 0, transition: `opacity 0.3s ease ${i * 0.1}s` }} />
                    ))}
                  </UIElement>
                  <div className="pl-14 w-full flex flex-col">
                    <UIElement show={revealedElements.includes(1)} className="h-8 bg-secondary/20 border-b border-border w-full shrink-0" />
                    <div className="flex gap-2 mt-4">
                      <UIElement show={revealedElements.includes(2)} className="h-16 bg-secondary/60 rounded-lg border border-border flex-1 shrink-0" />
                      <UIElement show={revealedElements.includes(3)} className="h-16 bg-secondary/60 rounded-lg border border-border flex-1 shrink-0 delay-75" />
                      <UIElement show={revealedElements.includes(4)} className="h-16 bg-secondary/60 rounded-lg border border-border flex-1 shrink-0 delay-150" />
                    </div>
                    <UIElement show={revealedElements.includes(5)} className="h-24 bg-secondary/30 rounded-lg border border-border mt-4 p-2 relative overflow-hidden shrink-0">
                      <svg viewBox="0 0 100 40" className="absolute bottom-0 left-0 w-full h-full preserve-3d" preserveAspectRatio="none">
                        <polyline 
                          points="0,40 20,30 40,35 60,15 80,20 100,5" 
                          fill="none" 
                          stroke="hsl(var(--primary) / 0.6)" 
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="150"
                          strokeDashoffset={revealedElements.includes(5) ? "0" : "150"}
                          className="transition-all duration-700 ease-out delay-200"
                        />
                      </svg>
                    </UIElement>
                    <div className="flex flex-col gap-2 mt-4">
                      {[...Array(3)].map((_, i) => (
                        <UIElement key={i} show={revealedElements.includes(6)} className="h-5 bg-secondary/20 rounded w-full shrink-0" style={{ transitionDelay: \`\${i * 0.1}s\` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scene Controller Indicators */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
            <div className="flex items-center gap-1.5">
              {SCENES.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => handleDotClick(idx)}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all cursor-pointer",
                    activeSceneIndex === idx ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={\`View \${scene.title} scene\`}
                />
              ))}
            </div>
            <div className="text-muted-foreground/40 text-[10px] uppercase tracking-widest font-mono ml-2 transition-opacity duration-300">
              {activeScene.title}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Hero Copy */}
      <div 
        className="relative z-10 text-center md:text-left px-6 md:px-16 py-12 md:py-16 border-t border-border bg-hero-bg flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-up"
        style={{ animationDelay: "600ms", animationFillMode: "both" }}
      >
        <div className="flex flex-col items-center md:items-start max-w-2xl">
          <div className="bg-primary/10 text-primary border border-primary/20 text-[10px] uppercase tracking-[0.25em] px-4 py-1.5 rounded-full inline-flex font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.4)] mb-6">
            Digital Product Studio
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight uppercase text-white">
            We build what <br className="hidden md:block" /> startups <span className="text-primary">ship.</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-lg font-light leading-relaxed mt-4">
            Websites. Prototypes. UI/UX.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4 shrink-0">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto font-bold">
            <a href="#contact" className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_25px_rgba(119,253,118,0.3)] text-center w-full sm:w-auto shrink-0">
              Start a Project
            </a>
            <a href="#work" className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest bg-white/[0.05] border border-white/10 text-white hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer text-center w-full sm:w-auto flex items-center justify-center gap-2 shrink-0 backdrop-blur-sm">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              See Our Work
            </a>
          </div>
          <p className="text-muted-foreground/50 text-xs font-light tracking-wide mt-2">
            India &amp; USA · 40+ projects · Design to deployment
          </p>
        </div>
      </div>

      {/* Transition to Section 2 */}
      <div 
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
        style={{
          height: "120px",
          background: "linear-gradient(to bottom, transparent 0%, hsl(var(--hero-bg)) 100%)",
        }}
      />
    </section>
  );
}

// ── HELPERS ──

function TypedLine({ line, typedChars }: { line: Line; typedChars: number }) {
  let charsRemaining = typedChars;
  
  return (
    <>
      {line.tokens.map((token, i) => {
        if (charsRemaining <= 0) return null;
        
        let textToRender = token.text;
        if (charsRemaining < token.text.length) {
          textToRender = token.text.substring(0, charsRemaining);
        }
        charsRemaining -= token.text.length;
        
        return (
          <span key={i} className={token.colorClass}>
            {textToRender}
          </span>
        );
      })}
    </>
  );
}

function UIElement({ 
  show, 
  className, 
  children,
  style
}: { 
  show: boolean; 
  className?: string; 
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div 
      className={cn(
        className,
        "transition-all duration-300 ease-out will-change-transform will-change-opacity",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
      style={style}
    >
      {children}
    </div>
  );
}
