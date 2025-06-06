
export interface Meal {
  name: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface DailyGoal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface UserPreferences {
  halal?: boolean;
  vegetarian?: boolean;
  vegan?: boolean;
  allergies?: string[];
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  points: number;
  progress?: number;
  goal?: number;
  completed?: boolean;
  type: 'daily' | 'weekly' | 'monthly';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface Gamification {
  points: number;
  level: number;
  streak: number;
  challenges: Challenge[];
  badges: Badge[];
  achievements: string[];
}

export interface UserData {
  name?: string;
  age?: string;
  weight?: string;
  height?: string;
  gender?: 'male' | 'female';
  goal?: 'lose' | 'gain' | 'maintain';
  preferences?: UserPreferences;
  gamification?: Gamification;
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  edited?: boolean;
}

export interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Progress {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
