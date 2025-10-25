import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/NavBar";
import {
  Camera,
  Globe,
  Music,
  Film,
  UtensilsCrossed,
  Plane,
  Palette,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 md:pb-40 px-4 min-h-[560px] md:min-h-[640px] gradient-hero overflow-hidden flex items-center">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-soft">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">
                Join 100,000+ language learners
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              Stop studying.
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Start speaking.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Turn learning into a global adventure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-6 shadow-float hover:shadow-elevated hover:scale-105 active:scale-95 transition-smooth group">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Icons Animation */}
          <div className="absolute top-1/4 left-10 animate-float">
            <div className="w-16 h-16 rounded-2xl bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-elevated flex items-center justify-center">
              <Globe className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="absolute top-1/3 right-10 animate-float" style={{ animationDelay: "1s" }}>
            <div className="w-16 h-16 rounded-2xl bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-elevated flex items-center justify-center">
              <Music className="w-8 h-8 text-accent" />
            </div>
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-float" style={{ animationDelay: "2s" }}>
            <div className="w-16 h-16 rounded-2xl bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-elevated flex items-center justify-center">
              <UtensilsCrossed className="w-8 h-8 text-success" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Learn through your passions
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose what excites you and make learning effortless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: UtensilsCrossed,
                title: "Food & Travel",
                description:
                  "Master conversations for restaurants, markets, and adventures around the world.",
                gradient: "from-orange-400 to-pink-500",
              },
              {
                icon: Music,
                title: "Music & Art",
                description:
                  "Express creativity and discuss your favorite songs, artists, and cultural experiences.",
                gradient: "from-purple-400 to-indigo-500",
              },
              {
                icon: Film,
                title: "Movies & Media",
                description:
                  "Talk about films, shows, and entertainment in your target language naturally.",
                gradient: "from-blue-400 to-cyan-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-8 glass-card shadow-soft hover:shadow-elevated transition-smooth group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-float group-hover:scale-110 transition-smooth`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Camera Feature Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 gradient-hero">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-soft">
                <Camera className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">AI-Powered Recognition</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Learn by seeing the world
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Point your camera at anything and instantly learn how to say it in your
                target language. Coffee, book, street sign — we've got you covered.
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="shadow-float">
                  Try Camera Feature
                </Button>
              </Link>
            </div>

            <div className="relative animate-scale-in">
              <div className="aspect-video rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl border border-border/50 shadow-elevated flex items-center justify-center">
                <Camera className="w-24 h-24 text-primary animate-pulse-slow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-background">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 glass-card shadow-elevated animate-fade-in">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed">
                "I never thought learning could be this fun — LangVenture changed
                everything!"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white shadow-float">
                  S
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Sarah Martinez</p>
                  <p className="text-sm text-muted-foreground">Learning Spanish</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/30 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">LangVenture</span>
              </div>
              <p className="text-muted-foreground">
                Making language learning an adventure, one conversation at a time.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Stay Updated</h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              © 2025 LangVenture. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-smooth">
                About
              </a>
              <a href="#" className="hover:text-foreground transition-smooth">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-smooth">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
