import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import inboxAIImage from "@assets/generated_images/inboxai_application_screenshot.png";
import tempMailImage from "@assets/generated_images/tempmail_application_screenshot.png";
import { useRef } from "react";
import { FlipCard3D } from "./flip-card-3d";

interface Project {
  title: string;
  description: string;
  image: string;
  features: string[];
  techStack: string[];
  liveUrl: string;
  githubUrl?: string;
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        cardRef.current.style.transition = 'transform 0.1s ease-out';
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      cardRef.current.style.transition = 'transform 0.5s ease-out';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </div>
  );
}

const projects: Project[] = [
  {
    title: "InboxAI",
    description: "An intelligent email management platform powered by AI that helps you organize, prioritize, and respond to emails efficiently. Features smart categorization, AI-generated summaries, and automated responses.",
    image: inboxAIImage,
    features: [
      "AI-powered email summaries",
      "Smart inbox categorization",
      "Automated response suggestions",
      "Priority detection"
    ],
    techStack: ["React", "TypeScript", "AI/ML", "Node.js", "PostgreSQL"],
    liveUrl: "https://redweyne.com/inboxai/"
  },
  {
    title: "TempMail",
    description: "A secure temporary email service that protects your privacy. Generate disposable email addresses instantly for testing, signups, and avoiding spam. Built with security and user experience in mind.",
    image: tempMailImage,
    features: [
      "Instant email generation",
      "Real-time inbox updates",
      "Privacy-focused design",
      "No registration required"
    ],
    techStack: ["React", "TypeScript", "WebSocket", "Express", "Redis"],
    liveUrl: "https://redweyne.com/tempmail"
  }
];

export function FeaturedWork() {
  return (
    <section id="work" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-section mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my expertise in building modern,
            user-centric web applications
          </p>
        </div>

        <div className="space-y-20 md:space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`fade-in-section grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <FlipCard3D
                  front={
                    <Card className="group overflow-visible border-2 h-full transition-all duration-300 shadow-lg">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden aspect-video">
                          <img
                            src={project.image}
                            alt={`${project.title} Screenshot`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            data-testid={`img-project-${project.title.toLowerCase()}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
                              <Sparkles className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  }
                  back={
                    <Card className="h-full border-2 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 shadow-lg">
                      <CardContent className="p-6 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="h-6 w-6 text-primary" />
                            <h4 className="text-xl font-bold text-foreground">{project.title}</h4>
                          </div>
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-foreground mb-2">Key Features:</p>
                            <ul className="space-y-1">
                              {project.features.map((feature) => (
                                <li key={feature} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary mt-0.5">✓</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-foreground mb-2">Technologies:</p>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <p className="text-xs text-muted-foreground italic">Click again to flip back</p>
                        </div>
                      </CardContent>
                    </Card>
                  }
                />
              </div>

              <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4"
                  data-testid={`text-project-${project.title.toLowerCase()}`}
                >
                  {project.title}
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-6">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        data-testid={`badge-tech-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    variant="default"
                    data-testid={`button-demo-${project.title.toLowerCase()}`}
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                  {project.githubUrl && (
                    <Button
                      asChild
                      variant="outline"
                      data-testid={`button-github-${project.title.toLowerCase()}`}
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
