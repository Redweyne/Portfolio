import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

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

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4" data-testid="text-footer-brand">Redweyne</h3>
            <p className="text-muted-foreground" data-testid="text-footer-tagline">
              Crafting exceptional digital experiences with passion and precision.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection("hero")}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-link-home"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("work")}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-link-work"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-link-about"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-link-contact"
              >
                Contact
              </button>
            </div>
          </div>

          <div className="flex items-start justify-start md:justify-end">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              data-testid="button-back-to-top"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © {currentYear} Redweyne. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground" data-testid="text-built-with">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
