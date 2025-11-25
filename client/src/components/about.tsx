import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profileImage from "@assets/generated_images/professional_developer_headshot.png";

export function About() {
  const stats = [
    { label: "Years of Experience", value: "5+" },
    { label: "Projects Completed", value: "20+" },
    { label: "Technologies Mastered", value: "15+" }
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-section mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate developer crafting digital experiences that make a difference
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 fade-in-section">
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
          </div>

          <div className="lg:col-span-3 fade-in-section space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground text-lg leading-relaxed" data-testid="text-about-intro">
                Hi! I'm <span className="font-semibold text-primary">Redweyne</span>,
                a creative developer with a passion for building exceptional digital
                experiences. I specialize in crafting modern web applications that
                combine cutting-edge technology with intuitive, beautiful design.
              </p>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-about-journey">
                My journey in software development has been driven by curiosity and a
                commitment to excellence. I believe great applications are born from the
                intersection of powerful functionality and thoughtful user experience.
                Whether it's AI-powered tools like InboxAI or privacy-focused services
                like TempMail, I strive to create solutions that truly make a difference.
              </p>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-about-passion">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with the
                developer community. I'm always excited to tackle new challenges and
                collaborate on innovative projects.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              {stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="hover-elevate transition-all duration-300"
                  data-testid={`card-stat-${stat.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
