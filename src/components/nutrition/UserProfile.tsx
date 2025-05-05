
import React from 'react';
import { UserData } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserProfileProps {
  userData: UserData;
  onUserDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const UserProfile = ({ userData, onUserDataChange }: UserProfileProps) => {
  return (
    <div className="islamic-card p-6">
      <h2 className="text-xl font-bold text-islamic-green-dark mb-4">Mon Profil</h2>
      
      <div className="space-y-4">
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
          <Label htmlFor="goal">Objectif:</Label>
          <select 
            id="goal"
            name="goal" 
            value={userData.goal}
            onChange={onUserDataChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="lose">Perdre du poids</option>
            <option value="maintain">Maintenir le poids</option>
            <option value="gain">Prendre du poids/masse</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
