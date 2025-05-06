
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

export interface ActivityData {
  steps: number;
  calories: number;
  distance: number;
}

export interface WeeklyData {
  steps: number[];
  labels: string[];
}

export function useActivityData() {
  const { userData } = useUser();
  const [isConnected, setIsConnected] = useState(false);
  const [activityData, setActivityData] = useState<ActivityData>({
    steps: 0,
    calories: 0,
    distance: 0
  });
  const [weeklyData, setWeeklyData] = useState<WeeklyData>({
    steps: Array(7).fill(0),
    labels: Array(7).fill('')
  });
  
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
  
  // Connecter l'API de santé (simulation)
  const connectHealthAPI = () => {
    setIsConnected(true);
    simulateActivityData();
  };
  
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
  
  return {
    isConnected,
    activityData,
    weeklyData,
    connectHealthAPI
  };
}
