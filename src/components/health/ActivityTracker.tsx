
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/sonner';
import { Activity, Flame, Footprints } from 'lucide-react';
import Chart from 'chart.js/auto';
import { useIsMobile } from '@/hooks/use-mobile';

const ActivityTracker = () => {
  const { userData, addPoints, completeChallenge, updateChallenge, updateUserData } = useUser();
  const [isConnected, setIsConnected] = useState(false);
  const [activityData, setActivityData] = useState({
    steps: 0,
    calories: 0,
    distance: 0
  });
  const [weeklyData, setWeeklyData] = useState({
    steps: Array(7).fill(0),
    labels: Array(7).fill('')
  });
  
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const isMobile = useIsMobile();
  
  // Connecter l'API de santé (simulation)
  const connectHealthAPI = () => {
    // Simuler la connexion
    setIsConnected(true);
    
    // Simuler des données pour la démonstration
    simulateActivityData();
    
    // Récompenser l'utilisateur pour la connexion
    addPoints(20, "Connexion d'un appareil de suivi d'activité");
    
    toast.success("Appareil connecté", {
      description: "Vos données d'activité sont maintenant synchronisées automatiquement."
    });
    
    // Mettre à jour le défi quotidien
    if (userData.gamification) {
      const stepsChallenge = userData.gamification.challenges.find(c => c.id === 'daily-steps');
      if (stepsChallenge) {
        updateChallenge('daily-steps', activityData.steps / 100); // Conversion pour la progression
      }
    }
  };
  
  // Simuler les données d'activité
  const simulateActivityData = () => {
    // Simuler un nombre de pas entre 5000 et 15000
    const steps = Math.floor(Math.random() * 10000) + 5000;
    
    // Calculer les autres données
    const weight = parseFloat(userData.weight as string) || 70;
    const height = parseFloat(userData.height as string) || 170;
    const strideLength = height * 0.415 / 100; // Longueur de foulée en mètres
    const distance = (steps * strideLength) / 1000; // Distance en km
    const caloriesPerStep = weight * 0.0005;
    const calories = steps * caloriesPerStep;
    
    setActivityData({
      steps,
      calories: Math.round(calories),
      distance: parseFloat(distance.toFixed(2))
    });
    
    // Simuler des données pour les 7 derniers jours
    const newWeeklyData = {
      steps: Array(7).fill(0),
      labels: Array(7).fill('')
    };
    
    for (let i = 0; i < 7; i++) {
      newWeeklyData.steps[i] = Math.floor(Math.random() * 10000) + 3000;
      
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      newWeeklyData.labels[i] = date.toLocaleDateString('fr-FR', { weekday: 'short' });
    }
    
    setWeeklyData(newWeeklyData);
  };
  
  // Fonction pour enregistrer le profil
  const saveProfile = () => {
    // Cette fonction serait utilisée si nous avions un formulaire de profil intégré
    // Dans notre cas, nous utilisons le contexte utilisateur
    toast.success("Profil mis à jour", {
      description: "Vos données de profil ont été sauvegardées."
    });
  };
  
  // Initialiser et mettre à jour le graphique
  useEffect(() => {
    if (isConnected && chartRef.current) {
      // Détruire l'ancien graphique s'il existe
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: weeklyData.labels,
            datasets: [{
              label: 'Pas quotidiens',
              data: weeklyData.steps,
              backgroundColor: 'rgba(21, 128, 61, 0.7)',
              borderColor: 'rgba(21, 128, 61, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Nombre de pas'
                }
              }
            }
          }
        });
      }
    }
    
    return () => {
      // Nettoyer le graphique lors du démontage
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [isConnected, weeklyData]);
  
  // Vérifier et charger les données d'activité stockées
  useEffect(() => {
    const storedActivity = localStorage.getItem('activity-data');
    if (storedActivity) {
      const parsedData = JSON.parse(storedActivity);
      setActivityData(parsedData.activityData);
      setWeeklyData(parsedData.weeklyData);
      setIsConnected(true);
    }
    
    // Si des données existent déjà pour l'utilisateur, marquer comme connecté
    if (userData.weight && userData.height) {
      setIsConnected(true);
      simulateActivityData();
    }
  }, []);
  
  // Sauvegarder les données d'activité dans localStorage
  useEffect(() => {
    if (isConnected) {
      localStorage.setItem('activity-data', JSON.stringify({
        activityData,
        weeklyData
      }));
    }
  }, [isConnected, activityData, weeklyData]);
  
  return (
    <Card>
      <CardHeader className={isMobile ? "pb-2" : "pb-2"}>
        <CardTitle className="text-xl font-semibold text-islamic-green">
          Suivi Automatique de Pas et Calories
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="text-center py-6">
            <p className="mb-4 text-islamic-slate">
              Pour suivre automatiquement vos pas et calories, nous avons besoin d'accéder à vos données d'activité physique.
            </p>
            <Button 
              onClick={connectHealthAPI}
              className="bg-islamic-green hover:bg-islamic-green-dark"
            >
              Connecter mon appareil
            </Button>
            <p className="text-xs text-gray-500 mt-3">
              Compatible avec Google Fit, Apple Health, Samsung Health et autres appareils.
            </p>
          </div>
        ) : (
          <>
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
            
            <div className={`h-${isMobile ? '40' : '64'} mt-6`}>
              <canvas ref={chartRef} height="300"></canvas>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTracker;
