
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, ChevronLeft, ChevronRight, TrendingDown, Award, Target, Activity } from 'lucide-react';

const RegimeTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Données fictives pour la démonstration
  const weightData = [
    { date: '1 Mai', poids: 75.5 },
    { date: '2 Mai', poids: 75.3 },
    { date: '3 Mai', poids: 75.2 },
    { date: '4 Mai', poids: 74.8 },
    { date: '5 Mai', poids: 74.5 },
  ];
  
  const caloriesData = [
    { date: '1 Mai', calories: 1800 },
    { date: '2 Mai', calories: 1720 },
    { date: '3 Mai', calories: 1650 },
    { date: '4 Mai', calories: 1700 },
    { date: '5 Mai', calories: 1600 },
  ];
  
  const progressData = {
    poidsInitial: 78.2,
    poidsActuel: 74.5,
    poidsCible: 70.0,
    joursSuivis: 15,
    moyenneCalories: 1694,
    perteGraisse: 2.1,
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sanaa - Mon Régime</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Bonjour, Sophie</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold">
              S
            </div>
          </div>
        </div>
      </header>
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-3 flex items-center space-x-2 whitespace-nowrap ${activeTab === 'dashboard' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-600'}`}
            >
              <Activity size={20} />
              <span>Tableau de bord</span>
            </button>
            <button 
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-3 flex items-center space-x-2 whitespace-nowrap ${activeTab === 'progress' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-600'}`}
            >
              <TrendingDown size={20} />
              <span>Progrès</span>
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-3 flex items-center space-x-2 whitespace-nowrap ${activeTab === 'calendar' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-600'}`}
            >
              <Calendar size={20} />
              <span>Calendrier</span>
            </button>
            <button 
              onClick={() => setActiveTab('objectives')}
              className={`px-4 py-3 flex items-center space-x-2 whitespace-nowrap ${activeTab === 'objectives' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-600'}`}
            >
              <Target size={20} />
              <span>Objectifs</span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Content */}
      <main className="flex-grow container mx-auto p-4">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Poids card */}
              <div className="bg-white rounded-lg shadow p-4 flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Évolution du poids</h2>
                  <div className="text-sm text-gray-500">5 derniers jours</div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="poids" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-between items-center text-sm">
                  <div className="text-green-500">-1.0 kg cette semaine</div>
                  <div className="text-purple-500 font-medium">Objectif: -0.5 kg / semaine</div>
                </div>
              </div>
              
              {/* Calories card */}
              <div className="bg-white rounded-lg shadow p-4 flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">Consommation calorique</h2>
                  <div className="text-sm text-gray-500">5 derniers jours</div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={caloriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[1400, 2000]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="calories" 
                        stroke="#ff7675" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-between items-center text-sm">
                  <div className="text-green-500">-200 kcal en moyenne</div>
                  <div className="text-purple-500 font-medium">Objectif: 1700 kcal / jour</div>
                </div>
              </div>
            </div>
            
            {/* Récapitulatif en cartes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Poids actuel</p>
                    <p className="text-2xl font-bold text-gray-800">{progressData.poidsActuel} kg</p>
                  </div>
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <TrendingDown size={24} className="text-purple-600" />
                  </div>
                </div>
                <div className="mt-2 text-green-500 text-sm">
                  -{(progressData.poidsInitial - progressData.poidsActuel).toFixed(1)} kg depuis le début
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Jours suivis</p>
                    <p className="text-2xl font-bold text-gray-800">{progressData.joursSuivis}</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Calendar size={24} className="text-green-600" />
                  </div>
                </div>
                <div className="mt-2 text-purple-500 text-sm">
                  Excellente constance !
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Calories / jour</p>
                    <p className="text-2xl font-bold text-gray-800">{progressData.moyenneCalories}</p>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Activity size={24} className="text-blue-600" />
                  </div>
                </div>
                <div className="mt-2 text-green-500 text-sm">
                  En dessous de l'objectif de 1700 kcal
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Perte de graisse</p>
                    <p className="text-2xl font-bold text-gray-800">{progressData.perteGraisse} %</p>
                  </div>
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <Award size={24} className="text-pink-600" />
                  </div>
                </div>
                <div className="mt-2 text-green-500 text-sm">
                  Bonne tendance !
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'progress' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Suivi de votre progression</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">Objectif de poids</h3>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-4 rounded-full" 
                    style={{ width: `${((progressData.poidsInitial - progressData.poidsActuel) / (progressData.poidsInitial - progressData.poidsCible) * 100).toFixed(1)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-sm text-gray-600">
                  <span>{progressData.poidsInitial} kg</span>
                  <span>{progressData.poidsActuel} kg</span>
                  <span>{progressData.poidsCible} kg</span>
                </div>
                <div className="mt-2 text-center text-purple-600 font-medium">
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
          </div>
        )}
        
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Mai 2025</h2>
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
                        isToday ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                      } ${hasData ? 'cursor-pointer hover:bg-gray-50' : 'text-gray-400'}`}
                    >
                      <span className={`text-sm ${isToday ? 'font-bold text-purple-600' : ''}`}>{day}</span>
                      {hasData && (
                        <div className={`w-2 h-2 rounded-full mt-1 ${
                          status === 'success' ? 'bg-green-500' : 
                          status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Détails du jour */}
            <div className="p-4 border-t">
              <h3 className="font-medium text-gray-700 mb-3">5 Mai - Aujourd'hui</h3>
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
          </div>
        )}
        
        {activeTab === 'objectives' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mes objectifs</h2>
            
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-md font-medium text-gray-700 mb-3">Objectif principal</h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Target size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Atteindre 70 kg</div>
                      <div className="text-sm text-gray-500">D'ici le 30 juin 2025</div>
                    </div>
                  </div>
                  <div className="text-purple-600 font-medium">45% atteint</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">Objectifs quotidiens</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Activity size={24} className="text-blue-600" />
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
                      <div className="bg-teal-100 p-2 rounded-lg">
                        <div className="text-teal-600 font-bold text-lg">H₂O</div>
                      </div>
                      <div>
                        <div className="font-medium">Hydratation</div>
                        <div className="text-sm text-gray-500">Boire au moins 2L d'eau par jour</div>
                      </div>
                    </div>
                    <div className="text-yellow-500">Aujourd'hui: 1.8L</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="bg-pink-100 p-2 rounded-lg">
                        <div className="text-pink-600 font-bold text-lg">🥗</div>
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
            
            <button className="mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Modifier mes objectifs
            </button>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          Sanaa - Suivi de régime personnalisé © 2025
        </div>
      </footer>
    </div>
  );
};

export default RegimeTracker;
