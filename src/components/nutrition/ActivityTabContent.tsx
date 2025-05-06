
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import ActivityTracker from '@/components/health/ActivityTracker';

interface ActivityTabContentProps {
  isMobile: boolean;
}

const ActivityTabContent: React.FC<ActivityTabContentProps> = ({ isMobile }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-islamic-green">Suivi de l'Activité Physique</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ActivityTracker />
        
        {!isMobile && (
          <div className="bg-islamic-cream p-4 rounded-lg border border-islamic-green/20 mt-4">
            <h3 className="font-medium text-islamic-green-dark mb-2">Conseils d'activité physique</h3>
            <ul className="list-disc list-inside space-y-2 text-islamic-slate text-sm">
              <li>Visez au moins 8 000 pas par jour pour maintenir une bonne santé</li>
              <li>Intégrez des prières régulières qui comprennent des mouvements bénéfiques</li>
              <li>Alternez entre la marche rapide et lente, comme recommandé dans la tradition islamique</li>
              <li>Planifiez votre activité physique en fonction des heures de prière</li>
              <li>Hydratez-vous régulièrement, surtout après l'exercice</li>
            </ul>
          </div>
        )}
        
        {isMobile && (
          <Accordion type="single" collapsible>
            <AccordionItem value="tips">
              <AccordionTrigger className="text-islamic-green-dark">
                Conseils d'activité physique
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2 text-islamic-slate text-sm">
                  <li>Visez au moins 8 000 pas par jour pour maintenir une bonne santé</li>
                  <li>Intégrez des prières régulières qui comprennent des mouvements bénéfiques</li>
                  <li>Alternez entre la marche rapide et lente, comme recommandé dans la tradition islamique</li>
                  <li>Planifiez votre activité physique en fonction des heures de prière</li>
                  <li>Hydratez-vous régulièrement, surtout après l'exercice</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTabContent;
