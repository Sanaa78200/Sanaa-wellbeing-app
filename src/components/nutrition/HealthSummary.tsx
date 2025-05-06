
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserData } from '@/components/nutrition/types';

interface HealthSummaryProps {
  userData: UserData;
}

const HealthSummary: React.FC<HealthSummaryProps> = ({ userData }) => {
  const userName = userData.name || 'Utilisateur';
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-islamic-green">Résumé de Santé</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-islamic-slate">Bienvenue, <span className="font-medium">{userName}</span></p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-center">
              <div className="bg-islamic-cream p-2 rounded">
                <div className="text-lg font-bold">{userData.weight || '-'}</div>
                <div className="text-xs text-islamic-slate">kg</div>
              </div>
              <div className="bg-islamic-cream p-2 rounded">
                <div className="text-lg font-bold">{userData.height || '-'}</div>
                <div className="text-xs text-islamic-slate">cm</div>
              </div>
              <div className="bg-islamic-cream p-2 rounded">
                <div className="text-lg font-bold">{userData.age || '-'}</div>
                <div className="text-xs text-islamic-slate">ans</div>
              </div>
              <div className="bg-islamic-cream p-2 rounded">
                <div className="text-lg font-bold">
                  {userData.goal === 'lose' ? 'Perte' : 
                  userData.goal === 'gain' ? 'Gain' : 'Maintien'}
                </div>
                <div className="text-xs text-islamic-slate">Objectif</div>
              </div>
            </div>
          </div>
          
          {userData.gamification && (
            <div>
              <h3 className="text-sm font-medium mb-2">Défis du jour</h3>
              <div className="space-y-2">
                {userData.gamification.challenges.map((challenge) => (
                  <div key={challenge.id} className="text-xs p-2 border border-gray-200 rounded">
                    <div className="flex justify-between">
                      <span>{challenge.name}</span>
                      <span className="text-islamic-green">+{challenge.points} pts</span>
                    </div>
                    <div className="mt-1 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-islamic-green" 
                        style={{ width: `${challenge.goal ? (challenge.progress || 0) / challenge.goal * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium mb-2">Conseils nutritionnels</h3>
            <ul className="text-xs text-islamic-slate space-y-1">
              <li>• Privilégiez les aliments naturels et halal</li>
              <li>• Évitez les excès, comme mentionné dans le Coran</li>
              <li>• Mangez lentement et avec modération</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthSummary;
