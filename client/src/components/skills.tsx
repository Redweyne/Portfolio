import {
  Code2,
  Palette,
  Database,
  Boxes,
  Cpu,
  Globe,
  Rocket,
  Shield,
  Zap,
  Cloud,
  Server,
  Workflow,
  Terminal
} from "lucide-react";
import { useState, useEffect } from "react";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
  level: number;
}

const skills: Skill[] = [
  { name: "React & Next.js", icon: <Code2 className="h-5 w-5" />, category: "FRONTEND", level: 95 },
  { name: "TypeScript", icon: <Zap className="h-5 w-5" />, category: "FRONTEND", level: 92 },
  { name: "Tailwind CSS", icon: <Palette className="h-5 w-5" />, category: "FRONTEND", level: 90 },
  { name: "Node.js & Express", icon: <Server className="h-5 w-5" />, category: "BACKEND", level: 88 },
  { name: "PostgreSQL & Redis", icon: <Database className="h-5 w-5" />, category: "BACKEND", level: 85 },
  { name: "REST & GraphQL", icon: <Workflow className="h-5 w-5" />, category: "BACKEND", level: 90 },
  { name: "AI/ML Integration", icon: <Cpu className="h-5 w-5" />, category: "ADVANCED", level: 80 },
  { name: "WebSocket & Realtime", icon: <Globe className="h-5 w-5" />, category: "ADVANCED", level: 87 },
  { name: "Cloud Deployment", icon: <Cloud className="h-5 w-5" />, category: "DEVOPS", level: 85 },
  { name: "Performance Tuning", icon: <Rocket className="h-5 w-5" />, category: "DEVOPS", level: 88 },
  { name: "Security Protocols", icon: <Shield className="h-5 w-5" />, category: "DEVOPS", level: 82 },
  { name: "Microservices", icon: <Boxes className="h-5 w-5" />, category: "ARCHITECTURE", level: 83 }
];

const categories = Array.from(new Set(skills.map(skill => skill.category)));

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setWidth(skill.level);
    }, delay);
    return () => clearTimeout(timer);
  }, [skill.level, delay]);

  return (
    <div 
      className={`cyber-card p-4 group hover:border-[#00ffff] transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-[#00ffff] group-hover:text-[#ff00ff] transition-colors">
            {skill.icon}
          </div>
          <span className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="font-mono text-xs text-[#00ffff]">{skill.level}%</span>
      </div>
      
      <div className="h-2 bg-[#0a0a0f] rounded overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff] transition-all duration-1000 ease-out relative"
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
               style={{ backgroundSize: '200% 100%', animation: 'energyFlow 2s linear infinite' }} 
          />
        </div>
      </div>
    </div>
  );
}

function SystemStatus() {
  const [stats, setStats] = useState({ cpu: 0, memory: 0, uptime: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 30) + 45,
        memory: Math.floor(Math.random() * 20) + 60,
        uptime: Math.floor(Date.now() / 1000) % 99999
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cyber-card p-6 mb-12">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-5 h-5 text-[#00ffff]" />
        <span className="font-mono text-sm text-[#00ffff] tracking-widest">SYSTEM_DIAGNOSTICS</span>
      </div>
      <div className="grid grid-cols-3 gap-4 font-mono text-xs">
        <div>
          <span className="text-gray-500">CPU_LOAD</span>
          <div className="text-[#00ff66]">{stats.cpu}%</div>
        </div>
        <div>
          <span className="text-gray-500">MEMORY</span>
          <div className="text-[#00ffff]">{stats.memory}%</div>
        </div>
        <div>
          <span className="text-gray-500">UPTIME</span>
          <div className="text-[#ff00ff]">{stats.uptime}s</div>
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg" />
      
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#00ffff]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#ff00ff]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <div className="cyber-card px-6 py-2">
              <span className="font-mono text-sm text-[#00ffff] tracking-widest">
                [ SECTION_03 ]
              </span>
            </div>
          </div>
          
          <h2 className="cyber-text text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            <span className="text-glow-cyan">TECH</span>{" "}
            <span className="text-[#ff00ff] text-glow-magenta">ARSENAL</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            <span className="text-[#00ffff]">&lt;</span>
            Comprehensive toolkit for engineering cutting-edge digital solutions
            <span className="text-[#00ffff]">/&gt;</span>
          </p>
        </div>

        <SystemStatus />

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div key={category}>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs text-[#ff00ff] tracking-widest">{category}_SYSTEMS</span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#ff00ff]/50 to-transparent" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      delay={categoryIndex * 200 + index * 100}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
