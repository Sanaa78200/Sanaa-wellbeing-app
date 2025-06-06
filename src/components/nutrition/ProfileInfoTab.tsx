
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserData } from './types';

interface ProfileInfoTabProps {
  userData: UserData;
  onUserDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onProfileUpdate: () => void;
}

const ProfileInfoTab = ({ userData, onUserDataChange, onProfileUpdate }: ProfileInfoTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
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
        onClick={onProfileUpdate}
        className="w-full mt-4 bg-islamic-green text-white py-2 rounded-md hover:bg-islamic-green-dark transition-colors"
      >
        Enregistrer les modifications
      </button>
    </div>
  );
};

export default ProfileInfoTab;
