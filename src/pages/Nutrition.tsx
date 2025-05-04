
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Utensils, Leaf, Check } from 'lucide-react';

interface SunnaFood {
  name: string;
  arabicName: string;
  benefits: string[];
  reference: string;
  source: string;
  nutritionalValue: {
    calories: number;
    protein?: number;
    carbs?: number;
    fats?: number;
  };
}

const sunnaFoods: SunnaFood[] = [
  {
    name: "Dattes",
    arabicName: "التمر",
    benefits: [
      "Source rapide d'énergie",
      "Riche en fibres et minéraux",
      "Favorise la digestion",
      "Contient des antioxydants"
    ],
    reference: "Le Prophète ﷺ ne rompait jamais son jeûne sans manger quelques dattes fraîches ou séchées.",
    source: "Sahih Bukhari 1957",
    nutritionalValue: {
      calories: 282,
      protein: 2.5,
      carbs: 75,
      fats: 0.4
    }
  },
  {
    name: "Miel",
    arabicName: "العسل",
    benefits: [
      "Propriétés antibactériennes",
      "Source d'antioxydants",
      "Aide à soulager la toux et le mal de gorge",
      "Boost d'énergie naturel"
    ],
    reference: "Il y a dans le miel un remède pour les gens.",
    source: "Sahih Bukhari 5678",
    nutritionalValue: {
      calories: 304,
      carbs: 82
    }
  },
  {
    name: "Huile d'olive",
    arabicName: "زيت الزيتون",
    benefits: [
      "Riche en acides gras monoinsaturés",
      "Réduit l'inflammation",
      "Bénéfique pour le cœur",
      "Contient des antioxydants"
    ],
    reference: "Consommez l'huile d'olive et oignez-vous en, car elle provient d'un arbre béni.",
    source: "Sunan al-Tirmidhi 1851",
    nutritionalValue: {
      calories: 884,
      fats: 100
    }
  },
  {
    name: "Lait",
    arabicName: "الحليب",
    benefits: [
      "Riche en calcium et vitamine D",
      "Source de protéines complètes",
      "Renforce les os et les dents",
      "Favorise une bonne santé musculaire"
    ],
    reference: "Quand l'un de vous mange de la nourriture, qu'il dise: 'Ô Allah! Bénis-la pour nous et donne-nous de meilleures choses.' Et quand on lui donne du lait à boire, qu'il dise: 'Ô Allah! Bénis-le pour nous et donne-nous davantage.'",
    source: "Abu Dawud, Tirmidhi",
    nutritionalValue: {
      calories: 42,
      protein: 3.4,
      carbs: 5,
      fats: 1
    }
  },
  {
    name: "Orge",
    arabicName: "الشعير",
    benefits: [
      "Riche en fibres et bêta-glucanes",
      "Aide à réguler le taux de cholestérol",
      "Stabilise la glycémie",
      "Favorise la satiété"
    ],
    reference: "Le Messager d'Allah ﷺ n'a jamais mangé de pain fait de farine fine jusqu'à sa mort, et il n'avait pas de tamis. Nous avions l'habitude de moudre l'orge et de souffler dessus. La partie grossière s'envole et nous préparions une pâte avec ce qui restait.",
    source: "Sahih Bukhari 5413",
    nutritionalValue: {
      calories: 354,
      protein: 12.5,
      carbs: 73.5,
      fats: 2.3
    }
  }
];

const nutritionPrinciples = [
  {
    title: "Modération dans l'alimentation",
    description: "Le Prophète ﷺ a enseigné que remplir le tiers de l'estomac avec de la nourriture, un tiers avec de l'eau et laisser un tiers vide est bénéfique pour la santé.",
    reference: "Le fils d'Adam ne remplit pas un récipient pire que son ventre. Quelques bouchées suffisent au fils d'Adam pour se tenir droit...",
    source: "Rapporté par at-Tirmidhi (2380)"
  },
  {
    title: "Consommer des aliments purs (Tayyib)",
    description: "L'islam encourage la consommation d'aliments purs, naturels et non transformés qui sont bénéfiques pour la santé.",
    reference: "Ô vous les hommes! Mangez ce qui est licite et bon (tayyib) sur la terre...",
    source: "Sourate Al-Baqarah (2:168)"
  },
  {
    title: "Manger avec la main droite",
    description: "Le Prophète ﷺ recommandait de manger avec la main droite, ce qui encourage à manger plus lentement et à être plus conscient de sa consommation.",
    reference: "Ô jeune homme! Mentionne le nom d'Allah, mange avec ta main droite et mange de ce qui est près de toi.",
    source: "Sahih Bukhari 5376"
  }
];

