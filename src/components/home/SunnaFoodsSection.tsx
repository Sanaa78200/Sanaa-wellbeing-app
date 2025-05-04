
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SunnaFood {
  name: string;
  arabicName: string;
  benefits: string;
  reference: string;
  source: string;
}

const sunnaFoods: SunnaFood[] = [
  {
    name: "Dattes",
    arabicName: "التمر",
    benefits: "Riches en fibres, minéraux et antioxydants. Idéales pour l'énergie et la digestion.",
    reference: "Le Prophète ﷺ ne rompait jamais son jeûne sans manger quelques dattes...",
    source: "Sahih Bukhari 1957"
  },
  {
    name: "Miel",
    arabicName: "العسل",
    benefits: "Propriétés antibactériennes et anti-inflammatoires. Source d'antioxydants.",
    reference: "Il y a dans le miel un remède pour les gens.",
    source: "Sahih Bukhari 5678"
  },
  {
    name: "Huile d'olive",
    arabicName: "زيت الزيتون",
    benefits: "Riche en acides gras monoinsaturés et antioxydants. Bénéfique pour le cœur.",
    reference: "Consommez l'huile d'olive et oignez-vous en, car elle provient d'un arbre béni.",
    source: "Sunan al-Tirmidhi 1851"
  }
];

const SunnaFoodsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-islamic-green-dark mb-3">Aliments de la Sunna</h2>
          <p className="text-islamic-slate max-w-2xl mx-auto">
            Découvrez les aliments recommandés par le Prophète Muhammad ﷺ et leurs bienfaits scientifiquement prouvés.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {sunnaFoods.map((food, index) => (
            <Card key={index} className="islamic-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-islamic-green-dark">{food.name}</CardTitle>
                  <span className="text-islamic-green islamic-arabic text-lg">{food.arabicName}</span>
                </div>
                <CardDescription className="text-islamic-slate">{food.benefits}</CardDescription>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-islamic-green-light pl-4 italic text-islamic-slate">
                  <p className="text-sm mb-2">"{food.reference}"</p>
                  <footer className="text-xs text-islamic-green">— {food.source}</footer>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SunnaFoodsSection;
