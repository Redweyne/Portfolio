import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-xl font-bold text-foreground hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
              data-testid="link-home"
            >
              Redweyne
            </button>

            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => scrollToSection("work")}
                data-testid="link-work"
              >
                Work
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("about")}
                data-testid="link-about"
              >
                About
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("contact")}
                data-testid="link-contact"
              >
                Contact
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-lg pt-20 px-4 animate-fade-in" data-testid="menu-mobile-overlay">
          <div className="flex flex-col gap-4">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("work")}
              className="justify-start text-lg h-12"
              data-testid="mobile-link-work"
            >
              Work
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("about")}
              className="justify-start text-lg h-12"
              data-testid="mobile-link-about"
            >
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contact")}
              className="justify-start text-lg h-12"
              data-testid="mobile-link-contact"
            >
              Contact
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
