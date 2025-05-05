
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DietApp from '@/components/nutrition/DietApp';

const Nutrition = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-islamic-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-islamic-green-dark mb-3">Suivi Nutritionnel</h1>
            <p className="text-islamic-slate max-w-2xl mx-auto">
              Suivez votre alimentation quotidienne et atteignez vos objectifs nutritionnels en accord avec les principes islamiques.
            </p>
          </div>
          
          <DietApp />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Nutrition;
