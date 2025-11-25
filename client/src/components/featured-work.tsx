import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import inboxAIImage from "@assets/generated_images/inboxai_application_screenshot.png";
import tempMailImage from "@assets/generated_images/tempmail_application_screenshot.png";

interface Project {
  title: string;
  description: string;
  image: string;
  features: string[];
  techStack: string[];
  liveUrl: string;
  githubUrl?: string;
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
                <Card className="group overflow-hidden border-2 hover-elevate active-elevate-2 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={project.image}
                        alt={`${project.title} Screenshot`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        data-testid={`img-project-${project.title.toLowerCase()}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CardContent>
                </Card>
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
