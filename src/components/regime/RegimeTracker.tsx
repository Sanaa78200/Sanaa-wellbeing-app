
import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import RegimeNavigation from './RegimeNavigation';
import DashboardTab from './tabs/DashboardTab';
import ProgressTab from './tabs/ProgressTab';
import CalendarTab from './tabs/CalendarTab';
import ObjectivesTab from './tabs/ObjectivesTab';
import { getMockCaloriesData, getMockWeightData, formatObjectiveText } from './RegimeData';

const RegimeTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { userData, updateChallenge, completeChallenge } = useUser();
  const isMobile = useIsMobile();
  
  // Utilisation du nom de l'utilisateur du contexte
  const userName = userData.name || 'Utilisateur';
  const userGoal = userData.goal === 'lose' ? 'Perdre du poids' : 
                  userData.goal === 'gain' ? 'Prendre du poids' : 'Maintenir le poids';
  
  // Données pour les graphiques
  const weightData = getMockWeightData();
  const caloriesData = getMockCaloriesData();
  
  // Données de progression
  const progressData = {
    poidsInitial: typeof userData.weight === 'string' ? parseFloat(userData.weight) : userData.weight || 78.2,
    poidsActuel: 74.5,
    poidsCible: userData.goal === 'lose' ? 70.0 : userData.goal === 'gain' ? 85.0 : 
                typeof userData.weight === 'string' ? parseFloat(userData.weight) : userData.weight || 75.0,
    joursSuivis: userData.gamification?.streak || 15,
    moyenneCalories: 1694,
    perteGraisse: 2.1,
  };

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
            weightData={weightData}
            caloriesData={caloriesData}
            progressData={progressData}
            objectifTexte={objectifTexte}
            challenges={userData.gamification?.challenges}
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
