
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Moon, Calendar, Droplets, Utensils, Clock } from 'lucide-react';

interface MealPlan {
  title: string;
  icon: React.ReactNode;
  time: string;
  description: string;
  foods: string[];
}

const suhoorMeals: MealPlan[] = [
  {
    title: "Suhoor énergétique",
    icon: <Utensils className="h-5 w-5 text-islamic-green" />,
    time: "Avant l'aube (Fajr)",
    description: "Un repas qui vous maintient rassasié et hydraté tout au long de la journée.",
    foods: [
      "Dattes (3-5)",
      "Flocons d'avoine avec lait et miel",
      "Œufs brouillés aux légumes",
      "Yaourt",
      "Eau (500-750ml)"
    ]
  },
  {
    title: "Suhoor protéiné",
    icon: <Utensils className="h-5 w-5 text-islamic-green" />,
    time: "Avant l'aube (Fajr)",
    description: "Riche en protéines pour une satieté prolongée.",
    foods: [
      "Pain complet avec œufs et avocat",
      "Labneh (fromage blanc arabe)",
      "Noix et graines mélangées",
      "Banane",
      "Eau (500-750ml)"
    ]
  }
];

const iftarMeals: MealPlan[] = [
  {
    title: "Iftar traditionnel",
    icon: <Utensils className="h-5 w-5 text-islamic-green" />,
    time: "Après le coucher du soleil (Maghrib)",
    description: "Suivant la tradition du Prophète ﷺ pour rompre le jeûne.",
    foods: [
      "3 dattes pour rompre le jeûne",
      "Soupe de lentilles",
      "Salade verte",
      "Plat principal léger (poulet grillé avec légumes)",
      "Eau et thé à la menthe"
    ]
  },
  {
    title: "Iftar complet",
    icon: <Utensils className="h-5 w-5 text-islamic-green" />,
    time: "Après le coucher du soleil (Maghrib)",
    description: "Repas complet et équilibré pour le soir.",
    foods: [
      "3 dattes et eau pour rompre le jeûne",
      "Harira (soupe marocaine)",
      "Salade de taboulé",
      "Poisson grillé avec légumes et riz brun",
      "Fruits frais de saison"
    ]
  }
];

const hydrationTips = [
  {
    title: "Boire progressivement",
    icon: <Droplets className="h-5 w-5 text-islamic-green" />,
    description: "Évitez de boire de grandes quantités d'eau d'un coup. Répartissez votre consommation d'eau entre l'iftar et le suhoor."
  },
  {
    title: "Privilégier les liquides hydratants",
    icon: <Droplets className="h-5 w-5 text-islamic-green" />,
    description: "Incluez des soupes, tisanes, lait et boissons à base de fruits. Évitez la caféine qui peut causer de la déshydratation."
  },
  {
    title: "Aliments riches en eau",
    icon: <Utensils className="h-5 w-5 text-islamic-green" />,
    description: "Consommez des fruits et légumes à haute teneur en eau comme le concombre, la pastèque, les oranges et la laitue."
  }
];

