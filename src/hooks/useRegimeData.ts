import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/sonner';

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

export const useRegimeData = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<ProgressData>({
    poidsInitial: 78.2,
    poidsActuel: 74.5,
    poidsCible: 70.0,
    joursSuivis: 15,
    moyenneCalories: 1694,
    perteGraisse: 2.1
  });
  const [weightHistory, setWeightHistory] = useState<WeightDataPoint[]>([]);
  const [caloriesHistory, setCaloriesHistory] = useState<CaloriesDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Charger les données de régime depuis Supabase
  const loadRegimeData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('regime_data')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (error) {
        console.error('Erreur lors du chargement:', error);
        return;
      }

      if (data) {
        setProgressData({
          poidsInitial: data.poids_initial || 78.2,
          poidsActuel: data.poids_actuel || 74.5,
          poidsCible: data.poids_cible || 70.0,
          joursSuivis: data.jours_suivis || 15,
          moyenneCalories: data.moyenne_calories || 1694,
          perteGraisse: data.perte_graisse || 2.1
        });

        // Charger l'historique
        const weightHist = (data.weight_history as any) || [];
        const caloriesHist = (data.calories_history as any) || [];
        
        if (weightHist.length > 0) {
          setWeightHistory(weightHist);
        } else {
          generateMockData();
        }
        
        if (caloriesHist.length > 0) {
          setCaloriesHistory(caloriesHist);
        }
      } else {
        // Première utilisation, générer des données mock
        generateMockData();
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sauvegarder les données de régime
  const saveRegimeData = async (newProgressData?: ProgressData) => {
    if (!user) return false;

    try {
      const today = new Date().toISOString().split('T')[0];
      const dataToSave = newProgressData || progressData;
      
      const { error } = await supabase
        .from('regime_data')
        .upsert({
          user_id: user.id,
          date: today,
          poids_initial: dataToSave.poidsInitial,
          poids_actuel: dataToSave.poidsActuel,
          poids_cible: dataToSave.poidsCible,
          jours_suivis: dataToSave.joursSuivis,
          moyenne_calories: dataToSave.moyenneCalories,
          perte_graisse: dataToSave.perteGraisse,
          weight_history: weightHistory as any,
          calories_history: caloriesHistory as any
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

  // Générer des données mock pour les nouveaux utilisateurs
  const generateMockData = () => {
    const mockWeightData: WeightDataPoint[] = [
      { date: '1 Mai', poids: 75.5 },
      { date: '2 Mai', poids: 75.3 },
      { date: '3 Mai', poids: 75.2 },
      { date: '4 Mai', poids: 74.8 },
      { date: '5 Mai', poids: 74.5 },
    ];

    const mockCaloriesData: CaloriesDataPoint[] = [
      { date: '1 Mai', calories: 1800 },
      { date: '2 Mai', calories: 1720 },
      { date: '3 Mai', calories: 1650 },
      { date: '4 Mai', calories: 1700 },
      { date: '5 Mai', calories: 1600 },
    ];

    setWeightHistory(mockWeightData);
    setCaloriesHistory(mockCaloriesData);
  };

  // Mettre à jour les données de progression
  const updateProgressData = async (updates: Partial<ProgressData>) => {
    const newProgressData = { ...progressData, ...updates };
    setProgressData(newProgressData);
    
    const success = await saveRegimeData(newProgressData);
    if (success) {
      toast.success('Données de régime mises à jour');
    }
  };

  // Ajouter un nouveau point de poids
  const addWeightPoint = async (newWeight: number) => {
    const today = new Date().toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short' 
    });
    
    const newWeightHistory = [...weightHistory, { date: today, poids: newWeight }];
    setWeightHistory(newWeightHistory);
    
    // Mettre à jour le poids actuel
    await updateProgressData({ poidsActuel: newWeight });
  };

  // Calculer la perte/gain de poids
  const calculateWeightLoss = (initial: number, current: number): string => {
    const loss = initial - current;
    return loss > 0 ? `-${loss.toFixed(1)} kg` : `+${Math.abs(loss).toFixed(1)} kg`;
  };

  // Formater le texte d'objectif
  const formatObjectiveText = (goal: 'lose' | 'maintain' | 'gain' | string | undefined): string => {
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

  // Charger les données au montage et quand l'utilisateur change
  useEffect(() => {
    if (user) {
      loadRegimeData();
    } else {
      setProgressData({
        poidsInitial: 78.2,
        poidsActuel: 74.5,
        poidsCible: 70.0,
        joursSuivis: 15,
        moyenneCalories: 1694,
        perteGraisse: 2.1
      });
      setWeightHistory([]);
      setCaloriesHistory([]);
    }
  }, [user]);

  // Écouter les changements en temps réel
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('regime-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'regime_data',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            const data = payload.new as any;
            setProgressData({
              poidsInitial: data.poids_initial || 78.2,
              poidsActuel: data.poids_actuel || 74.5,
              poidsCible: data.poids_cible || 70.0,
              joursSuivis: data.jours_suivis || 15,
              moyenneCalories: data.moyenne_calories || 1694,
              perteGraisse: data.perte_graisse || 2.1
            });

            if (data.weight_history) {
              setWeightHistory(data.weight_history);
            }
            if (data.calories_history) {
              setCaloriesHistory(data.calories_history);
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
    progressData,
    weightHistory,
    caloriesHistory,
    isLoading,
    updateProgressData,
    addWeightPoint,
    calculateWeightLoss,
    formatObjectiveText,
    loadRegimeData
  };
};