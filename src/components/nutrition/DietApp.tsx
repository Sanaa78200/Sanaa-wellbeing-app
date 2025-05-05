
import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import NutritionStats from './NutritionStats';
import AddMealForm from './AddMealForm';
import MealList from './MealList';
import { Meal, UserData, DailyGoal } from './types';

const DietApp = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [newMeal, setNewMeal] = useState<Meal>({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });
  const [dailyGoal, setDailyGoal] = useState<DailyGoal>({
    calories: 2000,
    protein: 100,
    carbs: 250,
    fat: 65
  });
  const [userData, setUserData] = useState<UserData>({
    weight: '',
    height: '',
    age: '',
    goal: 'maintain' // 'lose', 'maintain', 'gain'
  });

  // Calculer les totaux nutritionnels
  const calculateTotals = () => {
    return meals.reduce((acc, meal) => {
      return {
        calories: acc.calories + Number(meal.calories),
        protein: acc.protein + Number(meal.protein),
        carbs: acc.carbs + Number(meal.carbs),
        fat: acc.fat + Number(meal.fat)
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  // Calculer les objectifs basés sur les données utilisateur
  const calculateGoals = () => {
    if (!userData.weight || !userData.height || !userData.age) return;

    // Formule de base pour les besoins caloriques (formule Harris-Benedict)
    const bmr = 10 * Number(userData.weight) + 6.25 * Number(userData.height) - 5 * Number(userData.age) + 5;
    
    let calorieGoal = bmr * 1.2; // Facteur d'activité sédentaire par défaut

    // Ajuster selon l'objectif
    switch(userData.goal) {
      case 'lose':
        calorieGoal -= 500; // Déficit pour perte de poids
        break;
      case 'gain':
        calorieGoal += 500; // Surplus pour prise de masse
        break;
      default:
        // Maintien du poids
        break;
    }

    setDailyGoal({
      calories: Math.round(calorieGoal),
      protein: Math.round(Number(userData.weight) * 1.6), // 1.6g de protéines par kg de poids
      carbs: Math.round(calorieGoal * 0.5 / 4), // 50% des calories en glucides (4cal/g)
      fat: Math.round(calorieGoal * 0.3 / 9) // 30% des calories en lipides (9cal/g)
    });
  };

  // Gérer le changement des champs du formulaire pour un nouveau repas
  const handleMealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMeal({
      ...newMeal,
      [e.target.name]: e.target.value
    });
  };

  // Gérer le changement des données utilisateur
  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  // Ajouter un nouveau repas
  const addMeal = (e: React.FormEvent) => {
    e.preventDefault();
    setMeals([...meals, newMeal]);
    setNewMeal({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    });
  };

  // Supprimer un repas
  const deleteMeal = (index: number) => {
    const updatedMeals = [...meals];
    updatedMeals.splice(index, 1);
    setMeals(updatedMeals);
  };

  // Recalculer les objectifs quand les données utilisateur changent
  useEffect(() => {
    calculateGoals();
  }, [userData]);

  // Calculer les totaux pour l'affichage
  const totals = calculateTotals();
  
  // Calculer les pourcentages de progression
  const progress = {
    calories: Math.min(100, (totals.calories / dailyGoal.calories) * 100),
    protein: Math.min(100, (totals.protein / dailyGoal.protein) * 100),
    carbs: Math.min(100, (totals.carbs / dailyGoal.carbs) * 100),
    fat: Math.min(100, (totals.fat / dailyGoal.fat) * 100)
  };

  return (
    <div className="islamic-border p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-islamic-green-dark mb-8 text-center">Mon Suivi Nutritionnel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <UserProfile 
          userData={userData} 
          onUserDataChange={handleUserDataChange} 
        />
        
        <NutritionStats 
          totals={totals} 
          dailyGoal={dailyGoal} 
          progress={progress} 
        />
      </div>
      
      <AddMealForm 
        newMeal={newMeal} 
        onMealChange={handleMealChange} 
        onAddMeal={addMeal} 
      />
      
      <MealList 
        meals={meals} 
        onDeleteMeal={deleteMeal} 
      />
    </div>
  );
};

export default DietApp;