const Ramadan = () => {
  const [isRamadan, setIsRamadan] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-islamic-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-islamic-cream px-4 py-1.5 rounded-full mb-4">
              <Moon className="h-5 w-5 text-islamic-green" />
              <span className="text-islamic-green-dark font-medium">{isRamadan ? "Ramadan Mubarak!" : "Préparation au Ramadan"}</span>
            </div>
            <h1 className="text-3xl font-bold text-islamic-green-dark mb-3">Mode Ramadan</h1>
            <p className="text-islamic-slate max-w-2xl mx-auto">
              Conseils nutritionnels adaptés au mois sacré du Ramadan pour vous aider à jeûner en bonne santé et maintenir votre énergie.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="repas">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="repas" className="text-base">Planification des repas</TabsTrigger>
                <TabsTrigger value="hydratation" className="text-base">Hydratation</TabsTrigger>
                <TabsTrigger value="conseils" className="text-base">Conseils spirituels</TabsTrigger>
              </TabsList>
              
              <TabsContent value="repas" className="animate-fade-in">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-semibold text-islamic-green-dark mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Repas du Suhoor
                    </h2>
                    <div className="space-y-6">
                      {suhoorMeals.map((meal, index) => (
                        <Card key={index} className="islamic-card">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-lg text-islamic-green-dark">{meal.title}</CardTitle>
                              <span className="text-islamic-slate text-sm">{meal.time}</span>
                            </div>
                            <CardDescription>{meal.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-1">
                              {meal.foods.map((food, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-islamic-slate">
                                  <span className="text-islamic-green">•</span>
                                  <span>{food}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold text-islamic-green-dark mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Repas de l'Iftar
                    </h2>
                    <div className="space-y-6">
                      {iftarMeals.map((meal, index) => (
                        <Card key={index} className="islamic-card">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-lg text-islamic-green-dark">{meal.title}</CardTitle>
                              <span className="text-islamic-slate text-sm">{meal.time}</span>
                            </div>
                            <CardDescription>{meal.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-1">
                              {meal.foods.map((food, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-islamic-slate">
                                  <span className="text-islamic-green">•</span>
                                  <span>{food}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="hydratation" className="animate-fade-in">
                <Card className="islamic-card">
                  <CardHeader>
                    <CardTitle className="text-islamic-green-dark flex items-center gap-2">
                      <Droplets className="h-5 w-5" />
                      Conseils d'hydratation pour le Ramadan
                    </CardTitle>
                    <CardDescription>
                      Maintenir une bonne hydratation est crucial pendant le Ramadan, surtout pendant les longs jours d'été.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {hydrationTips.map((tip, index) => (
                        <div key={index} className="flex gap-4 pb-4 border-b border-islamic-green/10 last:border-0 last:pb-0">
                          <div className="bg-islamic-green-light/10 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                            {tip.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-islamic-green-dark mb-1">{tip.title}</h3>
                            <p className="text-islamic-slate">{tip.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-islamic-cream rounded-md border border-islamic-green/20">
                      <h3 className="font-medium text-islamic-green-dark mb-2">Objectif journalier d'hydratation</h3>
                      <p className="text-islamic-slate">
                        Visez à consommer au moins 2 litres d'eau entre l'iftar et le suhoor. Commencez par quelques gorgées à l'iftar, puis continuez à boire régulièrement tout au long de la soirée.
                      </p>
                      <div className="mt-3 grid grid-cols-8 gap-1">
                        {Array(8).fill(0).map((_, i) => (
                          <div key={i} className="h-6 bg-islamic-green-light/20 rounded-sm" />
                        ))}
                      </div>
                      <p className="text-xs text-center text-islamic-slate mt-1">8 verres recommandés (250 ml chacun)</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="conseils" className="animate-fade-in">
                <Card className="islamic-card">
                  <CardHeader>
                    <CardTitle className="text-islamic-green-dark flex items-center gap-2">
                      <Moon className="h-5 w-5" />
                      Conseils spirituels et pratiques
                    </CardTitle>
                    <CardDescription>
                      Le Ramadan est bien plus qu'un jeûne physique, c'est un moment de purification spirituelle et de développement personnel.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-islamic-green-dark mb-2">Intentions et pratiques</h3>
                        <ul className="space-y-3 text-islamic-slate">
                          <li className="flex items-start gap-3">
                            <div className="bg-islamic-green-light/10 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                              <Calendar className="h-4 w-4 text-islamic-green" />
                            </div>
                            <div>
                              <p className="font-medium text-islamic-green-dark">Fixez des intentions claires</p>
                              <p>Avant chaque jour de jeûne, renouvelez votre intention (niyyah) et définissez un objectif spirituel spécifique pour la journée.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="bg-islamic-green-light/10 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                              <Book className="h-4 w-4 text-islamic-green" />
                            </div>
                            <div>
                              <p className="font-medium text-islamic-green-dark">Lire le Coran régulièrement</p>
                              <p>Essayez de lire au moins quelques pages chaque jour, avec réflexion sur leur signification.</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-islamic-green/10">
                        <h3 className="font-semibold text-islamic-green-dark mb-2">Invocations pour le jeûne</h3>
                        
                        <div className="space-y-4">
                          <div className="bg-islamic-cream p-3 rounded-md">
                            <p className="text-islamic-slate mb-1">Invocation au moment de rompre le jeûne:</p>
                            <p className="islamic-arabic text-right text-islamic-green-dark text-lg mb-1">اللَّهُمَّ إِنِّي لَكَ صُمْتُ، وَبِكَ آمَنْتُ، وَعَلَى رِزْقِكَ أَفْطَرْتُ</p>
                            <p className="text-islamic-slate italic text-sm">Allahumma inni laka sumtu, wa bika amantu, wa 'ala rizqika aftartu</p>
                            <p className="text-islamic-slate text-sm mt-1">
                              "Ô Allah! J'ai jeûné pour Toi, j'ai cru en Toi, et je romps mon jeûne avec la nourriture que Tu m'as accordée."
                            </p>
                          </div>
                          
                          <div className="bg-islamic-cream p-3 rounded-md">
                            <p className="text-islamic-slate mb-1">Invocation au début du jeûne:</p>
                            <p className="islamic-arabic text-right text-islamic-green-dark text-lg mb-1">نَوَيْتُ صَوْمَ غَدٍ مِنْ شَهْرِ رَمَضَانَ</p>
                            <p className="text-islamic-slate italic text-sm">Nawaitu sawma ghadin min shahri Ramadan</p>
                            <p className="text-islamic-slate text-sm mt-1">
                              "J'ai l'intention de jeûner demain pendant le mois de Ramadan."
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-islamic-green/10">
                        <blockquote className="italic text-islamic-slate">
                          <p>"Le jeûne et le Coran intercèdent pour le serviteur le Jour de la Résurrection. Le jeûne dit : 'Seigneur! Je l'ai privé de nourriture et de désirs pendant la journée, permets-moi donc d'intercéder pour lui.' Et le Coran dit : 'Je l'ai privé de sommeil la nuit, permets-moi donc d'intercéder pour lui.' Leur intercession est alors acceptée."</p>
                          <footer className="text-islamic-green text-sm mt-2">— Ahmad, authentifié par Al-Albani</footer>
                        </blockquote>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ramadan;

// Added Book icon at the top but missed importing it
import { Book } from 'lucide-react';
