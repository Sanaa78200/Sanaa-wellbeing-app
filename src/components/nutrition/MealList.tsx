
import React from 'react';
import { Meal } from './types';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';

interface MealListProps {
  meals: Meal[];
  onDeleteMeal: (index: number) => void;
}

const MealList = ({ meals, onDeleteMeal }: MealListProps) => {
  if (meals.length === 0) {
    return (
      <div className="islamic-card p-6">
        <h2 className="text-xl font-bold text-islamic-green-dark mb-4">Mes Repas d'Aujourd'hui</h2>
        <div className="text-center py-8 text-islamic-slate">
          <Plus className="mx-auto h-12 w-12 mb-2 opacity-20" />
          <p>Aucun repas enregistré aujourd'hui. Ajoutez votre premier repas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="islamic-card p-6">
      <h2 className="text-xl font-bold text-islamic-green-dark mb-4">Mes Repas d'Aujourd'hui</h2>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead>Protéines (g)</TableHead>
              <TableHead>Glucides (g)</TableHead>
              <TableHead>Lipides (g)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meals.map((meal, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{meal.name}</TableCell>
                <TableCell>{meal.calories}</TableCell>
                <TableCell>{meal.protein}</TableCell>
                <TableCell>{meal.carbs}</TableCell>
                <TableCell>{meal.fat}</TableCell>
                <TableCell className="text-right">
                  <button 
                    onClick={() => onDeleteMeal(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MealList;
