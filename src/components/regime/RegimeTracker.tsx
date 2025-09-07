
import React, { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import RegimeNavigation from './RegimeNavigation';
import DashboardTab from './tabs/DashboardTab';
import ProgressTab from './tabs/ProgressTab';
import CalendarTab from './tabs/CalendarTab';
import ObjectivesTab from './tabs/ObjectivesTab';
import { useRegimeData } from '@/hooks/useRegimeData';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useGamificationData } from '@/hooks/useGamificationData';

const RegimeTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const isMobile = useIsMobile();
  
  // Hooks pour les données
  const { userData } = useUserProfile();
  const { progressData, weightHistory, caloriesHistory, formatObjectiveText } = useRegimeData();
  const { gamificationData, updateChallenge, completeChallenge } = useGamificationData();
  
  // Utilisation du nom de l'utilisateur
  const userName = userData.name || 'Utilisateur';
  const userGoal = userData.goal === 'lose' ? 'Perdre du poids' : 
                  userData.goal === 'gain' ? 'Prendre du poids' : 'Maintenir le poids';
  
  // Calcul de l'objectif pour l'affichage
  const objectifTexte = formatObjectiveText(userData.goal);

  // Fonction pour marquer un défi comme accompli
  const handleCompleteChallenge = (id: string) => {
    completeChallenge(id);
    toast.success("Défi complété !", {
      description: "Vous avez gagné des points de gamification !",
    });
  };

  // Fonction pour mettre à jour la progression d'un défi
  const handleUpdateChallenge = (id: string, progress: number) => {
    updateChallenge(id, progress);
  };
  
  return (
    <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
      {/* Navigation */}
      <RegimeNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isMobile={isMobile} 
      />
      
      {/* Content */}
      <main className="p-4">
        {activeTab === 'dashboard' && (
          <DashboardTab 
            weightData={weightHistory}
            caloriesData={caloriesHistory}
            progressData={progressData}
            objectifTexte={objectifTexte}
            challenges={gamificationData.challenges}
            onCompleteChallenge={handleCompleteChallenge}
            onUpdateChallenge={handleUpdateChallenge}
            isMobile={isMobile}
          />
        )}
        
        {activeTab === 'progress' && (
          <ProgressTab 
            progressData={progressData} 
          />
        )}
        
        {activeTab === 'calendar' && (
          <CalendarTab />
        )}
        
        {activeTab === 'objectives' && (
          <ObjectivesTab 
            userData={userData}
            progressData={progressData}
          />
        )}
      </main>
    </div>
  );
};

export default RegimeTracker;
