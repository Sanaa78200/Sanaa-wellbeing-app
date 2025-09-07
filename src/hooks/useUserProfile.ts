import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { UserData } from '@/components/nutrition/types';
import { toast } from '@/components/ui/sonner';

export const useUserProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData>({});
  const [isLoading, setIsLoading] = useState(false);

  // Charger le profil utilisateur
  const loadUserProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Erreur lors du chargement du profil:', error);
        return;
      }

      if (data) {
        setUserData({
          name: data.name,
          age: data.age?.toString(),
          weight: data.weight?.toString(),
          height: data.height?.toString(),
          gender: data.gender as any,
          goal: data.goal as any,
          preferences: data.preferences as any,
          gamification: data.gamification as any,
          avatar: data.avatar_url
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sauvegarder le profil utilisateur
  const saveUserProfile = async (newUserData: Partial<UserData>) => {
    if (!user) return false;

    try {
      const profileData = {
        user_id: user.id,
        name: newUserData.name,
        email: user.email,
        age: newUserData.age ? parseInt(newUserData.age) : null,
        weight: newUserData.weight ? parseInt(newUserData.weight) : null,
        height: newUserData.height ? parseInt(newUserData.height) : null,
        gender: newUserData.gender,
        goal: newUserData.goal,
        preferences: newUserData.preferences as any,
        gamification: newUserData.gamification as any,
        avatar_url: newUserData.avatar
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData);

      if (error) {
        console.error('Erreur lors de la sauvegarde du profil:', error);
        toast.error('Erreur lors de la sauvegarde du profil');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la sauvegarde du profil');
      return false;
    }
  };

  // Mettre à jour les données utilisateur
  const updateUserData = async (updates: Partial<UserData>) => {
    const newUserData = { ...userData, ...updates };
    setUserData(newUserData);
    
    const success = await saveUserProfile(newUserData);
    if (success) {
      toast.success('Profil mis à jour');
    }
  };

  // Ajouter des points
  const addPoints = async (points: number, reason?: string) => {
    if (!userData.gamification) return;

    const newGamification = {
      ...userData.gamification,
      points: userData.gamification.points + points
    };

    await updateUserData({ gamification: newGamification });
    
    if (reason) {
      toast.success(`+${points} points - ${reason}`);
    }
  };

  // Attribuer un badge
  const awardBadge = async (badgeId: string) => {
    if (!userData.gamification) return;

    const badges = userData.gamification.badges || [];
    if (badges.some(badge => badge.id === badgeId)) return;

    const newBadge = {
      id: badgeId,
      name: badgeId,
      description: 'Badge gagné',
      icon: '🏆',
      earnedAt: new Date().toISOString(),
      isEarned: true
    };

    const newGamification = {
      ...userData.gamification,
      badges: [...badges, newBadge]
    };

    await updateUserData({ gamification: newGamification });
    toast.success(`Nouveau badge gagné : ${badgeId}`);
  };

  // Charger le profil au montage et quand l'utilisateur change
  useEffect(() => {
    if (user) {
      loadUserProfile();
    } else {
      setUserData({});
    }
  }, [user]);

  return {
    userData,
    isLoading,
    updateUserData,
    addPoints,
    awardBadge,
    loadUserProfile
  };
};