import { ArrowUp, Cpu, Zap } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  const links = [
    { id: "hero", label: "HOME" },
    { id: "work", label: "PROJECTS" },
    { id: "skills", label: "SYSTEMS" },
    { id: "about", label: "PROFILE" },
    { id: "contact", label: "UPLINK" },
  ];

  return (
    <footer className="bg-[#050508] border-t border-[#00ffff]/10 relative">
      <div className="absolute top-0 left-0 right-0 h-px energy-line" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Cpu className="w-8 h-8 text-[#00ffff]" />
                <div className="absolute inset-0 bg-[#00ffff] blur-lg opacity-30" />
              </div>
              <span className="cyber-text text-2xl font-bold text-[#00ffff]">REDWEYNE</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              <span className="text-[#00ffff]">&lt;</span>
              Engineering exceptional digital experiences through advanced technology and innovative design
              <span className="text-[#00ffff]">/&gt;</span>
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00ff66]">
              <Zap className="w-3 h-3" />
              <span>SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-sm text-[#ff00ff] tracking-widest mb-6">
              NAVIGATION_MATRIX
            </h4>
            <div className="space-y-3">
              {links.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block font-mono text-sm text-gray-500 hover:text-[#00ffff] transition-colors group"
                >
                  <span className="text-[#00ffff]/50 mr-2">0{index + 1}.</span>
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between">
            <button
              onClick={scrollToTop}
              className="cyber-card p-4 group hover:border-[#00ffff] transition-all"
            >
              <ArrowUp className="h-6 w-6 text-[#00ffff] group-hover:text-[#ff00ff] transition-colors" />
            </button>
            
            <div className="mt-8 md:mt-0 font-mono text-xs text-right">
              <div className="text-gray-600 mb-1">BUILD_VERSION</div>
              <div className="text-[#00ffff]">v2.0.77</div>
              <div className="text-gray-600 mt-2">LAST_UPDATE</div>
              <div className="text-[#ff00ff]">{new Date().toISOString().split('T')[0]}</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#00ffff]/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-gray-600">
              <span className="text-[#00ffff]">&copy;</span> {currentYear} REDWEYNE 
              <span className="text-[#ff00ff] mx-2">|</span>
              ALL_RIGHTS_RESERVED
            </p>
            <p className="font-mono text-xs text-gray-600">
              BUILT_WITH 
              <span className="text-[#00ffff] mx-1">REACT</span>
              <span className="text-[#ff00ff]">+</span>
              <span className="text-[#00ffff] mx-1">TYPESCRIPT</span>
              <span className="text-[#ff00ff]">+</span>
              <span className="text-[#00ffff] ml-1">TAILWIND</span>
            </p>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-[#00ffff] via-[#ff00ff] to-[#00ffff]" 
           style={{ backgroundSize: '200% 100%', animation: 'energyFlow 3s linear infinite' }} 
      />
    </footer>
  );
}
