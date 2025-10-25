import { useState } from "react";
import NavBar from "@/components/NavBar";
import PathCard from "@/components/PathCard";
import LessonCard from "@/components/LessonCard";
import XPBadge from "@/components/XPBadge";
import CameraMission from "@/components/CameraMission";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Camera, Flame, TrendingUp } from "lucide-react";
import { demoPaths } from "@/data/demoPaths";
import { demoLessons } from "@/data/demoLessons";

const Dashboard = () => {
  const [cameraOpen, setCameraOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Welcome Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Hola, Riya 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready for your next adventure?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* XP Progress */}
          <Card className="p-6 gradient-card shadow-soft hover:shadow-elevated transition-smooth animate-slide-up">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your Progress</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">1,250</span>
                  <span className="text-sm text-muted-foreground">/ 2,000 XP</span>
                </div>
              </div>
              <XPBadge xp={1250} level={5} />
            </div>
            <Progress value={62.5} className="h-3 mb-2" />
            <p className="text-xs text-muted-foreground">750 XP to Level 6</p>
          </Card>

          {/* Streak Card */}
          <Card className="p-6 gradient-card shadow-soft hover:shadow-elevated transition-smooth animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-float">
                <Flame className="w-8 h-8 text-white animate-pulse-slow" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
                <p className="text-3xl font-bold text-foreground">12 days</p>
              </div>
            </div>
          </Card>

          {/* Performance Card */}
          <Card className="p-6 gradient-card shadow-soft hover:shadow-elevated transition-smooth animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success to-green-600 flex items-center justify-center shadow-float">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">This Week</p>
                <p className="text-3xl font-bold text-foreground">87%</p>
                <p className="text-xs text-success">+12% from last week</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Passion Paths */}
        <section className="mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-6">Your Passion Paths</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoPaths.map((path) => (
              <PathCard key={path.id} {...path} />
            ))}
          </div>
        </section>

        {/* Recent Lessons */}
        <section className="animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-6">Continue Learning</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {demoLessons.slice(0, 4).map((lesson) => (
              <LessonCard key={lesson.id} {...lesson} />
            ))}
          </div>
        </section>
      </main>

      {/* Floating Camera Button */}
      <Button
        size="lg"
        onClick={() => setCameraOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-float hover:scale-110 transition-smooth z-40"
        aria-label="Open camera mission"
      >
        <Camera className="w-6 h-6" />
      </Button>

      <CameraMission open={cameraOpen} onOpenChange={setCameraOpen} />
    </div>
  );
};

export default Dashboard;
