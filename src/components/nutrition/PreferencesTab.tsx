
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { UserData } from './types';

interface PreferencesTabProps {
  userData: UserData;
  onCheckboxChange?: (field: string, value: boolean | string[]) => void;
  onProfileUpdate: () => void;
}

const PreferencesTab = ({ userData, onCheckboxChange, onProfileUpdate }: PreferencesTabProps) => {
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

  return (
    <div className="space-y-4 animate-fade-in">
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
        onClick={onProfileUpdate}
        className="w-full mt-4 bg-islamic-green text-white py-2 rounded-md hover:bg-islamic-green-dark transition-colors"
      >
        Enregistrer les préférences
      </button>
    </div>
  );
};

export default PreferencesTab;
