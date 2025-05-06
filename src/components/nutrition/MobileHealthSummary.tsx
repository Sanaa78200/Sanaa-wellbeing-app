
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { UserData } from '@/components/nutrition/types';

interface MobileHealthSummaryProps {
  userData: UserData;
}

const MobileHealthSummary: React.FC<MobileHealthSummaryProps> = ({ userData }) => {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-islamic-green">Résumé de Santé</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="stats">
            <AccordionTrigger>
              Statistiques personnelles
            </AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>
          
          {userData.gamification && (
            <AccordionItem value="challenges">
              <AccordionTrigger>
                Défis du jour
              </AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
          )}
          
          <AccordionItem value="tips">
            <AccordionTrigger>
              Conseils nutritionnels
            </AccordionTrigger>
            <AccordionContent>
              <ul className="text-xs text-islamic-slate space-y-1">
                <li>• Privilégiez les aliments naturels et halal</li>
                <li>• Évitez les excès, comme mentionné dans le Coran</li>
                <li>• Mangez lentement et avec modération</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default MobileHealthSummary;
