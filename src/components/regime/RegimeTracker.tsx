
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, ChevronLeft, ChevronRight, TrendingDown, Award, Target, Activity } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';

const RegimeTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { userData, updateChallenge, completeChallenge } = useUser();
  
  // Utilisation du nom de l'utilisateur du contexte
  const userName = userData.name || 'Utilisateur';
  const userGoal = userData.goal === 'lose' ? 'Perdre du poids' : 
                  userData.goal === 'gain' ? 'Prendre du poids' : 'Maintenir le poids';
  
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
    poidsInitial: parseFloat(userData.weight) || 78.2,
    poidsActuel: 74.5,
    poidsCible: userData.goal === 'lose' ? 70.0 : userData.goal === 'gain' ? 85.0 : parseFloat(userData.weight) || 75.0,
    joursSuivis: userData.gamification?.streak || 15,
    moyenneCalories: 1694,
    perteGraisse: 2.1,
  };

  // Calcul de l'objectif pour l'affichage
  const objectifTexte = userData.goal === 'lose' ? 
    `-0.5 kg / semaine` : 
    userData.goal === 'gain' ? 
    `+0.5 kg / semaine` : 
    `Maintenir le poids`;

  // Fonction pour marquer un défi comme accompli
  const handleCompleteChallenge = (id) => {
    completeChallenge(id);
    toast.success("Défi complété !", {
      description: "Vous avez gagné des points de gamification !",
    });
  };

  // Fonction pour mettre à jour la progression d'un défi
  const handleUpdateChallenge = (id, progress) => {
    updateChallenge(id, progress);
  };
  
  return (
    <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
      {/* Navigation */}
      <nav className="bg-islamic-green text-white shadow-sm">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-3 flex items-center space-x-2 whitespace-nowrap ${activeTab === 'dashboard' ? 'border-b-2 border-islamic-cream text-islamic-cream' : 'text-white'}`}
            >
              <Activity size={20} />
              <span>Tableau de bord</span>
            </button>
            <button 
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-3 flex items-center space-x-2 whitespace-nowrap ${activeTab === 'progress' ? 'border-b-2 border-islamic-cream text-islamic-cream' : 'text-white'}`}
            >
              <TrendingDown size={20} />
              <span>Progrès</span>
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-3 flex items-center space-x-2 whitespace-nowrap ${activeTab === 'calendar' ? 'border-b-2 border-islamic-cream text-islamic-cream' : 'text-white'}`}
            >
              <Calendar size={20} />
              <span>Calendrier</span>
            </button>
            <button 
              onClick={() => setActiveTab('objectives')}
              className={`px-4 py-3 flex items-center space-x-2 whitespace-nowrap ${activeTab === 'objectives' ? 'border-b-2 border-islamic-cream text-islamic-cream' : 'text-white'}`}
            >
              <Target size={20} />
              <span>Objectifs</span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Content */}
      <main className="p-4">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Poids card */}
              <Card className="flex-1">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-islamic-green">Évolution du poids</h2>
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
                          stroke="#3E7553" 
                          activeDot={{ r: 8 }} 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex justify-between items-center text-sm">
                    <div className="text-green-500">-1.0 kg cette semaine</div>
                    <div className="text-islamic-green font-medium">Objectif: {objectifTexte}</div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Calories card */}
              <Card className="flex-1">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-islamic-green">Consommation calorique</h2>
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
                          stroke="#D4AF37" 
                          activeDot={{ r: 8 }} 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex justify-between items-center text-sm">
                    <div className="text-green-500">-200 kcal en moyenne</div>
                    <div className="text-islamic-green font-medium">Objectif: 1700 kcal / jour</div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Récapitulatif en cartes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Poids actuel</p>
                      <p className="text-2xl font-bold text-gray-800">{progressData.poidsActuel} kg</p>
                    </div>
                    <div className="bg-islamic-cream p-2 rounded-lg">
                      <TrendingDown size={24} className="text-islamic-green" />
                    </div>
                  </div>
                  <div className="mt-2 text-green-500 text-sm">
                    -{(progressData.poidsInitial - progressData.poidsActuel).toFixed(1)} kg depuis le début
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Jours suivis</p>
                      <p className="text-2xl font-bold text-gray-800">{progressData.joursSuivis}</p>
                    </div>
                    <div className="bg-islamic-cream p-2 rounded-lg">
                      <Calendar size={24} className="text-islamic-green" />
                    </div>
                  </div>
                  <div className="mt-2 text-islamic-green text-sm">
                    Excellente constance !
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Calories / jour</p>
                      <p className="text-2xl font-bold text-gray-800">{progressData.moyenneCalories}</p>
                    </div>
                    <div className="bg-islamic-cream p-2 rounded-lg">
                      <Activity size={24} className="text-islamic-green" />
                    </div>
                  </div>
                  <div className="mt-2 text-green-500 text-sm">
                    En dessous de l'objectif de 1700 kcal
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Perte de graisse</p>
                      <p className="text-2xl font-bold text-gray-800">{progressData.perteGraisse} %</p>
                    </div>
                    <div className="bg-islamic-cream p-2 rounded-lg">
                      <Award size={24} className="text-islamic-green" />
                    </div>
                  </div>
                  <div className="mt-2 text-green-500 text-sm">
                    Bonne tendance !
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Défis quotidiens */}
            {userData.gamification && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-islamic-green">Défis du jour</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userData.gamification.challenges.map((challenge) => (
                    <div 
                      key={challenge.id} 
                      className={`p-3 rounded-lg border ${
                        challenge.isCompleted ? 'bg-islamic-cream border-islamic-green' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{challenge.name}</h4>
                          <p className="text-xs text-gray-600">{challenge.description}</p>
                        </div>
                        <Badge className="bg-islamic-green text-white">+{challenge.points} pts</Badge>
                      </div>
                      
                      {challenge.goal && challenge.progress !== undefined && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{challenge.progress}/{challenge.goal}</span>
                            <span>{Math.round((challenge.progress / challenge.goal) * 100)}%</span>
                          </div>
                          <Progress value={(challenge.progress / challenge.goal) * 100} className="h-2" />
                        </div>
                      )}

                      {!challenge.isCompleted && (
                        <button 
                          onClick={() => handleCompleteChallenge(challenge.id)}
                          className="w-full mt-2 py-1 text-sm text-islamic-green hover:text-islamic-green-dark font-medium"
                        >
                          Marquer comme accompli
                        </button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}
        
        {activeTab === 'progress' && (
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
        )}
        
        {activeTab === 'calendar' && (
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
        )}
        
        {activeTab === 'objectives' && (
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
        )}
      </main>
    </div>
  );
};

export default RegimeTracker;
