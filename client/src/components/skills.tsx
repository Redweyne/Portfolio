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
    <section id="skills" className="py-20 md:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-section mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable web applications
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div key={category} className="fade-in-section">
              <h3 className="text-xl font-semibold text-foreground mb-6 text-center sm:text-left">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <Card
                      key={skill.name}
                      className="hover-elevate active-elevate-2 transition-all duration-300 animate-scale-in"
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
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
