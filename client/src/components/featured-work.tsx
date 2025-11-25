import { ExternalLink, Terminal, Database, Shield, Cpu, ArrowRight } from "lucide-react";
import inboxAIImage from "@assets/generated_images/inboxai_application_screenshot.png";
import tempMailImage from "@assets/generated_images/tempmail_application_screenshot.png";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  codename: string;
  description: string;
  image: string;
  features: string[];
  techStack: string[];
  liveUrl: string;
  status: string;
}

const projects: Project[] = [
  {
    id: "001",
    title: "InboxAI",
    codename: "PROJECT_SYNAPSE",
    description: "Neural network-powered email management system. Implements advanced machine learning algorithms for intelligent categorization, priority detection, and autonomous response generation.",
    image: inboxAIImage,
    features: [
      "AI-Powered Neural Processing",
      "Adaptive Learning Matrix",
      "Autonomous Response Engine",
      "Priority Detection Protocol"
    ],
    techStack: ["REACT", "TYPESCRIPT", "AI/ML", "NODE.JS", "POSTGRESQL"],
    liveUrl: "https://redweyne.com/inboxai/",
    status: "OPERATIONAL"
  },
  {
    id: "002",
    title: "TempMail",
    codename: "PROJECT_PHANTOM",
    description: "Stealth communication protocol for secure temporary messaging. Zero-trace email generation with real-time data streaming and military-grade encryption standards.",
    image: tempMailImage,
    features: [
      "Instant Identity Generation",
      "Real-time Data Stream",
      "Zero-Trace Protocol",
      "No Authentication Required"
    ],
    techStack: ["REACT", "TYPESCRIPT", "WEBSOCKET", "EXPRESS", "REDIS"],
    liveUrl: "https://redweyne.com/tempmail",
    status: "OPERATIONAL"
  }
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        index % 2 === 1 ? 'lg:grid-flow-dense' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
        <div className="absolute -inset-4 bg-gradient-to-r from-[#00ffff]/20 via-[#ff00ff]/20 to-[#00ffff]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative cyber-card overflow-hidden corner-accent">
          <div className="absolute top-0 left-0 right-0 h-8 bg-[#0a0a0f] border-b border-[#00ffff]/30 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff0033]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffff00]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00ff66]" />
            </div>
            <span className="font-mono text-xs text-[#00ffff]/60 ml-2">{project.codename}.exe</span>
          </div>
          
          <div className="pt-8">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isHovered ? 'scale-110 brightness-110' : 'scale-100 brightness-90'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
              
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="cyber-card px-6 py-3 backdrop-blur-md">
                  <span className="font-mono text-sm text-[#00ffff] tracking-widest">[ CLICK TO ACCESS ]</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00ffff] via-[#ff00ff] to-[#00ffff]" 
               style={{ 
                 backgroundSize: '200% 100%',
                 animation: isHovered ? 'energyFlow 2s linear infinite' : 'none'
               }} 
          />
        </div>
      </div>

      <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[#ff00ff] text-sm">#{project.id}</span>
            <span className="w-8 h-px bg-[#ff00ff]" />
            <span className="font-mono text-xs text-[#00ff66]">{project.status}</span>
          </div>
          
          <h3 className="cyber-text text-4xl sm:text-5xl font-bold text-white text-glow-cyan">
            {project.title}
          </h3>
          
          <p className="font-mono text-xs text-[#00ffff]/60 tracking-widest">
            {project.codename}
          </p>
        </div>

        <p className="text-gray-400 leading-relaxed text-lg">
          {project.description}
        </p>

        <div className="space-y-4">
          <h4 className="font-mono text-sm text-[#00ffff] tracking-widest flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            SYSTEM CAPABILITIES
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((feature, i) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-gray-300 font-mono text-sm"
              >
                <span className="text-[#00ffff]">▹</span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-mono text-sm text-[#ff00ff] tracking-widest flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            TECH MATRIX
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 border border-[#00ffff]/30 text-[#00ffff] font-mono text-xs tracking-wider hover:bg-[#00ffff]/10 hover:border-[#00ffff] transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-button inline-flex items-center gap-2 group"
          >
            <span>LAUNCH SYSTEM</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" className="py-24 md:py-32 bg-[#050508] relative overflow-hidden">
      <div className="absolute inset-0 hex-grid opacity-5" />
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ffff]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ffff]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block">
            <div className="cyber-card px-6 py-2">
              <span className="font-mono text-sm text-[#00ffff] tracking-widest">
                [ SECTION_02 ]
              </span>
            </div>
          </div>
          
          <h2 className="cyber-text text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            <span className="text-glow-cyan">PROJECT</span>{" "}
            <span className="text-[#ff00ff] text-glow-magenta">ARCHIVE</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            <span className="text-[#00ffff]">&lt;</span>
            Deployed systems showcasing advanced engineering and innovative solutions
            <span className="text-[#00ffff]">/&gt;</span>
          </p>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
