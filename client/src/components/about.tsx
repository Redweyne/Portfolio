import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profileImage from "@assets/generated_images/abstract_tech_composition.png";

export function About() {
  const stats = [
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
