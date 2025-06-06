
import React, { useState } from 'react';
import { UserData } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, Star, Heart, User, Utensils, Flame, Settings } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/sonner';
import SettingsPanel from '../settings/SettingsPanel';
import ProfileInfoTab from './ProfileInfoTab';
import PreferencesTab from './PreferencesTab';
import AchievementsTab from './AchievementsTab';

interface UserProfileProps {
  userData: UserData;
  onUserDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCheckboxChange?: (field: string, value: boolean | string[]) => void;
}

const UserProfile = ({ userData, onUserDataChange, onCheckboxChange }: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState('info');
  const { addPoints, userData: contextUserData } = useUser();
  
  const pointsToNextLevel = 100;
  const currentLevelPoints = (contextUserData.gamification?.level || 1) * 100 - 100;
  const pointsInCurrentLevel = (contextUserData.gamification?.points || 0) - currentLevelPoints;
  const progressToNextLevel = (pointsInCurrentLevel / pointsToNextLevel) * 100;

  // Animation lors de la mise à jour du profil
  const handleProfileUpdate = () => {
    toast.success("Profil mis à jour", {
      description: "Vos données ont été sauvegardées avec succès !",
    });
    addPoints(10, "Mise à jour du profil");
  };

  return (
    <div className="islamic-card p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-islamic-green-dark">Mon Profil</h2>
        {contextUserData.gamification && (
          <div className="flex items-center space-x-2">
            <div className="text-amber-500 font-semibold flex items-center">
              <Star className="w-5 h-5 mr-1" />
              {contextUserData.gamification.points} pts
            </div>
            <Badge className="bg-islamic-green-dark">Niveau {contextUserData.gamification.level}</Badge>
            {contextUserData.gamification.streak > 0 && (
              <Badge className="bg-orange-500 flex items-center">
                <Flame className="w-3 h-3 mr-1" /> {contextUserData.gamification.streak} j
              </Badge>
            )}
          </div>
        )}
      </div>
      
      {contextUserData.gamification && (
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Niveau {contextUserData.gamification.level}</span>
            <span>Niveau {contextUserData.gamification.level + 1}</span>
          </div>
          <Progress value={progressToNextLevel} className="h-2 bg-gray-200">
            <div className="h-full bg-gradient-to-r from-islamic-green to-islamic-gold" />
          </Progress>
          <div className="text-right text-xs mt-1 text-gray-500">
            {pointsInCurrentLevel}/{pointsToNextLevel} points
          </div>
        </div>
      )}
      
      <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 mb-4 bg-islamic-cream">
          <TabsTrigger value="info" className="flex items-center data-[state=active]:bg-islamic-green data-[state=active]:text-white">
            <User className="w-4 h-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center data-[state=active]:bg-islamic-green data-[state=active]:text-white">
            <Utensils className="w-4 h-4 mr-2" />
            Préférences
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center data-[state=active]:bg-islamic-green data-[state=active]:text-white">
            <Trophy className="w-4 h-4 mr-2" />
            Récompenses
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center data-[state=active]:bg-islamic-green data-[state=active]:text-white">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4 animate-fade-in">
          <ProfileInfoTab
            userData={userData}
            onUserDataChange={onUserDataChange}
            onProfileUpdate={handleProfileUpdate}
          />
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4 animate-fade-in">
          <PreferencesTab
            userData={userData}
            onCheckboxChange={onCheckboxChange}
            onProfileUpdate={handleProfileUpdate}
          />
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4 animate-fade-in">
          <AchievementsTab gamification={contextUserData.gamification} />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 animate-fade-in">
          <SettingsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
