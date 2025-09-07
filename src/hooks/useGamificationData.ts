import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/sonner';
import { Badge, Challenge, Gamification } from '@/components/nutrition/types';

// Badges disponibles
const availableBadges: Badge[] = [
  {
    id: 'first-meal',
    name: 'Premier repas',
    description: 'Vous avez enregistré votre premier repas',
    icon: '🍽️',
    isEarned: false
  },
  {
    id: 'week-streak',
    name: 'Habitude établie',
    description: '7 jours consécutifs de suivi',
    icon: '🔥',
    isEarned: false
  },
  {
    id: 'weight-loss',
    name: 'Sur la bonne voie',
    description: 'Perte de poids de 1 kg',
    icon: '⚖️',
    isEarned: false
  },
  {
    id: 'nutrition-expert',
    name: 'Expert en nutrition',
    description: 'Ajout de 20 repas équilibrés',
    icon: '📊',
    isEarned: false
  },
  {
    id: 'water-lover',
    name: 'Hydratation parfaite',
    description: 'Boire 8 verres d\'eau pendant 5 jours',
    icon: '💧',
    isEarned: false
  }
];

// Défis quotidiens et hebdomadaires
const dailyChallenges: Challenge[] = [
  {
    id: 'daily-water',
    name: 'Hydratation',
    description: 'Boire 8 verres d\'eau aujourd\'hui',
    points: 20,
    isCompleted: false,
    goal: 8,
    progress: 0,
    type: 'daily'
  },
  {
    id: 'daily-protein',
    name: 'Protéines équilibrées',
    description: 'Atteindre 100% de votre objectif de protéines',
    points: 15,
    isCompleted: false,
    type: 'daily'
  },
  {
    id: 'daily-steps',
    name: 'Activité physique',
    description: 'Faire 5000 pas aujourd\'hui',
    points: 25,
    isCompleted: false,
    goal: 5000,
    progress: 0,
    type: 'daily'
  }
];

