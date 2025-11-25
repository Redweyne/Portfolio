import { Card, CardContent } from "@/components/ui/card";
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
  Workflow
} from "lucide-react";
import { ParallaxLayer, FloatingElement } from "./parallax-layer";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
}

const skills: Skill[] = [
  { name: "React & Next.js", icon: <Code2 className="h-5 w-5" />, category: "Frontend" },
  { name: "TypeScript", icon: <Zap className="h-5 w-5" />, category: "Frontend" },
  { name: "Tailwind CSS", icon: <Palette className="h-5 w-5" />, category: "Frontend" },
  { name: "Node.js & Express", icon: <Server className="h-5 w-5" />, category: "Backend" },
  { name: "PostgreSQL & Redis", icon: <Database className="h-5 w-5" />, category: "Backend" },
  { name: "REST & GraphQL APIs", icon: <Workflow className="h-5 w-5" />, category: "Backend" },
  { name: "AI/ML Integration", icon: <Cpu className="h-5 w-5" />, category: "Emerging Tech" },
  { name: "WebSocket & Real-time", icon: <Globe className="h-5 w-5" />, category: "Emerging Tech" },
  { name: "Cloud Deployment", icon: <Cloud className="h-5 w-5" />, category: "DevOps" },
  { name: "Performance Optimization", icon: <Rocket className="h-5 w-5" />, category: "DevOps" },
  { name: "Security Best Practices", icon: <Shield className="h-5 w-5" />, category: "DevOps" },
  { name: "Microservices", icon: <Boxes className="h-5 w-5" />, category: "Architecture" }
];

const categories = Array.from(new Set(skills.map(skill => skill.category)));

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-card/30 relative overflow-hidden">
      <ParallaxLayer speed={-0.2} className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </ParallaxLayer>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ParallaxLayer speed={0.1}>
          <div className="fade-in-section mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Skills & Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable web applications
            </p>
          </div>
        </ParallaxLayer>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <ParallaxLayer key={category} speed={0.05 * (categoryIndex + 1)}>
              <div className="fade-in-section">
                <h3 className="text-xl font-semibold text-foreground mb-6 text-center sm:text-left">
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, index) => (
                      <FloatingElement
                        key={skill.name}
                        delay={index * 200}
                        amplitude={10}
                      >
                        <Card
                          className="hover-elevate active-elevate-2 transition-all duration-300 animate-scale-in h-full"
                          style={{
                            animationDelay: `${categoryIndex * 100 + index * 50}ms`
                          }}
                          data-testid={`card-skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                              <div className="text-primary">{skill.icon}</div>
                              <span className="font-medium text-foreground">
                                {skill.name}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </FloatingElement>
                    ))}
                </div>
              </div>
            </ParallaxLayer>
          ))}
        </div>
      </div>
    </section>
  );
}
