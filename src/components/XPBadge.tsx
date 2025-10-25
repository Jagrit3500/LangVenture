import { Star } from "lucide-react";

interface XPBadgeProps {
  xp: number;
  level: number;
}

const XPBadge = ({ xp, level }: XPBadgeProps) => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-primary text-white shadow-float">
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <Star className="w-5 h-5 fill-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium opacity-90">Level {level}</span>
        <span className="text-sm font-bold">{xp} XP</span>
      </div>
    </div>
  );
};

export default XPBadge;
