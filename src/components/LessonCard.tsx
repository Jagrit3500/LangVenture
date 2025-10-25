import { Clock, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface LessonCardProps {
  id: string;
  title: string;
  path: string;
  duration: string;
  xp: number;
}

const LessonCard = ({ id, title, path, duration, xp }: LessonCardProps) => {
  return (
    <Card className="p-6 gradient-card shadow-soft hover:shadow-elevated transition-smooth group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground mb-1">{path}</p>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth">
            {title}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span>{xp} XP</span>
          </div>
        </div>

        <Link to={`/lesson/${id}`}>
          <Button
            size="sm"
            variant="ghost"
            className="group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
          >
            Start
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default LessonCard;