export const useGamificationData = () => {
  const { user } = useAuth();
  const [gamificationData, setGamificationData] = useState<Gamification>({
    points: 0,
    level: 1,
    streak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    badges: availableBadges,
    challenges: dailyChallenges,
    achievements: []
  });
  const [isLoading, setIsLoading] = useState(false);

  // Charger les données de gamification depuis Supabase
  const loadGamificationData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('gamification_data')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Erreur lors du chargement:', error);
        return;
      }

      if (data) {
        setGamificationData({
          points: data.points || 0,
          level: data.level || 1,
          streak: data.streak || 0,
          lastActiveDate: data.last_active_date || new Date().toISOString().split('T')[0],
          badges: (data.badges as any) || availableBadges,
          challenges: (data.challenges as any) || dailyChallenges,
          achievements: (data.achievements as any) || []
        });
      } else {
        // Première utilisation, créer les données par défaut
        await saveGamificationData(gamificationData);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sauvegarder les données de gamification
  const saveGamificationData = async (newData?: Gamification) => {
    if (!user) return false;

    try {
      const dataToSave = newData || gamificationData;
      
      const { error } = await supabase
        .from('gamification_data')
        .upsert({
          user_id: user.id,
          points: dataToSave.points,
          level: dataToSave.level,
          streak: dataToSave.streak,
          last_active_date: dataToSave.lastActiveDate,
          badges: dataToSave.badges as any,
          challenges: dataToSave.challenges as any,
          achievements: dataToSave.achievements as any
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

  // Ajouter des points et vérifier le niveau
  const addPoints = async (points: number, reason?: string) => {
    const newPoints = gamificationData.points + points;
    const currentLevel = gamificationData.level;
    const pointsPerLevel = 100;
    const newLevel = Math.floor(newPoints / pointsPerLevel) + 1;
    
    const newData = {
      ...gamificationData,
      points: newPoints,
      level: newLevel,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };

    setGamificationData(newData);
    await saveGamificationData(newData);

    // Si le niveau a augmenté
    if (newLevel > currentLevel) {
      toast.success(`Niveau ${newLevel} atteint !`, {
        description: `Félicitations ! Vous avez gagné ${points} points et atteint le niveau ${newLevel}!`
      });
    } else if (reason) {
      toast.success(`+${points} points`, {
        description: reason
      });
    }
  };

  // Réinitialiser les défis quotidiens
  const resetDailyChallenges = async () => {
    const newChallenges = gamificationData.challenges.map(challenge => ({
      ...challenge,
      isCompleted: false,
      progress: 0
    }));

    const newData = {
      ...gamificationData,
      challenges: newChallenges,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };

    setGamificationData(newData);
    await saveGamificationData(newData);
  };

  // Mettre à jour un défi
  const updateChallenge = async (id: string, progress: number) => {
    const updatedChallenges = gamificationData.challenges.map(challenge => {
      if (challenge.id === id) {
        const newProgress = challenge.progress ? challenge.progress + progress : progress;
        const isCompleted = challenge.goal ? newProgress >= challenge.goal : false;
        
        // Si le défi est complété pour la première fois
        if (isCompleted && !challenge.isCompleted) {
          toast.success(`Défi complété !`, {
            description: `${challenge.name}: ${challenge.description}. +${challenge.points} points !`
          });
          // Ajouter les points dans une fonction séparée pour éviter la récursion
          setTimeout(() => addPoints(challenge.points), 100);
        }
        
        return {
          ...challenge,
          progress: newProgress,
          isCompleted: isCompleted
        };
      }
      return challenge;
    });
    
    const newData = {
      ...gamificationData,
      challenges: updatedChallenges,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };

    setGamificationData(newData);
    await saveGamificationData(newData);
  };

  // Compléter un défi
  const completeChallenge = async (id: string) => {
    const challenge = gamificationData.challenges.find(c => c.id === id);
    
    if (challenge && !challenge.isCompleted) {
      toast.success(`Défi complété !`, {
        description: `${challenge.name}: ${challenge.description}. +${challenge.points} points !`
      });
      
      const updatedChallenges = gamificationData.challenges.map(c => 
        c.id === id ? { ...c, isCompleted: true, progress: c.goal || 1 } : c
      );
      
      const newData = {
        ...gamificationData,
        challenges: updatedChallenges,
        points: gamificationData.points + (challenge.points || 0),
        lastActiveDate: new Date().toISOString().split('T')[0]
      };

      setGamificationData(newData);
      await saveGamificationData(newData);
    }
  };

  // Attribuer un badge
  const awardBadge = async (id: string) => {
    const badge = gamificationData.badges.find(b => b.id === id);
    
    if (badge && !badge.isEarned) {
      const updatedBadges = gamificationData.badges.map(b => 
        b.id === id ? { ...b, isEarned: true, earnedAt: new Date().toISOString() } : b
      );
      
      toast.success(`Nouveau badge débloqué !`, {
        description: `${badge.name}: ${badge.description}`,
        icon: badge.icon
      });
      
      const newData = {
        ...gamificationData,
        badges: updatedBadges,
        points: gamificationData.points + 50, // Bonus pour un badge
        lastActiveDate: new Date().toISOString().split('T')[0]
      };

      setGamificationData(newData);
      await saveGamificationData(newData);
    }
  };

  // Incrémenter le streak
  const incrementStreak = async () => {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = gamificationData.lastActiveDate;
    
    // Si dernier actif était hier, incrémenter le streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    let newStreak = gamificationData.streak;
    
    if (lastActive === yesterdayStr) {
      newStreak = gamificationData.streak + 1;
      
      // Vérifier si un badge de streak doit être attribué
      if (newStreak === 7) {
        awardBadge('week-streak');
      }
    } else if (lastActive !== today) {
      // Si pas actif hier et pas aujourd'hui, réinitialiser le streak
      newStreak = 1;
    }

    const newData = {
      ...gamificationData,
      streak: newStreak,
      lastActiveDate: today
    };

    setGamificationData(newData);
    await saveGamificationData(newData);
  };

  // Vérifier la date et réinitialiser les défis quotidiens si nécessaire
  useEffect(() => {
    if (!user) return;

    const checkDate = () => {
      const today = new Date().toISOString().split('T')[0];
      
      if (gamificationData.lastActiveDate !== today) {
        resetDailyChallenges();
        incrementStreak();
      }
    };

    checkDate();
    // Vérifier la date toutes les heures
    const interval = setInterval(checkDate, 3600000);
    return () => clearInterval(interval);
  }, [gamificationData.lastActiveDate, user]);

  // Charger les données au montage et quand l'utilisateur change
  useEffect(() => {
    if (user) {
      loadGamificationData();
    } else {
      setGamificationData({
        points: 0,
        level: 1,
        streak: 0,
        lastActiveDate: new Date().toISOString().split('T')[0],
        badges: availableBadges,
        challenges: dailyChallenges,
        achievements: []
      });
    }
  }, [user]);

  // Écouter les changements en temps réel
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('gamification-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gamification_data',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            const data = payload.new as any;
            setGamificationData({
              points: data.points || 0,
              level: data.level || 1,
              streak: data.streak || 0,
              lastActiveDate: data.last_active_date || new Date().toISOString().split('T')[0],
              badges: (data.badges as any) || availableBadges,
              challenges: (data.challenges as any) || dailyChallenges,
              achievements: (data.achievements as any) || []
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    gamificationData,
    isLoading,
    addPoints,
    resetDailyChallenges,
    updateChallenge,
    completeChallenge,
    awardBadge,
    incrementStreak,
    loadGamificationData
  };
};