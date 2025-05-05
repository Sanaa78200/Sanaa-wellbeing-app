
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const RecipeSearch = () => {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!ingredient.trim()) return;
    
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`);
      const data = await response.json();
      
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setErrorMessage('Aucune recette trouvée pour cet ingrédient.');
      }
    } catch (error) {
      console.error('Erreur lors de la recherche de recettes:', error);
      setErrorMessage('Erreur lors de la recherche de recettes. Veuillez réessayer.');
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-islamic-green-dark mb-2">Recherche de Recettes Halal</h2>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Entrez un ingrédient (ex: chicken, rice)"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            onClick={handleSearch} 
            className="bg-islamic-green hover:bg-islamic-green-dark"
            disabled={isLoading}
          >
            {isLoading ? 'Recherche...' : 'Rechercher'}
          </Button>
        </div>
        
        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        
        {recipes.length > 0 && (
          <div className="space-y-4 mt-4">
            <h3 className="font-semibold">Recettes trouvées ({recipes.length}) :</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map(recipe => (
                <div key={recipe.idMeal} className="border rounded-md overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src={recipe.strMealThumb} 
                    alt={recipe.strMeal} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-medium text-islamic-green-dark">{recipe.strMeal}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeSearch;
