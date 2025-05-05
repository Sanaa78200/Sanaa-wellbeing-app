
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
