import { ChevronDown, Terminal, Cpu, Zap, Gauge, Sparkles, Globe2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function MatrixRain({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|\\;:\'",./!@#$%^&*()_+-=';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ffff';
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const gradient = ctx.createLinearGradient(x, y - 100, x, y);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
        gradient.addColorStop(0.8, 'rgba(0, 255, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 255, 255, 1)');
        
        ctx.fillStyle = gradient;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-30 hidden sm:block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

function GlitchText({ children, className = "", isActive, prefersReducedMotion }: { children: string; className?: string; isActive: boolean; prefersReducedMotion: boolean }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || !isActive) return;

    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(glitchInterval);
  }, [isActive, prefersReducedMotion]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={`${isGlitching ? 'cyber-glitch' : ''}`}>
        {children}
      </span>
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 text-[#ff00ff] opacity-70"
            style={{ clipPath: 'inset(0 0 50% 0)', transform: 'translate(-2px, -1px)' }}
          >
            {children}
          </span>
          <span 
            className="absolute top-0 left-0 text-[#00ffff] opacity-70"
            style={{ clipPath: 'inset(50% 0 0 0)', transform: 'translate(2px, 1px)' }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

function TypewriterText({ text, delay = 0, prefersReducedMotion }: { text: string; delay?: number; prefersReducedMotion: boolean }) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      setShowCursor(false);
      return;
    }

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [prefersReducedMotion]);

  return (
    <span className="font-mono">
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-[#00ffff]`}>_</span>
    </span>
  );
}

function HexagonGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 hidden sm:block">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon 
              points="25,0 50,14.4 50,43.4 25,57.7 0,43.4 0,14.4" 
              fill="none" 
              stroke="rgba(0,255,255,0.3)" 
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
}

function FloatingIcons({ isActive, prefersReducedMotion }: { isActive: boolean; prefersReducedMotion: boolean }) {
  const icons = [
    { Icon: Terminal, x: '10%', y: '20%', delay: 0 },
    { Icon: Cpu, x: '85%', y: '30%', delay: 1 },
    { Icon: Zap, x: '15%', y: '70%', delay: 2 },
    { Icon: Terminal, x: '80%', y: '75%', delay: 1.5 },
  ];

  return (
    <>
      {icons.map((item, index) => (
        <div
          key={index}
          className="absolute text-[#00ffff] opacity-20 hidden sm:block"
          style={{
            left: item.x,
            top: item.y,
            animation: prefersReducedMotion || !isActive ? 'none' : `float 6s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <item.Icon size={40} />
        </div>
      ))}
    </>
  );
}

function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-16 left-4 sm:left-8 font-mono text-[11px] sm:text-xs text-[#00ffff] opacity-60 space-y-1 hidden sm:block">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-[#00ff66] rounded-full animate-pulse" />
        <span>SYSTEM: ONLINE</span>
      </div>
      <div>TIME: {time.toLocaleTimeString('en-US', { hour12: false })}</div>
      <div>LOCATION: CYBERSPACE</div>
      <div>STATUS: <span className="text-[#00ff66]">ACTIVE</span></div>
    </div>
  );
}

function DataLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ffff] to-transparent opacity-30" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent opacity-20" />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ffff] to-transparent opacity-30" />
      
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#00ffff] to-transparent opacity-20" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#00ffff] to-transparent opacity-20" />
    </div>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSmUp, setIsSmUp] = useState(() => typeof window !== "undefined" ? window.innerWidth >= 640 : false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const onResize = () => setIsSmUp(window.innerWidth >= 640);
    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsHeroVisible(entry.isIntersecting));
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);
  const signalCards = [
    {
      title: "Full-stack Delivery",
      meta: "React • TypeScript • Node • Postgres",
      icon: Sparkles,
    },
    {
      title: "Realtime & AI Native",
      meta: "WebSockets • Background jobs • AI copilots",
      icon: Gauge,
    },
    {
      title: "Experience Design",
      meta: "Motion-first interfaces with 3D flourishes",
      icon: Globe2,
    },
  ];

  const scrollToWork = () => {
    const element = document.getElementById("work");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050508]"
    >
      <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-[#0c111d] via-[#090b12] to-[#050508] bg-noise-soft motion-reduce:animation-none motion-reduce:transition-none" />

      {isSmUp && (
        <>
          <MatrixRain isActive={isHeroVisible} prefersReducedMotion={prefersReducedMotion} />
          <HexagonGrid />
          <FloatingIcons isActive={isHeroVisible} prefersReducedMotion={prefersReducedMotion} />
          <DataLines />
        </>
      )}
      <StatusBar />

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#050508]/50 to-[#050508]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32 text-left md:text-center">
        <div className="space-y-6 sm:space-y-8">
          <div className="inline-block mb-4">
            <div className="cyber-card px-6 py-2 corner-accent">
              <span className="font-mono text-sm text-[#00ffff] tracking-widest">
                <TypewriterText text="// INITIALIZING NEURAL INTERFACE..." delay={500} prefersReducedMotion={prefersReducedMotion} />
              </span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-tight">
            <GlitchText className="cyber-text bg-gradient-to-r from-[#00ffff] via-[#ff00ff] to-[#00ffff] bg-clip-text text-transparent cyber-glow">
              REDWEYNE
            </GlitchText>
          </h1>

          <div className="flex items-center justify-start md:justify-center gap-3 sm:gap-4 text-lg sm:text-xl md:text-2xl font-medium">
            <span className="w-10 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#00ffff]" />
            <span className="cyber-text text-[#00ffff] tracking-[0.3em]">
              DIGITAL ARCHITECT
            </span>
            <span className="w-10 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#00ffff]" />
          </div>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            <span className="text-[#00ffff]">&lt;</span>
            I build production-ready interfaces, realtime systems, and AI-assisted tools that feel fast, intentional, and resilient.
            <span className="text-[#00ffff]">/&gt;</span>
          </p>

          <p className="text-gray-400 max-w-3xl mx-auto font-mono text-[11px] sm:text-sm tracking-widest">
            AVAILABLE FOR HIGH-IMPACT BUILDS • PREFERRED STACK: REACT / TYPESCRIPT / NODE / POSTGRES • REMOTE-FIRST
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-4">
            {signalCards.map((card) => (
              <div
                key={card.title}
                className="cyber-card p-4 border border-[#00ffff]/20 hover:border-[#00ffff] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <card.icon className="w-5 h-5 text-[#00ffff]" />
                  <span className="font-mono text-xs text-[#ff00ff] tracking-widest">SIGNAL</span>
                </div>
                <div className="text-white text-lg font-semibold">{card.title}</div>
                <p className="text-gray-400 text-sm">{card.meta}</p>
              </div>
            ))}
          </div>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            <span className="text-[#00ffff]">&lt;</span>
            From the first spike to production, you get weekly, demoable progress and architecture that stays maintainable after launch.
            <span className="text-[#00ffff]">/&gt;</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-6 sm:pt-8">
            <button
              onClick={scrollToWork}
              className="cyber-button group w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                ACCESS PROJECTS
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </span>
            </button>
            
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-[#ff00ff] text-[#ff00ff] px-6 sm:px-8 py-3 font-mono tracking-wider hover:bg-[#ff00ff] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)] w-full sm:w-auto text-center"
            >
              ESTABLISH LINK
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <button
          onClick={scrollToWork}
          className="text-[#00ffff] hover:text-[#ff00ff] transition-colors group"
          aria-label="Scroll down"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-xs tracking-widest opacity-60">SCROLL</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </div>
        </button>
      </div>

      <div className="absolute bottom-4 right-4 sm:right-8 font-mono text-xs text-[#00ffff] opacity-40">
        <div>v2.0.77</div>
        <div>BUILD: STABLE</div>
      </div>
    </section>
  );
}
