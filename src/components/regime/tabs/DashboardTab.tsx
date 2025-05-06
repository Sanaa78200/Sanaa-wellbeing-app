
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingDown, Award, Activity, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { Challenge } from '@/components/nutrition/types';

interface DashboardTabProps {
  weightData: Array<{ date: string; poids: number }>;
  caloriesData: Array<{ date: string; calories: number }>;
  progressData: {
    poidsInitial: number;
    poidsActuel: number;
    poidsCible: number;
    joursSuivis: number;
    moyenneCalories: number;
    perteGraisse: number;
  };
  objectifTexte: string;
  challenges?: Challenge[];
  onCompleteChallenge: (id: string) => void;
  onUpdateChallenge: (id: string, progress: number) => void;
  isMobile?: boolean; // Added isMobile property
}

const DashboardTab: React.FC<DashboardTabProps> = ({
  weightData,
  caloriesData,
  progressData,
  objectifTexte,
  challenges,
  onCompleteChallenge,
  onUpdateChallenge,
  isMobile
}) => {
  return (
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
      <StatsCards progressData={progressData} />

      {/* Défis quotidiens */}
      {challenges && challenges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-islamic-green">Défis du jour</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {challenges.map((challenge) => (
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
                    onClick={() => onCompleteChallenge(challenge.id)}
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
  );
};

// Stats Cards Component
const StatsCards: React.FC<{progressData: DashboardTabProps['progressData']}> = ({ progressData }) => (
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
);

export default DashboardTab;
