import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Meal, NutritionTotals, DailyGoal } from '@/components/nutrition/types';
import { toast } from '@/components/ui/sonner';

export const useNutritionData = () => {
  const { user } = useAuth();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [dailyGoals, setDailyGoals] = useState<DailyGoal>({
    calories: 2000,
    protein: 100,
    carbs: 250,
    fat: 65
  });
  const [isLoading, setIsLoading] = useState(false);

  // Calculer les totaux nutritionnels
  const calculateTotals = (mealsList: Meal[]): NutritionTotals => {
    return mealsList.reduce((acc, meal) => {
      return {
        calories: acc.calories + Number(meal.calories || 0),
        protein: acc.protein + Number(meal.protein || 0),
        carbs: acc.carbs + Number(meal.carbs || 0),
        fat: acc.fat + Number(meal.fat || 0)
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  // Charger les données nutritionnelles du jour
  const loadTodayNutritionData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('nutrition_data')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (error) {
        console.error('Erreur lors du chargement:', error);
        return;
      }

      if (data) {
        setMeals((data.meals as unknown as Meal[]) || []);
        setDailyGoals((data.daily_goals as unknown as DailyGoal) || dailyGoals);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sauvegarder les données nutritionnelles
  const saveNutritionData = async (newMeals: Meal[], newGoals?: DailyGoal) => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const totals = calculateTotals(newMeals);
      const goalsToSave = newGoals || dailyGoals;

      const { error } = await supabase
        .from('nutrition_data')
        .upsert({
          user_id: user.id,
          date: today,
          meals: newMeals as any,
          totals: totals as any,
          daily_goals: goalsToSave as any
        });

      if (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        toast.error('Erreur lors de la sauvegarde');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la sauvegarde');
      return false;
    }
  };

  // Ajouter un repas
  const addMeal = async (meal: Meal) => {
    const newMeals = [...meals, meal];
    setMeals(newMeals);
    
    const success = await saveNutritionData(newMeals);
    if (success) {
      toast.success('Repas ajouté avec succès !');
    }
  };

  // Supprimer un repas
  const deleteMeal = async (index: number) => {
    const newMeals = [...meals];
    newMeals.splice(index, 1);
    setMeals(newMeals);
    
    const success = await saveNutritionData(newMeals);
    if (success) {
      toast.success('Repas supprimé');
    }
  };

  // Mettre à jour les objectifs
  const updateDailyGoals = async (newGoals: DailyGoal) => {
    setDailyGoals(newGoals);
    const success = await saveNutritionData(meals, newGoals);
    if (success) {
      toast.success('Objectifs mis à jour');
    }
  };

  // Charger les données au montage et quand l'utilisateur change
  useEffect(() => {
    if (user) {
      loadTodayNutritionData();
    } else {
      setMeals([]);
      setDailyGoals({
        calories: 2000,
        protein: 100,
        carbs: 250,
        fat: 65
      });
    }
  }, [user]);

  return {
    meals,
    dailyGoals,
    isLoading,
    addMeal,
    deleteMeal,
    updateDailyGoals,
    calculateTotals,
    loadTodayNutritionData
  };
};