
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Utensils, Calendar, Heart } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-islamic-pattern">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 animate-fade-in">
            <span className="bg-islamic-green-light/10 text-islamic-green-dark px-3 py-1 rounded-full text-sm font-medium mb-6 inline-block">
              Pour les femmes musulmanes
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-islamic-green-dark mb-6 leading-tight">
              Bien-être sur mesure selon<br />les principes islamiques
            </h1>
            <p className="text-islamic-slate text-lg mb-8 max-w-lg">
              Une application qui allie principes religieux authentiques et science nutritionnelle moderne pour un parcours de perte de poids conforme à vos valeurs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-islamic-green hover:bg-islamic-green-dark text-white" asChild>
                <Link to="/calculateur">Commencer maintenant</Link>
              </Button>
              <Button variant="outline" className="border-islamic-green text-islamic-green hover:bg-islamic-green/10" asChild>
                <Link to="/nutrition">Découvrir les aliments Sunna</Link>
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-10 grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="islamic-card p-6 flex flex-col items-center text-center">
              <Utensils className="h-10 w-10 text-islamic-green mb-4" />
              <h3 className="font-bold text-islamic-green-dark mb-2">Nutrition Halal</h3>
              <p className="text-islamic-slate text-sm">Suivi alimentaire et recommandations conformes aux principes islamiques.</p>
            </div>
            <div className="islamic-card p-6 flex flex-col items-center text-center">
              <Calendar className="h-10 w-10 text-islamic-green mb-4" />
              <h3 className="font-bold text-islamic-green-dark mb-2">Mode Ramadan</h3>
              <p className="text-islamic-slate text-sm">Planification adaptée au jeûne et rappels pour les heures de prière.</p>
            </div>
            <div className="islamic-card p-6 flex flex-col items-center text-center col-span-2">
              <Heart className="h-10 w-10 text-islamic-green mb-4" />
              <h3 className="font-bold text-islamic-green-dark mb-2">Bien-être Complet</h3>
              <p className="text-islamic-slate text-sm">Alliant santé physique et spirituelle pour un équilibre parfait selon la Sunna.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
