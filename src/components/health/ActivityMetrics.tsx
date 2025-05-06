
import React from 'react';
import { Footprints, Flame, Activity } from 'lucide-react';
import type { ActivityData } from './hooks/useActivityData';

interface ActivityMetricsProps {
  activityData: ActivityData;
}

const ActivityMetrics: React.FC<ActivityMetricsProps> = ({ activityData }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
        <div className="text-islamic-green mb-1">
          <Footprints className="h-5 w-5 mx-auto" />
        </div>
        <div className="text-2xl font-bold text-islamic-green-dark">
          {activityData.steps.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">Pas aujourd'hui</div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
        <div className="text-islamic-green mb-1">
          <Flame className="h-5 w-5 mx-auto" />
        </div>
        <div className="text-2xl font-bold text-islamic-green-dark">
          {activityData.calories.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">kcal brûlées</div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
        <div className="text-islamic-green mb-1">
          <Activity className="h-5 w-5 mx-auto" />
        </div>
        <div className="text-2xl font-bold text-islamic-green-dark">
          {activityData.distance}
        </div>
        <div className="text-xs text-gray-500">km parcourus</div>
      </div>
    </div>
  );
};

export default ActivityMetrics;
