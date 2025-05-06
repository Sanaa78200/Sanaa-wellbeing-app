
import React from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarTab: React.FC = () => {
  return (
    <Card>
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-islamic-green">Mai 2025</h2>
        <div className="flex space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
            // Exemple de données
            const hasData = day <= 5;
            const isToday = day === 5;
            const status = day % 3 === 0 ? 'success' : day % 4 === 0 ? 'warning' : 'success';
            
            return (
              <div 
                key={day}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg border ${
                  isToday ? 'border-islamic-green bg-islamic-cream' : 'border-gray-200'
                } ${hasData ? 'cursor-pointer hover:bg-gray-50' : 'text-gray-400'}`}
              >
                <span className={`text-sm ${isToday ? 'font-bold text-islamic-green' : ''}`}>{day}</span>
                {hasData && (
                  <div className={`w-2 h-2 rounded-full mt-1 ${
                    status === 'success' ? 'bg-green-500' : 
                    status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Détails du jour */}
      <div className="p-4 border-t">
        <h3 className="font-medium text-islamic-green mb-3">5 Mai - Aujourd'hui</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-600">Poids</span>
              <span className="ml-2 font-medium">74.5 kg</span>
            </div>
            <span className="text-green-500 text-sm">-0.3 kg</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-600">Calories</span>
              <span className="ml-2 font-medium">1600 kcal</span>
            </div>
            <span className="text-green-500 text-sm">-100 kcal</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-600">Eau</span>
              <span className="ml-2 font-medium">1.8L</span>
            </div>
            <span className="text-green-500 text-sm">Objectif atteint</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CalendarTab;
