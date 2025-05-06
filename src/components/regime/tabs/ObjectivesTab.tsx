
import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Target, Activity } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ObjectivesTabProps {
  userData: {
    goal?: 'lose' | 'gain' | 'maintain';
  };
  progressData: {
    poidsCible: number;
  };
}

const ObjectivesTab: React.FC<ObjectivesTabProps> = ({ userData, progressData }) => {
  return (
    <Card className="p-6">
      <CardTitle className="text-xl font-semibold text-islamic-green mb-6">Mes objectifs</CardTitle>
      
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="text-md font-medium text-gray-700 mb-3">Objectif principal</h3>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-islamic-cream p-2 rounded-lg">
                <Target size={24} className="text-islamic-green" />
              </div>
              <div>
                <div className="font-medium">{
                  userData.goal === 'lose' 
                    ? `Atteindre ${progressData.poidsCible} kg` 
                    : userData.goal === 'gain' 
                      ? `Atteindre ${progressData.poidsCible} kg` 
                      : 'Maintenir votre poids actuel'
                }</div>
                <div className="text-sm text-gray-500">D'ici le 30 juin 2025</div>
              </div>
            </div>
            <div className="text-islamic-green font-medium">45% atteint</div>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-3">Objectifs quotidiens</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-islamic-cream p-2 rounded-lg">
                  <Activity size={24} className="text-islamic-green" />
                </div>
                <div>
                  <div className="font-medium">Calories</div>
                  <div className="text-sm text-gray-500">Maximum 1700 kcal par jour</div>
                </div>
              </div>
              <div className="text-green-500">Aujourd'hui: 1600 kcal</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-islamic-cream p-2 rounded-lg">
                  <div className="text-islamic-green font-bold text-lg">H₂O</div>
                </div>
                <div>
                  <div className="font-medium">Hydratation</div>
                  <div className="text-sm text-gray-500">Boire au moins 2L d'eau par jour</div>
                </div>
              </div>
              <div className="text-amber-500">Aujourd'hui: 1.8L</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-islamic-cream p-2 rounded-lg">
                  <div className="text-islamic-green font-bold text-lg">🥗</div>
                </div>
                <div>
                  <div className="font-medium">Protéines</div>
                  <div className="text-sm text-gray-500">Au moins 80g de protéines par jour</div>
                </div>
              </div>
              <div className="text-green-500">Aujourd'hui: 95g</div>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => toast.success("Objectifs mis à jour", {description: "Vos objectifs ont été mis à jour avec succès."})}
        className="mt-6 bg-islamic-green text-white py-2 px-4 rounded-lg font-medium hover:bg-islamic-green-dark transition-colors w-full"
      >
        Modifier mes objectifs
      </button>
    </Card>
  );
};

export default ObjectivesTab;
