
import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import NutritionStats from './NutritionStats';
import AddMealForm from './AddMealForm';
import MealList from './MealList';
import { Meal, UserData, DailyGoal } from './types';
import { useNutritionData } from '@/hooks/useNutritionData';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useGamificationData } from '@/hooks/useGamificationData';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/sonner';

const DietApp = () => {
  const [newMeal, setNewMeal] = useState<Meal>({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });
  
  const { user } = useAuth();
  const { meals, dailyGoals, addMeal: addMealToSupabase, deleteMeal: deleteMealFromSupabase, calculateTotals } = useNutritionData();
  const { userData, updateUserData } = useUserProfile();
  const { addPoints, awardBadge } = useGamificationData();


  // Calculer les objectifs basés sur les données utilisateur
  const calculateGoals = () => {
    if (!userData.weight || !userData.height || !userData.age) return;

    // Formule de base pour les besoins caloriques (formule Harris-Benedict)
    let bmr;
    if (userData.gender === 'female') {
      bmr = 10 * Number(userData.weight) + 6.25 * Number(userData.height) - 5 * Number(userData.age) - 161;
    } else {
      bmr = 10 * Number(userData.weight) + 6.25 * Number(userData.height) - 5 * Number(userData.age) + 5;
    }
    
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

    // Les objectifs sont maintenant gérés par useNutritionData
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
    const { name, value } = e.target;
    const updatedData = { [name]: value };
    updateUserData(updatedData);
  };
  
  // Gérer le changement des cases à cocher
  const handleCheckboxChange = (field: string, value: any) => {
    if (!userData.preferences) return;
    
    updateUserData({
      preferences: {
        ...userData.preferences,
        [field]: value
      }
    });
  };

  // Ajouter un nouveau repas
  const handleAddMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Vous devez être connecté pour ajouter un repas');
      return;
    }

    await addMealToSupabase(newMeal);
    
    setNewMeal({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    });
    
    // Ajouter des points
    addPoints(10, "Nouveau repas ajouté");
    
    // Vérifier si c'est le premier repas
    if (meals.length === 0) {
      awardBadge('first-meal');
    }
  };

  // Supprimer un repas
  const handleDeleteMeal = async (index: number) => {
    await deleteMealFromSupabase(index);
  };

  // Recalculer les objectifs quand les données utilisateur changent
  useEffect(() => {
    calculateGoals();
  }, [userData]);

  // Calculer les totaux pour l'affichage
  const totals = calculateTotals(meals);
  
  // Calculer les pourcentages de progression
  const progress = {
    calories: Math.min(100, (totals.calories / dailyGoals.calories) * 100),
    protein: Math.min(100, (totals.protein / dailyGoals.protein) * 100),
    carbs: Math.min(100, (totals.carbs / dailyGoals.carbs) * 100),
    fat: Math.min(100, (totals.fat / dailyGoals.fat) * 100)
  };

  if (!user) {
    return (
      <div className="islamic-border p-6 max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-islamic-green-dark mb-4">Mon Suivi Nutritionnel</h1>
        <p className="text-lg text-islamic-slate mb-6">
          Veuillez vous connecter pour accéder à votre suivi nutritionnel personnalisé.
        </p>
        <a href="/auth" className="inline-block px-6 py-3 bg-islamic-green text-white rounded-lg hover:bg-islamic-green-dark transition-colors">
          Se connecter
        </a>
      </div>
    );
  }

  return (
    <div className="islamic-border p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-islamic-green-dark mb-8 text-center">Mon Suivi Nutritionnel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <UserProfile 
          userData={userData} 
          onUserDataChange={handleUserDataChange}
          onCheckboxChange={handleCheckboxChange}
        />
        
        <NutritionStats 
          totals={totals} 
          dailyGoal={dailyGoals} 
          progress={progress} 
        />
      </div>
      
      <AddMealForm 
        newMeal={newMeal} 
        onMealChange={handleMealChange} 
        onAddMeal={handleAddMeal} 
      />
      
      <MealList 
        meals={meals} 
        onDeleteMeal={handleDeleteMeal} 
      />
    </div>
  );
};

export default DietApp;
