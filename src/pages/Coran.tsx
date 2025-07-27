
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import QuranWidget from '@/components/quran/QuranWidget';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Clock, Calendar, ShoppingCart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Coran = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-islamic-pattern">
        <div className="container mx-auto px-4 py-8">
          {/* Bannière principale */}
          <div className="bg-islamic-green text-white p-6 rounded-lg mb-8 shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Le Noble Coran</h1>
            <p className="opacity-80">Écoutez le Noble Coran avec des fonctionnalités de récitation audio</p>
          </div>

          {/* Bannière d'achat Coran */}
          <div className="bg-gradient-to-r from-islamic-gold to-islamic-gold-dark text-white p-4 rounded-lg mb-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Book className="h-8 w-8" />
                <div>
                  <h2 className="text-xl font-bold">Achetez votre Coran</h2>
                  <p className="text-sm opacity-90">Livraison en moins de 2 jours</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white text-islamic-gold hover:bg-islamic-cream border-white"
                onClick={() => window.open('https://amzn.to/46uPNoi', '_blank')}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Commander maintenant
                <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Principal */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <QuranWidget />
            </div>
            
            <div className="space-y-6">
              {/* Pages connexes */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-islamic-green mb-4">Pages connexes</h2>
                  <div className="space-y-3">
                    <Link to="/prieres" className="flex items-center justify-between p-3 rounded-md bg-islamic-cream hover:bg-islamic-cream/80 transition-colors">
                      <div className="flex items-center gap-3">
                        <Clock className="text-islamic-green h-5 w-5" />
                        <span>Horaires de prière</span>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to="/ramadan" className="flex items-center justify-between p-3 rounded-md bg-islamic-cream hover:bg-islamic-cream/80 transition-colors">
                      <div className="flex items-center gap-3">
                        <Calendar className="text-islamic-green h-5 w-5" />
                        <span>Mode Ramadan</span>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to="/nutrition-regime" className="flex items-center justify-between p-3 rounded-md bg-islamic-cream hover:bg-islamic-cream/80 transition-colors">
                      <div className="flex items-center gap-3">
                        <Book className="text-islamic-green h-5 w-5" />
                        <span>Nutrition & Régime</span>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              {/* Sourates populaires */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-islamic-green mb-4">Sourates populaires</h2>
                  <div className="grid grid-cols-2 gap-2">
                     <SurahButton surahNumber={1} name="Al-Fatiha" />
                     <SurahButton surahNumber={36} name="Ya-Sin" />
                     <SurahButton surahNumber={55} name="Ar-Rahman" />
                     <SurahButton surahNumber={67} name="Al-Mulk" />
                     <SurahButton surahNumber={18} name="Al-Kahf" />
                     <SurahButton surahNumber={56} name="Al-Waqi'ah" />
                  </div>
                </CardContent>
              </Card>
              
              {/* Coran en chiffres */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-islamic-green mb-4">Le Coran en chiffres</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-islamic-cream p-3 rounded-md text-center">
                      <div className="text-2xl font-bold text-islamic-green">114</div>
                      <div className="text-sm">Sourates</div>
                    </div>
                    <div className="bg-islamic-cream p-3 rounded-md text-center">
                      <div className="text-2xl font-bold text-islamic-green">6236</div>
                      <div className="text-sm">Versets</div>
                    </div>
                    <div className="bg-islamic-cream p-3 rounded-md text-center">
                      <div className="text-2xl font-bold text-islamic-green">30</div>
                      <div className="text-sm">Juz</div>
                    </div>
                    <div className="bg-islamic-cream p-3 rounded-md text-center">
                      <div className="text-2xl font-bold text-islamic-green">77439</div>
                      <div className="text-sm">Mots</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Composant bouton pour les sourates populaires
const SurahButton = ({ surahNumber, name }: { surahNumber: number; name: string }) => {
  return (
    <button 
      className="bg-islamic-cream/50 hover:bg-islamic-cream transition-colors rounded-md p-2 text-sm flex justify-between items-center"
      onClick={() => {
        // Trouver et mettre à jour le sélecteur de sourates
        const selector = document.querySelector('select');
        if (selector) {
          selector.value = surahNumber.toString();
          selector.dispatchEvent(new Event('change'));
        }
        // Faire défiler jusqu'au widget
        document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <span className="font-arabic">{name}</span>
      <span className="bg-islamic-green text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {surahNumber}
      </span>
    </button>
  );
};

export default Coran;
