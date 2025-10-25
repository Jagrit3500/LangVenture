import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import RecorderModal from "@/components/RecorderModal";
import CameraMission from "@/components/CameraMission";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  Mic,
  Camera,
  CheckCircle2,
  Star,
  Volume2,
} from "lucide-react";
import { demoLessons } from "@/data/demoLessons";

const LessonPlayer = () => {
  const { lessonId } = useParams();
  const [recorderOpen, setRecorderOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const lesson = demoLessons.find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <div className="container mx-auto px-4 pt-24">
          <p className="text-center text-muted-foreground">Lesson not found</p>
        </div>
      </div>
    );
  }

  const progress = (completedSections.length / 3) * 100;

  const toggleSection = (section: string) => {
    setCompletedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="mb-8 animate-fade-in">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-smooth mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Dashboard</span>
            <span>/</span>
            <span>{lesson.path}</span>
            <span>/</span>
            <span className="text-foreground">{lesson.title}</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {lesson.title}
              </h1>
              <p className="text-muted-foreground">{lesson.path}</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-primary text-white shadow-float">
              <Star className="w-5 h-5 fill-white" />
              <span className="font-semibold">{lesson.xp} XP</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Lesson Progress</span>
              <span className="font-medium text-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Content */}
            <Card className="p-8 gradient-card shadow-soft animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Key Phrases
                </h2>
                {completedSections.includes("content") && (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                )}
              </div>
              <div className="space-y-4">
                {lesson.content.map((phrase, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-smooth group"
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                      aria-label="Play pronunciation"
                    >
                      <Volume2 className="w-5 h-5" />
                    </Button>
                    <p className="text-foreground leading-relaxed">{phrase}</p>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => toggleSection("content")}
                className="w-full mt-6"
                variant={completedSections.includes("content") ? "outline" : "default"}
              >
                {completedSections.includes("content")
                  ? "Mark as Incomplete"
                  : "Mark as Complete"}
              </Button>
            </Card>

            {/* Speaking Challenge */}
            <Card className="p-8 gradient-card shadow-soft animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Speaking Challenge
                </h2>
                {completedSections.includes("speaking") && (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                )}
              </div>
              <p className="text-muted-foreground mb-6">
                {lesson.challenge || "Practice speaking these phrases out loud"}
              </p>
              <Button
                onClick={() => setRecorderOpen(true)}
                size="lg"
                className="w-full shadow-float group"
              >
                <Mic className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Start Recording
              </Button>
            </Card>

            {/* Camera Mission */}
            <Card className="p-8 gradient-card shadow-soft animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Camera Mission
                </h2>
                {completedSections.includes("camera") && (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                )}
              </div>
              <p className="text-muted-foreground mb-6">
                Use your camera to identify objects and learn their names in Spanish
              </p>
              <Button
                onClick={() => setCameraOpen(true)}
                size="lg"
                variant="outline"
                className="w-full group"
              >
                <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-smooth" />
                Open Camera
              </Button>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 gradient-card shadow-soft sticky top-24 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                AI Feedback
              </h3>
              {completedSections.length > 0 ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                    <p className="text-sm text-success font-medium mb-1">
                      Great progress! 🎉
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You've completed {completedSections.length} out of 3 sections
                    </p>
                  </div>
                  {completedSections.includes("speaking") && (
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm font-medium text-foreground mb-2">
                        Pronunciation Score
                      </p>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="h-2 flex-1" />
                        <span className="text-sm font-semibold text-primary">85%</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Complete the activities to receive personalized AI feedback on your
                  progress
                </p>
              )}
            </Card>
          </div>
        </div>
      </main>

      <RecorderModal
        open={recorderOpen}
        onOpenChange={(open) => {
          setRecorderOpen(open);
          if (!open) toggleSection("speaking");
        }}
        challenge={lesson.challenge || "Practice the phrases"}
      />

      <CameraMission
        open={cameraOpen}
        onOpenChange={(open) => {
          setCameraOpen(open);
          if (!open) toggleSection("camera");
        }}
      />
    </div>
  );
};

export default LessonPlayer;
