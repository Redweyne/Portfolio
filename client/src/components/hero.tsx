import { ChevronDown } from "lucide-react";
import heroImage from "@assets/generated_images/hero_abstract_3d_visual.png";

export function Hero() {
  const scrollToWork = () => {
    const element = document.getElementById("work");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-30 lg:opacity-100">
        <img
          src={heroImage}
          alt="Abstract 3D Visual"
          className="w-full h-full object-cover parallax"
          data-speed="0.3"
          data-testid="img-hero-visual"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <div className="animate-fade-up">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 leading-tight" data-testid="text-hero-title">
              <span className="inline-block bg-gradient-to-r from-primary via-purple-600 to-primary bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">
                Redweyne
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium mb-8 animate-fade-up [animation-delay:200ms]" data-testid="text-hero-subtitle">
              Crafting Exceptional Digital Experiences
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-12 animate-fade-up [animation-delay:400ms]" data-testid="text-hero-description">
              I build innovative web applications that combine cutting-edge technology
              with beautiful, intuitive design. Explore my work and let's create
              something extraordinary together.
            </p>
            <button
              onClick={scrollToWork}
              className="group flex items-center gap-2 text-primary hover:text-primary/80 transition-colors animate-fade-up [animation-delay:600ms]"
              data-testid="button-scroll-work"
            >
              <span className="text-lg font-medium">View My Work</span>
              <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToWork}
          className="text-muted-foreground hover:text-foreground transition-colors"
          data-testid="button-scroll-indicator"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}
