
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
  favoriteFoods?: string[];
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
  isEarned?: boolean;
  earnedAt?: string;
}

export interface Gamification {
  points: number;
  level: number;
  streak: number;
  challenges: Challenge[];
  badges: Badge[];
  achievements: string[];
  lastActiveDate?: string;
}

export interface DailyNutrition {
  date: string;
  totals: NutritionTotals;
  mealsCount: number;
}

export interface UserData {
  name?: string;
  age?: string;
  weight?: string;
  height?: string;
  gender?: 'male' | 'female' | 'other';
  goal?: 'lose' | 'gain' | 'maintain';
  preferences?: UserPreferences;
  gamification?: Gamification;
  avatar?: string;
  dailyNutrition?: DailyNutrition;
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

// Legacy alias for compatibility
export type Totals = NutritionTotals;
export type GamificationData = Gamification;
