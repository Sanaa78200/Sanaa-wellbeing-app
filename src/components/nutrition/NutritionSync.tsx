
import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Meal, NutritionTotals } from './types';

interface NutritionSyncProps {
  meals: Meal[];
  onMealsUpdate: (meals: Meal[]) => void;
}

const NutritionSync: React.FC<NutritionSyncProps> = ({ meals, onMealsUpdate }) => {
  const { userData, updateUserData } = useUser();
  const [storedMeals, setStoredMeals] = useLocalStorage<Meal[]>('daily-meals', []);

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

  // Synchroniser les repas avec le localStorage
  useEffect(() => {
    if (meals.length !== storedMeals.length) {
      setStoredMeals(meals);
    }
  }, [meals, storedMeals.length, setStoredMeals]);

  // Mettre à jour les statistiques utilisateur
  useEffect(() => {
    const totals = calculateTotals(meals);
    
    // Mettre à jour les données nutritionnelles du jour
    updateUserData({
      dailyNutrition: {
        date: new Date().toISOString().split('T')[0],
        totals,
        mealsCount: meals.length
      }
    });
  }, [meals, updateUserData]);

  // Charger les repas stockés au démarrage
  useEffect(() => {
    if (storedMeals.length > 0 && meals.length === 0) {
      onMealsUpdate(storedMeals);
    }
  }, [storedMeals, meals.length, onMealsUpdate]);

  return null; // Composant invisible de synchronisation
};

export default NutritionSync;
