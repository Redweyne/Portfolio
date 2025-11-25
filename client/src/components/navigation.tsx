import { useState, useEffect } from "react";
import { Menu, X, Cpu } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: "work", label: "PROJECTS" },
    { id: "skills", label: "SYSTEMS" },
    { id: "about", label: "PROFILE" },
    { id: "contact", label: "UPLINK" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#050508]/90 backdrop-blur-xl border-b border-[#00ffff]/20 shadow-[0_0_30px_rgba(0,255,255,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <Cpu className="w-6 h-6 text-[#00ffff] group-hover:text-[#ff00ff] transition-colors" />
                <div className="absolute inset-0 bg-[#00ffff] blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>
              <span className="cyber-text text-xl font-bold text-[#00ffff] group-hover:text-[#ff00ff] transition-colors tracking-wider">
                RW
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative px-4 py-2 font-mono text-sm text-gray-400 hover:text-[#00ffff] transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 tracking-widest">{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#00ffff] group-hover:w-full transition-all duration-300" />
                  <span className="absolute inset-0 bg-[#00ffff]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
              
              <div className="ml-4 pl-4 border-l border-[#00ffff]/20">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00ff66]">
                  <span className="w-2 h-2 bg-[#00ff66] rounded-full animate-pulse" />
                  ONLINE
                </div>
              </div>
            </div>

            <button
              className="md:hidden relative p-2 text-[#00ffff] hover:text-[#ff00ff] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="absolute inset-0 border border-[#00ffff]/30 hover:border-[#00ffff] transition-colors" />
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 h-px ${isScrolled ? 'energy-line' : ''}`} />
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#050508]/98 backdrop-blur-xl pt-20 px-4">
          <div className="absolute inset-0 hex-grid opacity-10" />
          
          <div className="relative flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="cyber-card p-4 text-left font-mono text-lg tracking-widest text-gray-400 hover:text-[#00ffff] transition-all duration-300"
                style={{ 
                  animation: 'slideIn 0.3s ease forwards',
                  animationDelay: `${index * 100}ms`,
                  opacity: 0
                }}
              >
                <span className="text-[#00ffff] mr-2">0{index + 1}.</span>
                {link.label}
              </button>
            ))}
          </div>

          <div className="absolute bottom-8 left-4 right-4">
            <div className="cyber-card p-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-gray-500">SIGNAL STRENGTH</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <div
                      key={bar}
                      className={`w-1 bg-[#00ffff] ${bar <= 4 ? 'opacity-100' : 'opacity-30'}`}
                      style={{ height: `${bar * 4}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
