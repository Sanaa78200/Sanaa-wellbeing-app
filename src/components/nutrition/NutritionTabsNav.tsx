
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Utensils, Activity, Calendar } from 'lucide-react';

interface NutritionTabsNavProps {
  isMobile: boolean;
}

const NutritionTabsNav: React.FC<NutritionTabsNavProps> = ({ isMobile }) => {
  return (
    <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
      <TabsTrigger value="nutrition" className="flex items-center gap-2 data-[state=active]:bg-islamic-green data-[state=active]:text-white">
        <Utensils className="w-4 h-4" />
        <span className={isMobile ? "sr-only" : ""}>Nutrition</span>
      </TabsTrigger>
      <TabsTrigger value="regime" className="flex items-center gap-2 data-[state=active]:bg-islamic-green data-[state=active]:text-white">
        <Activity className="w-4 h-4" />
        <span className={isMobile ? "sr-only" : ""}>Régime</span>
      </TabsTrigger>
      <TabsTrigger value="activite" className="flex items-center gap-2 data-[state=active]:bg-islamic-green data-[state=active]:text-white">
        <Calendar className="w-4 h-4" />
        <span className={isMobile ? "sr-only" : ""}>Activité</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default NutritionTabsNav;
