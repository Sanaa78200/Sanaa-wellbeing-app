
import React from 'react';
import { DailyGoal, Totals, Progress } from './types';
import { Progress as ProgressBar } from '@/components/ui/progress';

interface NutritionStatsProps {
  totals: Totals;
  dailyGoal: DailyGoal;
  progress: Progress;
}

const NutritionStats = ({ totals, dailyGoal, progress }: NutritionStatsProps) => {
  return (
    <div className="islamic-card p-6">
      <h2 className="text-xl font-bold text-islamic-green-dark mb-4">Objectifs Journaliers</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Calories:</span>
            <span className="text-sm font-medium">{totals.calories} / {dailyGoal.calories}</span>
          </div>
          <ProgressBar value={progress.calories} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Protéines (g):</span>
            <span className="text-sm font-medium">{totals.protein} / {dailyGoal.protein}</span>
          </div>
          <ProgressBar value={progress.protein} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Glucides (g):</span>
            <span className="text-sm font-medium">{totals.carbs} / {dailyGoal.carbs}</span>
          </div>
          <ProgressBar value={progress.carbs} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Lipides (g):</span>
            <span className="text-sm font-medium">{totals.fat} / {dailyGoal.fat}</span>
          </div>
          <ProgressBar value={progress.fat} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default NutritionStats;
