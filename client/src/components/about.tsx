import { useEffect, useRef, useState } from "react";
import { User, Award, Code, Clock, MapPin, Zap } from "lucide-react";
import profileImage from "@assets/generated_images/tech_circuit_visualization.svg";
import { usePrefersReducedMotion, useVisibilityObserver } from "@/hooks/use-visibility";

function useCounterAnimation(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          let startTime: number | null = null;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasStarted]);

  return { count, elementRef };
}

const terminalContent = [
  "> LOADING PROFILE_DATA...",
  "> DECRYPTING NEURAL_PATTERNS...",
  "> ANALYZING SKILL_MATRIX...",
  "> STATUS: ENTITY_VERIFIED",
  "> DESIGNATION: REDWEYNE",
  "> CLASS: DIGITAL_ARCHITECT",
  "> CLEARANCE: MAXIMUM",
  "> READY_FOR_DEPLOYMENT..."
];

function DataTerminal() {
  const [lineCount, setLineCount] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, isVisible } = useVisibilityObserver<HTMLDivElement>({
    threshold: 0.25,
  });

  useEffect(() => {
    if (prefersReducedMotion || !isVisible) return;

    const interval = setInterval(() => {
      setLineCount(prev => {
        if (prev < terminalContent.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [isVisible, prefersReducedMotion]);

  const visibleLines = terminalContent.slice(0, lineCount);

  return (
    <div ref={ref} className="cyber-card p-4 font-mono text-xs h-48 overflow-hidden">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#00ffff]/20">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#ff0033]" />
          <div className="w-2 h-2 rounded-full bg-[#ffff00]" />
          <div className="w-2 h-2 rounded-full bg-[#00ff66]" />
        </div>
        <span className="text-[#00ffff]/60">terminal_v2.0</span>
      </div>
      <div className="space-y-1">
        {visibleLines.map((line, index) => (
          <div key={index} className={line.includes("READY") ? "text-[#00ff66]" : "text-[#00ffff]"}>
            {line}
          </div>
        ))}
        <span className="inline-block w-2 h-4 bg-[#00ffff] animate-pulse" />
      </div>
    </div>
  );
}

function StatCard({ value, label, suffix, icon: Icon }: { value: number; label: string; suffix: string; icon: any }) {
  const { count, elementRef } = useCounterAnimation(value);
  
  return (
    <div ref={elementRef} className="cyber-card p-6 text-center group hover:border-[#00ffff] transition-all duration-300">
      <Icon className="w-8 h-8 text-[#00ffff] mx-auto mb-3 group-hover:text-[#ff00ff] transition-colors" />
      <div className="font-mono text-3xl font-bold text-white mb-1">
        <span className="text-glow-cyan">{count}</span>
        <span className="text-[#ff00ff]">{suffix}</span>
      </div>
      <div className="font-mono text-xs text-gray-500 tracking-widest uppercase">{label}</div>
    </div>
  );
}

export function About() {
  const stats = [
    { label: "Projects Deployed", value: 20, suffix: "+", icon: Code },
    { label: "Tech Mastered", value: 15, suffix: "+", icon: Zap },
    { label: "Years Active", value: 5, suffix: "+", icon: Clock },
    { label: "Success Rate", value: 99, suffix: "%", icon: Award }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 bg-[#050508] relative overflow-hidden">
      <div className="absolute inset-0 hex-grid opacity-5 hidden sm:block" />
      
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#00ffff]/20 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#ff00ff]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <div className="inline-block">
            <div className="cyber-card px-6 py-2">
              <span className="font-mono text-sm text-[#00ffff] tracking-widest">
                [ SECTION_04 ]
              </span>
            </div>
          </div>
          
          <h2 className="cyber-text text-3xl sm:text-5xl md:text-6xl font-bold text-white">
            <span className="text-glow-cyan">OPERATOR</span>{" "}
            <span className="text-[#ff00ff] text-glow-magenta">PROFILE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00ffff]/20 to-[#ff00ff]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="cyber-card overflow-hidden corner-accent relative">
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-2 cyber-card px-3 py-1">
                    <User className="w-4 h-4 text-[#00ffff]" />
                    <span className="font-mono text-xs text-[#00ffff]">ENTITY_SCAN</span>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-2 cyber-card px-3 py-1">
                    <MapPin className="w-4 h-4 text-[#00ff66]" />
                    <span className="font-mono text-xs text-[#00ff66]">LOCATED</span>
                  </div>
                </div>
                
                <div className="aspect-square relative">
                  <img
                    src={profileImage}
                    alt="Redweyne"
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="w-full h-full object-cover filter saturate-75 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-[#00ffff]/5 mix-blend-overlay" />
                  
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-0 w-full h-px bg-[#00ffff]/30" />
                    <div className="absolute top-1/2 left-0 w-full h-px bg-[#00ffff]/20" />
                    <div className="absolute top-3/4 left-0 w-full h-px bg-[#00ffff]/30" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#050508] to-transparent">
                  <div className="font-mono text-xs space-y-1 text-[#00ffff]/80">
                    <div>ID: RW-2024-001</div>
                    <div>STATUS: <span className="text-[#00ff66]">ACTIVE</span></div>
                  </div>
                </div>
              </div>
            </div>

            <DataTerminal />
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="cyber-card p-6">
                <h3 className="cyber-text text-2xl font-bold text-[#00ffff] mb-4 flex items-center gap-2">
                  <span className="text-[#ff00ff]">//</span> DESIGNATION
                </h3>
                <p className="text-lg sm:text-xl text-white font-medium leading-relaxed">
                  Who I am matters far less than what I can deliver for you. My value isn't measured in credentials—it's proven through deployed solutions.
                </p>
              </div>

              <div className="cyber-card p-6">
                <h3 className="cyber-text text-lg font-bold text-[#ff00ff] mb-4">
                  MISSION_BRIEF
                </h3>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <div className="sm:hidden">
                    <ul className="space-y-3 text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-[#00ffff]">▹</span>
                        <span>
                          <span className="text-[#00ffff] font-semibold">REDWEYNE</span>, digital architect for next-gen web experiences.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00ffff]">▹</span>
                        <span>Shipping AI email systems and zero-trace comms that do more than work—they excel.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00ffff]">▹</span>
                        <span>Clarify the core problem, cut the noise, deliver results louder than promises.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="hidden sm:block space-y-4 text-base sm:text-lg">
                    <p>
                      I'm <span className="text-[#00ffff] font-semibold">REDWEYNE</span>—a digital architect specializing in next-generation web solutions. Every project is an opportunity to push technological boundaries.
                    </p>
                    <p>
                      From AI-powered email management systems to zero-trace communication protocols, I build applications that don't just function—they <span className="text-[#ff00ff]">excel</span>.
                    </p>
                    <p>
                      My approach: understand the core problem, eliminate unnecessary complexity, and deliver results that speak louder than promises.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:snap-none sm:pb-0">
              {stats.map((stat) => (
                <div key={stat.label} className="min-w-[200px] snap-start sm:min-w-0">
                  <StatCard {...stat} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
