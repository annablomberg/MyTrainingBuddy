export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface ExerciseEvent {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  price: number;         // in SEK
  location: string;     
  sport: string;      
  date: string;          // ISO "2025-12-10"
}

export interface SearchFilters {
  query: string;
  difficulty: "any" | Difficulty;
  maxPrice?: number | null;
  location: string;
  sport: string;
  date: string;          // "" = any
}