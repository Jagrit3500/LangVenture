export interface Lesson {
  id: string;
  title: string;
  path: string;
  duration: string;
  xp: number;
  content: string[];
  challenge?: string;
}

export const demoLessons: Lesson[] = [
  {
    id: "1",
    title: "Order Coffee in Spanish",
    path: "Food & Travel",
    duration: "10 min",
    xp: 50,
    content: [
      "Un café con leche, por favor - A coffee with milk, please",
      "¿Cuánto cuesta? - How much does it cost?",
      "La cuenta, por favor - The check, please",
    ],
    challenge: "Record yourself ordering coffee in Spanish",
  },
  {
    id: "2",
    title: "Ask for Directions",
    path: "Food & Travel",
    duration: "12 min",
    xp: 60,
    content: [
      "¿Dónde está la estación? - Where is the station?",
      "¿Cómo llego al museo? - How do I get to the museum?",
      "Estoy perdido - I am lost",
    ],
    challenge: "Practice asking for directions",
  },
  {
    id: "3",
    title: "Talk About Your Favorite Song",
    path: "Music & Art",
    duration: "15 min",
    xp: 70,
    content: [
      "Me encanta esta canción - I love this song",
      "El ritmo es increíble - The rhythm is incredible",
      "¿Qué tipo de música te gusta? - What type of music do you like?",
    ],
    challenge: "Describe your favorite song in Spanish",
  },
  {
    id: "4",
    title: "Discuss a Movie Scene",
    path: "Movies & Media",
    duration: "18 min",
    xp: 80,
    content: [
      "Esta película es emocionante - This movie is exciting",
      "El actor principal es talentoso - The main actor is talented",
      "¿Has visto esta película? - Have you seen this movie?",
    ],
    challenge: "Talk about your favorite movie",
  },
];
