import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Award, Star, Heart, User, Settings, Activity, Calendar } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/sonner';
const Profil = () => {
  const {
    userData,
    updateUserData,
    addPoints
  } = useUser();
  const [activeTab, setActiveTab] = useState('infos');
  const handleProfileUpdate = () => {
    toast.success("Profil mis à jour", {
      description: "Vos données ont été sauvegardées avec succès !"
    });
    addPoints(10, "Mise à jour du profil");
  };
  const handleCheckboxChange = (field: string, checked: boolean) => {
    const preferences = {
      ...userData.preferences
    };
    preferences[field] = checked;
    updateUserData({
      preferences
    });
  };
  const handleArrayChange = (field: string, value: string) => {
    const preferences = {
      ...userData.preferences
    };
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    preferences[field] = items;
    updateUserData({
      preferences
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    updateUserData({
      [name]: value
    });
  };
  const handleGenderChange = (value: 'male' | 'female' | 'other') => {
    updateUserData({
      gender: value
    });
  };
  const handleGoalChange = (value: 'lose' | 'maintain' | 'gain') => {
    updateUserData({
      goal: value
    });
  };

  // Afficher le niveau et la progression
  const pointsToNextLevel = 100;
  const currentLevelPoints = (userData.gamification?.level || 1) * 100 - 100;
  const pointsInCurrentLevel = (userData.gamification?.points || 0) - currentLevelPoints;
  const progressToNextLevel = pointsInCurrentLevel / pointsToNextLevel * 100;
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-islamic-pattern">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-islamic-green mb-6 text-center">Rappel</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Section Avatar et Statistiques */}
            <div className="lg:col-span-1">
              <Card className="islamic-card">
                <CardHeader className="flex flex-col items-center pb-2">
                  <Avatar className="w-24 h-24 border-4 border-islamic-green">
                    <AvatarImage src={userData.avatar as string} />
                    <AvatarFallback className="bg-islamic-green text-white text-xl">
                      {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4 text-xl">{userData.name || "Utilisateur"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userData.gamification && <>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Niveau {userData.gamification.level}</span>
                          <span>Niveau {userData.gamification.level + 1}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-islamic-green" style={{
                        width: `${progressToNextLevel}%`
                      }}></div>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          {pointsInCurrentLevel}/{pointsToNextLevel} points
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-islamic-cream rounded-md p-3">
                          <div className="flex items-center justify-center text-amber-500 mb-1">
                            <Star className="w-5 h-5" />
                          </div>
                          <div className="font-bold text-lg">{userData.gamification.points}</div>
                          <div className="text-xs text-gray-500">Points</div>
                        </div>
                        
                        <div className="bg-islamic-cream rounded-md p-3">
                          <div className="flex items-center justify-center text-orange-500 mb-1">
                            <Activity className="w-5 h-5" />
                          </div>
                          <div className="font-bold text-lg">{userData.gamification.streak}</div>
                          <div className="text-xs text-gray-500">Jours consécutifs</div>
                        </div>
                      </div>
                    </>}
                </CardContent>
              </Card>
            </div>
            
            {/* Section principale */}
            <div className="lg:col-span-2">
              <Card className="islamic-card">
                <CardContent className="pt-6">
                  <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid grid-cols-3 mb-4 bg-islamic-cream">
                      <TabsTrigger value="infos" className="flex items-center gap-2 data-[state=active]:bg-islamic-green data-[state=active]:text-white">
                        <User className="w-4 h-4" />
                        Informations
                      </TabsTrigger>
                      <TabsTrigger value="preferences" className="flex items-center gap-2 data-[state=active]:bg-islamic-green data-[state=active]:text-white">
                        <Settings className="w-4 h-4" />
                        Préférences
                      </TabsTrigger>
                      <TabsTrigger value="objectifs" className="flex items-center gap-2 data-[state=active]:bg-islamic-green data-[state=active]:text-white">
                        <Heart className="w-4 h-4" />
                        Objectifs
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="infos" className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom</Label>
                          <Input id="name" name="name" value={userData.name as string || ''} onChange={handleInputChange} placeholder="Votre nom" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="gender">Genre</Label>
                          <Select value={userData.gender || 'male'} onValueChange={handleGenderChange}>
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
                          <Label htmlFor="age">Âge</Label>
                          <Input id="age" type="number" name="age" value={userData.age} onChange={handleInputChange} min="10" max="120" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="weight">Poids (kg)</Label>
                          <Input id="weight" type="number" name="weight" value={userData.weight} onChange={handleInputChange} min="30" max="200" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="height">Taille (cm)</Label>
                          <Input id="height" type="number" name="height" value={userData.height} onChange={handleInputChange} min="100" max="250" />
                        </div>
                      </div>
                      
                      <Button onClick={handleProfileUpdate} className="w-full mt-4 bg-islamic-green hover:bg-islamic-green-dark">
                        Enregistrer les modifications
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="preferences" className="space-y-4 animate-fade-in">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="halal" checked={userData.preferences?.halal} onCheckedChange={checked => handleCheckboxChange('halal', checked as boolean)} />
                          <Label htmlFor="halal">Halal uniquement</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox id="vegetarian" checked={userData.preferences?.vegetarian} onCheckedChange={checked => handleCheckboxChange('vegetarian', checked as boolean)} />
                          <Label htmlFor="vegetarian">Végétarien</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox id="vegan" checked={userData.preferences?.vegan} onCheckedChange={checked => handleCheckboxChange('vegan', checked as boolean)} />
                          <Label htmlFor="vegan">Végétalien</Label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="allergies">Allergies/Intolérances</Label>
                        <Input id="allergies" placeholder="Entrez vos allergies séparées par une virgule" value={userData.preferences?.allergies?.join(', ') || ''} onChange={e => handleArrayChange('allergies', e.target.value)} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="favoriteFoods">Aliments préférés</Label>
                        <Input id="favoriteFoods" placeholder="Entrez vos aliments préférés séparés par une virgule" value={userData.preferences?.favoriteFoods?.join(', ') || ''} onChange={e => handleArrayChange('favoriteFoods', e.target.value)} />
                      </div>
                      
                      <Button onClick={handleProfileUpdate} className="w-full mt-4 bg-islamic-green hover:bg-islamic-green-dark">
                        Enregistrer les préférences
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="objectifs" className="space-y-4 animate-fade-in">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="goal">Objectif principal</Label>
                          <Select value={userData.goal || 'maintain'} onValueChange={handleGoalChange}>
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
                        
                        {userData.gamification && <div className="space-y-2">
                            <Label>Défis en cours</Label>
                            <div className="space-y-2">
                              {userData.gamification.challenges.map(challenge => <div key={challenge.id} className={`p-3 rounded-lg border ${challenge.isCompleted ? 'bg-islamic-cream border-islamic-green' : 'border-gray-200'}`}>
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="font-medium">{challenge.name}</p>
                                      <p className="text-xs text-gray-600">{challenge.description}</p>
                                    </div>
                                    <div className="text-sm font-medium bg-islamic-green-dark text-white px-2 py-1 rounded">
                                      +{challenge.points} pts
                                    </div>
                                  </div>
                                  
                                  {challenge.goal && challenge.progress !== undefined && <div className="mt-2">
                                      <div className="flex justify-between text-xs mb-1">
                                        <span>{challenge.progress}/{challenge.goal}</span>
                                        <span>{Math.round(challenge.progress / challenge.goal * 100)}%</span>
                                      </div>
                                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-islamic-green" style={{
                                  width: `${challenge.progress / challenge.goal * 100}%`
                                }}></div>
                                      </div>
                                    </div>}
                                </div>)}
                            </div>
                          </div>}
                      </div>
                      
                      <Button onClick={handleProfileUpdate} className="w-full mt-4 bg-islamic-green hover:bg-islamic-green-dark">
                        Enregistrer les objectifs
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default Profil;