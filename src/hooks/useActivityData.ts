import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/sonner';

export interface ActivityData {
  steps: number;
  calories: number;
  distance: number;
}

export interface WeeklyData {
  steps: number[];
  labels: string[];
}

export const useActivityData = () => {
  const { user } = useAuth();
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
  const [isLoading, setIsLoading] = useState(false);

  // Charger les données d'activité depuis Supabase
  const loadActivityData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('activity_data')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (error) {
        console.error('Erreur lors du chargement:', error);
        return;
      }

      if (data) {
        setActivityData({
          steps: data.steps || 0,
          calories: data.calories || 0,
          distance: data.distance || 0
        });
        setIsConnected(data.is_connected || false);
        
        // Charger les données hebdomadaires
        const weeklySteps = (data.weekly_steps as any) || [];
        if (weeklySteps.length > 0) {
          setWeeklyData(weeklySteps);
        } else {
          generateWeeklyData();
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sauvegarder les données d'activité
  const saveActivityData = async (newActivityData: ActivityData, newWeeklyData?: WeeklyData) => {
    if (!user) return false;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('activity_data')
        .upsert({
          user_id: user.id,
          date: today,
          steps: newActivityData.steps,
          calories: newActivityData.calories,
          distance: newActivityData.distance,
          weekly_steps: newWeeklyData || weeklyData as any,
          is_connected: isConnected
        });

      if (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur:', error);
      return false;
    }
  };

  // Générer des données hebdomadaires simulées
  const generateWeeklyData = () => {
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
    return newWeeklyData;
  };

  // Simuler les données d'activité
  const simulateActivityData = async () => {
    if (!user) return;

    // Récupérer les données utilisateur depuis Supabase
    const { data: profileData } = await supabase
      .from('profiles')
      .select('weight, height')
      .eq('user_id', user.id)
      .maybeSingle();

    // Simuler un nombre de pas entre 5000 et 15000
    const steps = Math.floor(Math.random() * 10000) + 5000;
    
    // Calculer les autres données
    const weight = profileData?.weight || 70;
    const height = profileData?.height || 170;
    const strideLength = height * 0.415 / 100; // Longueur de foulée en mètres
    const distance = (steps * strideLength) / 1000; // Distance en km
    const caloriesPerStep = weight * 0.0005;
    const calories = steps * caloriesPerStep;
    
    const newActivityData = {
      steps,
      calories: Math.round(calories),
      distance: parseFloat(distance.toFixed(2))
    };

    setActivityData(newActivityData);
    
    // Générer et sauvegarder les données hebdomadaires
    const newWeeklyData = generateWeeklyData();
    
    // Sauvegarder en base
    await saveActivityData(newActivityData, newWeeklyData);
  };
  
  // Connecter l'API de santé (simulation)
  const connectHealthAPI = async () => {
    setIsConnected(true);
    await simulateActivityData();
    toast.success('Appareil connecté avec succès');
  };

  // Charger les données au montage et quand l'utilisateur change
  useEffect(() => {
    if (user) {
      loadActivityData();
    } else {
      setIsConnected(false);
      setActivityData({ steps: 0, calories: 0, distance: 0 });
      setWeeklyData({ steps: Array(7).fill(0), labels: Array(7).fill('') });
    }
  }, [user]);

  // Écouter les changements en temps réel
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('activity-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'activity_data',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            const data = payload.new as any;
            setActivityData({
              steps: data.steps || 0,
              calories: data.calories || 0,
              distance: data.distance || 0
            });
            setIsConnected(data.is_connected || false);
            if (data.weekly_steps) {
              setWeeklyData(data.weekly_steps);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);
  
  return {
    isConnected,
    activityData,
    weeklyData,
    isLoading,
    connectHealthAPI,
    simulateActivityData,
    loadActivityData
  };
};