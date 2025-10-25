export interface Path {
  id: string;
  title: string;
  icon: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  color: string;
}

export const demoPaths: Path[] = [
  {
    id: "1",
    title: "Food & Travel",
    icon: "🍕",
    description: "Learn to navigate restaurants, markets, and travel conversations",
    progress: 65,
    totalLessons: 20,
    completedLessons: 13,
    color: "from-orange-400 to-pink-500",
  },
  {
    id: "2",
    title: "Music & Art",
    icon: "🎵",
    description: "Express yourself through creative conversations and cultural appreciation",
    progress: 40,
    totalLessons: 18,
    completedLessons: 7,
    color: "from-purple-400 to-indigo-500",
  },
  {
    id: "3",
    title: "Movies & Media",
    icon: "🎬",
    description: "Discuss films, shows, and entertainment in your target language",
    progress: 25,
    totalLessons: 15,
    completedLessons: 4,
    color: "from-blue-400 to-cyan-500",
  },
];