const Nutrition = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-islamic-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-islamic-green-dark mb-3">Nutrition selon la Sunna</h1>
            <p className="text-islamic-slate max-w-2xl mx-auto">
              Découvrez les aliments recommandés par le Prophète Muhammad ﷺ et leurs bienfaits scientifiquement prouvés pour votre santé.
            </p>
          </div>
          
          <Tabs defaultValue="aliments" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="aliments" className="text-base">Aliments de la Sunna</TabsTrigger>
              <TabsTrigger value="principes" className="text-base">Principes nutritionnels</TabsTrigger>
            </TabsList>
            
            <TabsContent value="aliments" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                {sunnaFoods.map((food, index) => (
                  <Card key={index} className="islamic-card">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl text-islamic-green-dark flex items-center gap-2">
                          <Utensils className="h-5 w-5" />
                          {food.name}
                        </CardTitle>
                        <span className="text-islamic-green islamic-arabic text-lg">{food.arabicName}</span>
                      </div>
                      <CardDescription>{food.reference}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-islamic-green-dark mb-2">Bienfaits</h4>
                          <ul className="space-y-1">
                            {food.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-islamic-slate">
                                <Check className="h-4 w-4 text-islamic-green mt-0.5 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-islamic-green-dark mb-2">Valeur nutritive</h4>
                          <div className="space-y-1 text-sm">
                            <p className="text-islamic-slate"><span className="font-medium">Calories:</span> {food.nutritionalValue.calories} kcal</p>
                            {food.nutritionalValue.protein && (
                              <p className="text-islamic-slate"><span className="font-medium">Protéines:</span> {food.nutritionalValue.protein}g</p>
                            )}
                            {food.nutritionalValue.carbs && (
                              <p className="text-islamic-slate"><span className="font-medium">Glucides:</span> {food.nutritionalValue.carbs}g</p>
                            )}
                            {food.nutritionalValue.fats && (
                              <p className="text-islamic-slate"><span className="font-medium">Lipides:</span> {food.nutritionalValue.fats}g</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-islamic-green border-t border-islamic-green/10 pt-2">
                        Source: {food.source}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="principes" className="animate-fade-in">
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="text-islamic-green-dark flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    Principes nutritionnels islamiques
                  </CardTitle>
                  <CardDescription>
                    Les enseignements du Prophète Muhammad ﷺ sur l'alimentation et la santé
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {nutritionPrinciples.map((principle, index) => (
                    <div key={index} className="pb-5 border-b border-islamic-green/10 last:border-0 last:pb-0">
                      <h3 className="font-semibold text-islamic-green-dark mb-2">{principle.title}</h3>
                      <p className="text-islamic-slate mb-3">{principle.description}</p>
                      <blockquote className="border-l-4 border-islamic-green-light pl-4 py-1 italic text-islamic-slate text-sm">
                        <p>"{principle.reference}"</p>
                        <footer className="text-islamic-green text-xs mt-1">— {principle.source}</footer>
                      </blockquote>
                    </div>
                  ))}
                  
                  <div className="bg-islamic-cream p-4 rounded-md border border-islamic-green/20 mt-8">
                    <h3 className="font-semibold text-islamic-green-dark mb-2">Note sur l'alimentation halal</h3>
                    <p className="text-islamic-slate text-sm">
                      L'islam prescrit également la consommation exclusive d'aliments halal (licites), qui exclut le porc, l'alcool, et les animaux non abattus selon les rites islamiques. Cette prescription vise à maintenir à la fois la pureté spirituelle et la santé physique du croyant.
                    </p>
                    <p className="text-islamic-slate text-sm mt-2">
                      "Il vous est interdit la bête trouvée morte, le sang, la chair de porc, ce sur quoi on a invoqué un autre nom que celui d'Allah..." 
                      <span className="block text-islamic-green text-xs mt-1">— Sourate Al-Maidah (5:3)</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Nutrition;
