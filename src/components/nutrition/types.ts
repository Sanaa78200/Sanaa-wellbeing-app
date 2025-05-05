
export interface Meal {
  name: string;
  calories: string | number;
  protein: string | number;
  carbs: string | number;
  fat: string | number;
}

export interface UserData {
  weight: string | number;
  height: string | number;
  age: string | number;
  goal: 'lose' | 'maintain' | 'gain';
  name?: string;
  gender?: 'male' | 'female' | 'other';
  avatar?: string;
  preferences?: {
    halal: boolean;
    vegetarian: boolean;
    vegan: boolean;
    allergies: string[];
    favoriteFoods: string[];
  };
  gamification?: GamificationData;
}

export interface GamificationData {
  points: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  badges: Badge[];
  challenges: Challenge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  isEarned: boolean;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  points: number;
  isCompleted: boolean;
  expiresAt?: string;
  progress?: number;
  goal?: number;
}

export interface DailyGoal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Totals {
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

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
