
import { Challenge } from '@/components/nutrition/types';

// Mock data structures for the regime tracker
export interface ProgressData {
  poidsInitial: number;
  poidsActuel: number;
  poidsCible: number;
  joursSuivis: number;
  moyenneCalories: number;
  perteGraisse: number;
}

export interface WeightDataPoint {
  date: string;
  poids: number;
}

export interface CaloriesDataPoint {
  date: string;
  calories: number;
}

// Functions to generate or format data
export const calculateWeightLoss = (initial: number, current: number): string => {
  const loss = initial - current;
  return loss > 0 ? `-${loss.toFixed(1)} kg` : `+${Math.abs(loss).toFixed(1)} kg`;
};

export const formatObjectiveText = (goal: 'lose' | 'maintain' | 'gain' | string | undefined): string => {
  if (!goal) return 'Maintenir le poids';
  
  switch (goal) {
    case 'lose':
      return `-0.5 kg / semaine`;
    case 'gain':
      return `+0.5 kg / semaine`;
    default:
      return `Maintenir le poids`;
  }
};

// Mock data for development
export const getMockWeightData = (): WeightDataPoint[] => [
  { date: '1 Mai', poids: 75.5 },
  { date: '2 Mai', poids: 75.3 },
  { date: '3 Mai', poids: 75.2 },
  { date: '4 Mai', poids: 74.8 },
  { date: '5 Mai', poids: 74.5 },
];

export const getMockCaloriesData = (): CaloriesDataPoint[] => [
  { date: '1 Mai', calories: 1800 },
  { date: '2 Mai', calories: 1720 },
  { date: '3 Mai', calories: 1650 },
  { date: '4 Mai', calories: 1700 },
  { date: '5 Mai', calories: 1600 },
];
