import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profileImage from "@assets/generated_images/tech_circuit_visualization.png";
import { useEffect, useRef, useState } from "react";
import { ParallaxLayer, FloatingElement } from "./parallax-layer";

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

export function About() {
  const stats = [
    { label: "Projects Completed", value: 20, suffix: "+" },
    { label: "Technologies Mastered", value: 15, suffix: "+" }
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <ParallaxLayer speed={-0.15} className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </ParallaxLayer>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ParallaxLayer speed={0.1}>
          <div className="fade-in-section mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate developer crafting digital experiences that make a difference
            </p>
          </div>
        </ParallaxLayer>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <ParallaxLayer speed={0.2} className="lg:col-span-2 fade-in-section">
            <FloatingElement amplitude={15} delay={0}>
              <div className="relative max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg blur-2xl" />
                <Card className="relative overflow-hidden border-2">
                  <CardContent className="p-8">
                    <Avatar className="w-full h-auto aspect-square" data-testid="img-profile">
                      <AvatarImage src={profileImage} alt="Redweyne" />
                      <AvatarFallback className="text-6xl">R</AvatarFallback>
                    </Avatar>
                  </CardContent>
                </Card>
              </div>
            </FloatingElement>
          </ParallaxLayer>

          <ParallaxLayer speed={0.05} className="lg:col-span-3">
            <div className="fade-in-section space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground text-xl sm:text-2xl font-medium leading-relaxed mb-8" data-testid="text-about-intro">
                  Who I am matters far less than what I can deliver for you. My value isn't measured in credentials or timelines—it's proven through the solutions I build and the problems I solve.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed" data-testid="text-about-journey">
                  I'm <span className="font-semibold text-primary">Redweyne</span>, and I don't just write code—I architect digital experiences that transform how you work and interact online. Every project I touch is an opportunity to push boundaries, whether it's developing AI-powered tools that intelligently manage thousands of emails or creating privacy-first platforms that put control back in users' hands.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed" data-testid="text-about-passion">
                  The web is saturated with mediocre applications that merely function. I build solutions that excel—combining cutting-edge technology with ruthless attention to user experience. My approach is simple: understand the core problem, eliminate unnecessary complexity, and deliver results that speak louder than promises.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  If you need someone who executes with precision, thinks beyond the obvious, and delivers applications that your users will actually want to use—you're in the right place. Let's build something exceptional.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                {stats.map((stat, index) => {
                  const StatCard = () => {
                    const { count, elementRef } = useCounterAnimation(stat.value);
                    return (
                      <FloatingElement delay={index * 300} amplitude={8}>
                        <Card
                          key={stat.label}
                          className="hover-elevate transition-all duration-300"
                          data-testid={`card-stat-${stat.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        >
                          <CardContent className="p-6 text-center">
                            <div ref={elementRef} className="text-3xl font-bold text-primary mb-2">
                              {count}{stat.suffix}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {stat.label}
                            </div>
                          </CardContent>
                        </Card>
                      </FloatingElement>
                    );
                  };
                  return <StatCard key={stat.label} />;
                })}
              </div>
            </div>
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}
