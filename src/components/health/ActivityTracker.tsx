
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { useActivityData } from '@/hooks/useActivityData';
import { useGamificationData } from '@/hooks/useGamificationData';
import ActivityMetrics from './ActivityMetrics';
import ActivityChart from './ActivityChart';
import ConnectDevicePrompt from './ConnectDevicePrompt';

const ActivityTracker = () => {
  const isMobile = useIsMobile();
  const { isConnected, activityData, weeklyData, connectHealthAPI } = useActivityData();
  const { addPoints, updateChallenge } = useGamificationData();
  
  // Connecter l'API de santé avec des récompenses
  const handleConnectHealthAPI = () => {
    connectHealthAPI();
    
    // Récompenser l'utilisateur pour la connexion
    addPoints(20, "Connexion d'un appareil de suivi d'activité");
    
    toast.success("Appareil connecté", {
      description: "Vos données d'activité sont maintenant synchronisées automatiquement."
    });
    
    // Mettre à jour le défi quotidien des pas
    updateChallenge('daily-steps', activityData.steps / 100); // Conversion pour la progression
  };
  
  return (
    <Card>
      <CardHeader className={isMobile ? "pb-2" : "pb-2"}>
        <CardTitle className="text-xl font-semibold text-islamic-green">
          Suivi Automatique de Pas et Calories
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <ConnectDevicePrompt onConnect={handleConnectHealthAPI} />
        ) : (
          <>
            <ActivityMetrics activityData={activityData} />
            <ActivityChart 
              weeklyData={weeklyData} 
              height={isMobile ? '40' : '64'} 
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTracker;
