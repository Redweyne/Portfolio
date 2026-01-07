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
    { id: "process", label: "OPERATING" },
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
              className="flex items-center gap-2 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ffff]"
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
                  className="relative px-4 py-2 font-mono text-sm text-gray-400 hover:text-[#00ffff] transition-all duration-300 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ffff] focus-visible:underline focus-visible:underline-offset-8"
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
              className="md:hidden relative p-2 text-[#00ffff] hover:text-[#ff00ff] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ffff]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <div className="absolute inset-0 border border-[#00ffff]/30 hover:border-[#00ffff] transition-colors" />
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 h-px ${isScrolled ? 'energy-line' : ''}`} />
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            className="absolute inset-0 bg-[#050508]/80 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          />
          <div className="absolute inset-x-0 bottom-0 bg-[#050508]/95 border-t border-[#00ffff]/20 rounded-t-3xl shadow-[0_-20px_60px_rgba(0,255,255,0.12)] p-6">
            <div className="absolute inset-x-10 -top-2 h-px energy-line" />
            <div className="relative flex flex-col gap-3">
              {navLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="flex items-center justify-between w-full px-5 py-4 rounded-2xl border border-[#00ffff]/20 bg-[#0a0a12]/80 font-mono text-lg tracking-[0.2em] text-gray-200 hover:text-[#00ffff] hover:border-[#00ffff]/50 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ffff]"
                  style={{ 
                    animation: 'slideIn 0.3s ease forwards',
                    animationDelay: `${index * 80}ms`,
                    opacity: 0
                  }}
                >
                  <span className="text-[#00ffff] text-sm">0{index + 1}</span>
                  <span className="flex-1 text-center">{link.label}</span>
                  <span className="h-2 w-2 rounded-full bg-[#00ffff]/60" />
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full mt-2 rounded-2xl bg-gradient-to-r from-[#00ffff] via-[#00ff66] to-[#ff00ff] px-6 py-4 font-mono text-lg tracking-[0.25em] text-[#050508] shadow-lg shadow-[#00ffff]/30 hover:shadow-[#ff00ff]/30 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#050508]"
                style={{ 
                  animation: 'slideIn 0.3s ease forwards',
                  animationDelay: `${navLinks.length * 80}ms`,
                  opacity: 0
                }}
              >
                CONTACT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
