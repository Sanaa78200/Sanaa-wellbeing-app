
import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';

interface ProgressTabProps {
  progressData: {
    poidsInitial: number;
    poidsActuel: number;
    poidsCible: number;
    joursSuivis: number;
    moyenneCalories: number;
    perteGraisse: number;
  };
}

const ProgressTab: React.FC<ProgressTabProps> = ({ progressData }) => {
  return (
    <Card className="p-6">
      <CardTitle className="text-xl font-semibold text-islamic-green mb-6">Suivi de votre progression</CardTitle>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-2">Objectif de poids</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-islamic-green to-islamic-gold h-4 rounded-full" 
              style={{ width: `${((progressData.poidsInitial - progressData.poidsActuel) / (progressData.poidsInitial - progressData.poidsCible) * 100).toFixed(1)}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-sm text-gray-600">
            <span>{progressData.poidsInitial} kg</span>
            <span>{progressData.poidsActuel} kg</span>
            <span>{progressData.poidsCible} kg</span>
          </div>
          <div className="mt-2 text-center text-islamic-green font-medium">
            {((progressData.poidsInitial - progressData.poidsActuel) / (progressData.poidsInitial - progressData.poidsCible) * 100).toFixed(1)}% de votre objectif atteint
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-md font-medium text-gray-700 mb-4">Statistiques détaillées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Poids initial</span>
                <span className="font-medium">{progressData.poidsInitial} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Poids actuel</span>
                <span className="font-medium">{progressData.poidsActuel} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Poids cible</span>
                <span className="font-medium">{progressData.poidsCible} kg</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Perte totale</span>
                <span className="font-medium text-green-500">-{(progressData.poidsInitial - progressData.poidsActuel).toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Perte moyenne</span>
                <span className="font-medium text-green-500">-{((progressData.poidsInitial - progressData.poidsActuel) / progressData.joursSuivis * 7).toFixed(2)} kg/semaine</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reste à perdre</span>
                <span className="font-medium">{(progressData.poidsActuel - progressData.poidsCible).toFixed(1)} kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProgressTab;
