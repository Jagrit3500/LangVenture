import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { CheckCircle2 } from "lucide-react";

interface PathCardProps {
  title: string;
  icon: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  color: string;
}

const PathCard = ({
  title,
  icon,
  description,
  progress,
  totalLessons,
  completedLessons,
  color,
}: PathCardProps) => {
  return (
    <Card className="p-6 gradient-card shadow-soft hover:shadow-elevated transition-smooth group">
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-3xl shadow-float group-hover:scale-110 transition-smooth`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span>
              {completedLessons} / {totalLessons} lessons
            </span>
          </div>
          <Button size="sm" className="shadow-soft">
            Continue
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PathCard;
