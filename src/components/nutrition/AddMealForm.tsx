
import React from 'react';
import { Meal } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddMealFormProps {
  newMeal: Meal;
  onMealChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddMeal: (e: React.FormEvent) => void;
}

const AddMealForm = ({ newMeal, onMealChange, onAddMeal }: AddMealFormProps) => {
  return (
    <div className="islamic-card p-6 mb-6">
      <h2 className="text-xl font-bold text-islamic-green-dark mb-4">Ajouter un Repas</h2>
      
      <form onSubmit={onAddMeal} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du repas:</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={newMeal.name}
              onChange={onMealChange}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="calories">Calories:</Label>
            <Input
              id="calories"
              type="number"
              name="calories"
              value={newMeal.calories}
              onChange={onMealChange}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="protein">Protéines (g):</Label>
            <Input
              id="protein"
              type="number"
              name="protein"
              value={newMeal.protein}
              onChange={onMealChange}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="carbs">Glucides (g):</Label>
            <Input
              id="carbs"
              type="number"
              name="carbs"
              value={newMeal.carbs}
              onChange={onMealChange}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fat">Lipides (g):</Label>
            <Input
              id="fat"
              type="number"
              name="fat"
              value={newMeal.fat}
              onChange={onMealChange}
              required
              className="w-full"
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="px-4 py-2 bg-islamic-green text-white rounded-md hover:bg-islamic-green-dark transition-colors"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddMealForm;
