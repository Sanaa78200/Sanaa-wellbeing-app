
import React from 'react';
import { CheckCircle, Calendar, Utensils, Book, Star } from 'lucide-react';

const features = [
  {
    icon: <Utensils className="h-8 w-8 text-islamic-green" />,
    title: "Calculateur Calorique Islamique",
    description: "Calculs adaptés aux femmes musulmanes avec prise en compte des périodes de jeûne et recommandations halal."
  },
  {
    icon: <Calendar className="h-8 w-8 text-islamic-green" />,
    title: "Horaires de Prière",
    description: "Horaires précis des prières quotidiennes et rappels pour maintenir votre pratique spirituelle."
  },
  {
    icon: <Star className="h-8 w-8 text-islamic-green" />,
    title: "Aliments de la Sunna",
    description: "Base de données des aliments recommandés par le Prophète ﷺ et leurs bienfaits scientifiques."
  },
  {
    icon: <Book className="h-8 w-8 text-islamic-green" />,
    title: "Conseils Spirituels",
    description: "Hadiths et versets coraniques quotidiens sur la modération alimentaire et le bien-être."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-islamic-green-dark mb-3">Fonctionnalités principales</h2>
          <p className="text-islamic-slate max-w-2xl mx-auto">
            Découvrez les outils essentiels qui vous aideront à atteindre vos objectifs de santé tout en renforçant votre foi.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="islamic-card p-6 flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-islamic-green-dark mb-3">{feature.title}</h3>
              <p className="text-islamic-slate">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
