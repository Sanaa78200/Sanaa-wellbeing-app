
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/context/UserContext';
import ActivityTracker from '@/components/health/ActivityTracker';
import DietApp from '@/components/nutrition/DietApp';
import RegimeTracker from '@/components/regime/RegimeTracker';
import { Utensils, Activity, Calendar } from 'lucide-react';

const NutritionRegime = () => {
  const { userData } = useUser();
  const userName = userData.name || 'Utilisateur';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 bg-islamic-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-islamic-green-dark mb-2">Nutrition & Régime</h1>
            <p className="text-islamic-slate">
              Suivez votre alimentation et activité physique en accord avec les principes islamiques.
            </p>
          </div>
          
          <Tabs defaultValue="regime" className="space-y-6">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="nutrition" className="flex items-center gap-2 data-[state=active]:bg-islamic-green data-[state=active]:text-white">
                <Utensils className="w-4 h-4" />
                Nutrition
              </TabsTrigger>
              <TabsTrigger value="regime" className="flex items-center gap-2 data-[state=active]:bg-islamic-green data-[state=active]:text-white">
                <Activity className="w-4 h-4" />
                Régime
              </TabsTrigger>
              <TabsTrigger value="activite" className="flex items-center gap-2 data-[state=active]:bg-islamic-green data-[state=active]:text-white">
                <Calendar className="w-4 h-4" />
                Activité
              </TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TabsContent value="nutrition" className="animate-fade-in mt-0">
                  <DietApp />
                </TabsContent>
                
                <TabsContent value="regime" className="animate-fade-in mt-0">
                  <RegimeTracker />
                </TabsContent>
                
                <TabsContent value="activite" className="animate-fade-in mt-0">
                  <Card className="islamic-card">
                    <CardHeader>
                      <CardTitle className="text-islamic-green">Suivi de l'Activité Physique</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ActivityTracker />
                      
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
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
              
              <div className="lg:col-span-1 space-y-6">
                <Card className="islamic-card">
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
                
                <iframe 
                  src="https://makkahlive.net/medinah.aspx" 
                  title="Madinah Live" 
                  width="100%" 
                  height="250" 
                  frameBorder="0" 
                  allowFullScreen
                  className="rounded-lg overflow-hidden shadow-md"
                ></iframe>
              </div>
            </div>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NutritionRegime;
