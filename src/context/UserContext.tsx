
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserData, GamificationData, Badge, Challenge } from '@/components/nutrition/types';
import { toast } from '@/components/ui/sonner';

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
    progress: 0
  },
  {
    id: 'daily-protein',
    name: 'Protéines équilibrées',
    description: 'Atteindre 100% de votre objectif de protéines',
    points: 15,
    isCompleted: false
  },
  {
    id: 'daily-steps',
    name: 'Activité physique',
    description: 'Faire 5000 pas aujourd\'hui',
    points: 25,
    isCompleted: false,
    goal: 5000,
    progress: 0
  }
];

// Gamification par défaut
const defaultGamification: GamificationData = {
  points: 0,
  level: 1,
  streak: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  badges: availableBadges,
  challenges: dailyChallenges
};

// Données utilisateur par défaut
const defaultUserData: UserData = {
  weight: '',
  height: '',
  age: '',
  goal: 'maintain',
  name: '',
  gender: 'male',
  preferences: {
    halal: true,
    vegetarian: false,
    vegan: false,
    allergies: [],
    favoriteFoods: []
  },
  gamification: defaultGamification
};

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  addPoints: (points: number, reason?: string) => void;
  resetDailyChallenges: () => void;
  updateChallenge: (id: string, progress: number) => void;
  completeChallenge: (id: string) => void;
  awardBadge: (id: string) => void;
  incrementStreak: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useLocalStorage<UserData>('user-data', defaultUserData);

  // Vérifier la date et réinitialiser les défis quotidiens si nécessaire
  useEffect(() => {
    const checkDate = () => {
      const today = new Date().toISOString().split('T')[0];
      
      if (userData.gamification && userData.gamification.lastActiveDate !== today) {
        resetDailyChallenges();
        incrementStreak();
      }
    };

    checkDate();
    // Vérifier la date toutes les heures
    const interval = setInterval(checkDate, 3600000);
    return () => clearInterval(interval);
  }, [userData.gamification?.lastActiveDate]);

  // Mise à jour des données utilisateur
  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  // Ajouter des points et vérifier le niveau
  const addPoints = (points: number, reason?: string) => {
    setUserData(prev => {
      if (!prev.gamification) return prev;
      
      const newPoints = prev.gamification.points + points;
      const currentLevel = prev.gamification.level;
      const pointsPerLevel = 100;
      const newLevel = Math.floor(newPoints / pointsPerLevel) + 1;
      
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
      
      return {
        ...prev,
        gamification: {
          ...prev.gamification,
          points: newPoints,
          level: newLevel,
          lastActiveDate: new Date().toISOString().split('T')[0]
        }
      };
    });
  };

  // Réinitialiser les défis quotidiens
  const resetDailyChallenges = () => {
    setUserData(prev => {
      if (!prev.gamification) return prev;
      
      return {
        ...prev,
        gamification: {
          ...prev.gamification,
          challenges: prev.gamification.challenges.map(challenge => ({
            ...challenge,
            isCompleted: false,
            progress: 0
          })),
          lastActiveDate: new Date().toISOString().split('T')[0]
        }
      };
    });
  };

  // Mettre à jour un défi
  const updateChallenge = (id: string, progress: number) => {
    setUserData(prev => {
      if (!prev.gamification) return prev;
      
      const updatedChallenges = prev.gamification.challenges.map(challenge => {
        if (challenge.id === id) {
          const newProgress = challenge.progress ? challenge.progress + progress : progress;
          const isCompleted = challenge.goal ? newProgress >= challenge.goal : false;
          
          // Si le défi est complété pour la première fois
          if (isCompleted && !challenge.isCompleted) {
            toast.success(`Défi complété !`, {
              description: `${challenge.name}: ${challenge.description}. +${challenge.points} points !`
            });
            addPoints(challenge.points);
          }
          
          return {
            ...challenge,
            progress: newProgress,
            isCompleted: isCompleted
          };
        }
        return challenge;
      });
      
      return {
        ...prev,
        gamification: {
          ...prev.gamification,
          challenges: updatedChallenges,
          lastActiveDate: new Date().toISOString().split('T')[0]
        }
      };
    });
  };

  // Compléter un défi
  const completeChallenge = (id: string) => {
    setUserData(prev => {
      if (!prev.gamification) return prev;
      
      const challenge = prev.gamification.challenges.find(c => c.id === id);
      
      if (challenge && !challenge.isCompleted) {
        toast.success(`Défi complété !`, {
          description: `${challenge.name}: ${challenge.description}. +${challenge.points} points !`
        });
        
        const updatedChallenges = prev.gamification.challenges.map(c => 
          c.id === id ? { ...c, isCompleted: true, progress: c.goal || 1 } : c
        );
        
        return {
          ...prev,
          gamification: {
            ...prev.gamification,
            challenges: updatedChallenges,
            points: prev.gamification.points + (challenge.points || 0),
            lastActiveDate: new Date().toISOString().split('T')[0]
          }
        };
      }
      
      return prev;
    });
  };

  // Attribuer un badge
  const awardBadge = (id: string) => {
    setUserData(prev => {
      if (!prev.gamification) return prev;
      
      const badge = prev.gamification.badges.find(b => b.id === id);
      
      if (badge && !badge.isEarned) {
        const updatedBadges = prev.gamification.badges.map(b => 
          b.id === id ? { ...b, isEarned: true, earnedAt: new Date().toISOString() } : b
        );
        
        toast.success(`Nouveau badge débloqué !`, {
          description: `${badge.name}: ${badge.description}`,
          icon: badge.icon
        });
        
        return {
          ...prev,
          gamification: {
            ...prev.gamification,
            badges: updatedBadges,
            points: prev.gamification.points + 50, // Bonus pour un badge
            lastActiveDate: new Date().toISOString().split('T')[0]
          }
        };
      }
      
      return prev;
    });
  };

  // Incrémenter le streak si l'utilisateur est actif aujourd'hui
  const incrementStreak = () => {
    setUserData(prev => {
      if (!prev.gamification) return prev;
      
      const today = new Date().toISOString().split('T')[0];
      const lastActive = prev.gamification.lastActiveDate;
      
      // Si dernier actif était hier, incrémenter le streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastActive === yesterdayStr) {
        const newStreak = prev.gamification.streak + 1;
        
        // Vérifier si un badge de streak doit être attribué
        if (newStreak === 7) {
          awardBadge('week-streak');
        }
        
        return {
          ...prev,
          gamification: {
            ...prev.gamification,
            streak: newStreak,
            lastActiveDate: today
          }
        };
      } else if (lastActive !== today) {
        // Si pas actif hier et pas aujourd'hui, réinitialiser le streak
        return {
          ...prev,
          gamification: {
            ...prev.gamification,
            streak: 1,
            lastActiveDate: today
          }
        };
      }
      
      return prev;
    });
  };

  return (
    <UserContext.Provider value={{
      userData,
      updateUserData,
      addPoints,
      resetDailyChallenges,
      updateChallenge,
      completeChallenge,
      awardBadge,
      incrementStreak
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser doit être utilisé à l\'intérieur d\'un UserProvider');
  }
  return context;
};
