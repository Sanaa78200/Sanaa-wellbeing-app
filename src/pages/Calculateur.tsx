
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CalorieCalculator from '@/components/calculator/CalorieCalculator';

const Calculateur = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-islamic-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-islamic-green-dark mb-3">Calculateur de calories</h1>
            <p className="text-islamic-slate max-w-2xl mx-auto">
              Obtenez une estimation personnalisée de vos besoins caloriques quotidiens en tenant compte des principes islamiques de modération et des périodes de jeûne.
            </p>
          </div>
          
          <CalorieCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calculateur;
