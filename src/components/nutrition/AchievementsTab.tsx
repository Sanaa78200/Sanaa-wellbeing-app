
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, Star } from 'lucide-react';
import { Gamification } from './types';

interface AchievementsTabProps {
  gamification?: Gamification;
}

const AchievementsTab = ({ gamification }: AchievementsTabProps) => {
  if (!gamification) {
    return (
      <div className="space-y-4 animate-fade-in">
        <p className="text-center text-gray-500">Aucune donnée de gamification disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <h3 className="font-semibold flex items-center">
          <Award className="w-5 h-5 mr-2 text-amber-500" />
          Badges
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {gamification.badges.map((badge) => (
            <div 
              key={badge.id} 
              className={`p-3 rounded-lg border ${badge.isEarned 
                ? 'bg-islamic-cream border-islamic-green' 
                : 'bg-gray-100 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start space-x-2">
                <div className="text-2xl">{badge.icon}</div>
                <div>
                  <h4 className="font-medium">{badge.name}</h4>
                  <p className="text-xs text-gray-600">{badge.description}</p>
                  {badge.isEarned && badge.earnedAt && (
                    <p className="text-xs text-islamic-green mt-1">
                      Obtenu le {new Date(badge.earnedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold flex items-center">
          <Star className="w-5 h-5 mr-2 text-amber-500" />
          Défis du jour
        </h3>
        <div className="space-y-2">
          {gamification.challenges.map((challenge) => (
            <div 
              key={challenge.id} 
              className={`p-3 rounded-lg border ${challenge.isCompleted 
                ? 'bg-islamic-cream border-islamic-green' 
                : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{challenge.name}</h4>
                  <p className="text-xs text-gray-600">{challenge.description}</p>
                </div>
                <Badge className="bg-islamic-green-dark">+{challenge.points} pts</Badge>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsTab;
