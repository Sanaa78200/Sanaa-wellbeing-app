import React, { useState } from 'react';
import { UserData } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Trophy, Award, Star, Heart, User, Utensils, Flame, Settings } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/sonner';
import SettingsPanel from '../settings/SettingsPanel';

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
  
  const handleCheckboxChange = (field: string) => (checked: boolean) => {
    if (onCheckboxChange) {
      onCheckboxChange(field, checked);
    }
  };

  const handleTextArrayChange = (field: string, values: string[]) => {
    if (onCheckboxChange) {
      onCheckboxChange(field, values);
    }
  };

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
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16 border-2 border-islamic-green">
              <AvatarImage src={userData.avatar as string} />
              <AvatarFallback className="bg-islamic-green text-white">
                {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 flex-1">
              <Label htmlFor="name">Nom:</Label>
              <Input
                id="name"
                name="name"
                value={userData.name as string || ''}
                onChange={onUserDataChange}
                className="w-full"
                placeholder="Votre nom"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Genre:</Label>
              <Select 
                name="gender" 
                value={userData.gender as string || 'male'}
                onValueChange={(value) => {
                  const event = {
                    target: {
                      name: 'gender',
                      value
                    }
                  } as React.ChangeEvent<HTMLSelectElement>;
                  onUserDataChange(event);
                }}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Homme</SelectItem>
                  <SelectItem value="female">Femme</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Âge:</Label>
              <Input
                id="age"
                type="number"
                name="age"
                value={userData.age}
                onChange={onUserDataChange}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Poids (kg):</Label>
              <Input
                id="weight"
                type="number"
                name="weight"
                value={userData.weight}
                onChange={onUserDataChange}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">Taille (cm):</Label>
              <Input
                id="height"
                type="number"
                name="height"
                value={userData.height}
                onChange={onUserDataChange}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="goal">Objectif:</Label>
              <Select 
                name="goal" 
                value={userData.goal}
                onValueChange={(value) => {
                  const event = {
                    target: {
                      name: 'goal',
                      value
                    }
                  } as React.ChangeEvent<HTMLSelectElement>;
                  onUserDataChange(event);
                }}
              >
                <SelectTrigger id="goal">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Perdre du poids</SelectItem>
                  <SelectItem value="maintain">Maintenir le poids</SelectItem>
                  <SelectItem value="gain">Prendre du poids/masse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <button 
            onClick={handleProfileUpdate}
            className="w-full mt-4 bg-islamic-green text-white py-2 rounded-md hover:bg-islamic-green-dark transition-colors"
          >
            Enregistrer les modifications
          </button>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4 animate-fade-in">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="halal" 
                checked={userData.preferences?.halal} 
                onCheckedChange={handleCheckboxChange('halal')}
              />
              <Label htmlFor="halal">Halal uniquement</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="vegetarian" 
                checked={userData.preferences?.vegetarian} 
                onCheckedChange={handleCheckboxChange('vegetarian')}
              />
              <Label htmlFor="vegetarian">Végétarien</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="vegan" 
                checked={userData.preferences?.vegan} 
                onCheckedChange={handleCheckboxChange('vegan')}
              />
              <Label htmlFor="vegan">Végétalien</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies/Intolérances:</Label>
            <Input
              id="allergies"
              placeholder="Entrez vos allergies séparées par une virgule"
              className="w-full"
              value={userData.preferences?.allergies?.join(', ') || ''}
              onChange={(e) => {
                const allergies = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
                handleTextArrayChange('allergies', allergies);
              }}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="favoriteFoods">Aliments préférés:</Label>
            <Input
              id="favoriteFoods"
              placeholder="Entrez vos aliments préférés séparés par une virgule"
              className="w-full"
              value={userData.preferences?.favoriteFoods?.join(', ') || ''}
              onChange={(e) => {
                const favorites = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
                handleTextArrayChange('favoriteFoods', favorites);
              }}
            />
          </div>
          
          <button 
            onClick={handleProfileUpdate}
            className="w-full mt-4 bg-islamic-green text-white py-2 rounded-md hover:bg-islamic-green-dark transition-colors"
          >
            Enregistrer les préférences
          </button>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4 animate-fade-in">
          {contextUserData.gamification && (
            <>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center">
                  <Award className="w-5 h-5 mr-2 text-amber-500" />
                  Badges
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {contextUserData.gamification.badges.map((badge) => (
                    <div 
                      key={badge.id} 
                      className={`p-3 rounded-lg border ${badge.isEarned 
                        ? 'bg-islamic-cream border-islamic-green' 
                        : 'bg-gray-100 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="text-2xl">{badge.icon}</div>
                        <div>
                          <h4 className="font-medium">{badge.name}</h4>
                          <p className="text-xs text-gray-600">{badge.description}</p>
                          {badge.isEarned && badge.earnedAt && (
                            <p className="text-xs text-islamic-green mt-1">
                              Obtenu le {new Date(badge.earnedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center">
                  <Star className="w-5 h-5 mr-2 text-amber-500" />
                  Défis du jour
                </h3>
                <div className="space-y-2">
                  {contextUserData.gamification.challenges.map((challenge) => (
                    <div 
                      key={challenge.id} 
                      className={`p-3 rounded-lg border ${challenge.isCompleted 
                        ? 'bg-islamic-cream border-islamic-green' 
                        : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{challenge.name}</h4>
                          <p className="text-xs text-gray-600">{challenge.description}</p>
                        </div>
                        <Badge className="bg-islamic-green-dark">+{challenge.points} pts</Badge>
                      </div>
                      
                      {challenge.goal && challenge.progress !== undefined && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{challenge.progress}/{challenge.goal}</span>
                            <span>{Math.round((challenge.progress / challenge.goal) * 100)}%</span>
                          </div>
                          <Progress value={(challenge.progress / challenge.goal) * 100} className="h-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 animate-fade-in">
          <SettingsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
