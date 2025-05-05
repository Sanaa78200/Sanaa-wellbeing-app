
import React from 'react';
import RegimeTracker from '@/components/regime/RegimeTracker';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Calendar, ArrowRight } from 'lucide-react';

const Regime = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-islamic-pattern">
        <div className="container mx-auto px-4 py-8">
          {/* Bannière */}
          <div className="bg-islamic-green text-white p-6 rounded-lg mb-8 shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Régime et nutrition islamique</h1>
            <p className="opacity-80">Suivez votre progression et atteignez vos objectifs de santé en accord avec les principes islamiques</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RegimeTracker />
            </div>
            
            <div className="space-y-6">
              {/* Pages connexes */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-islamic-green mb-4">Pages connexes</h2>
                  <div className="space-y-3">
                    <Link to="/nutrition" className="flex items-center justify-between p-3 rounded-md bg-islamic-cream hover:bg-islamic-cream/80 transition-colors">
                      <div className="flex items-center gap-3">
                        <Book className="text-islamic-green h-5 w-5" />
                        <span>Nutrition halal</span>
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
                    <Link to="/coran" className="flex items-center justify-between p-3 rounded-md bg-islamic-cream hover:bg-islamic-cream/80 transition-colors">
                      <div className="flex items-center gap-3">
                        <Book className="text-islamic-green h-5 w-5" />
                        <span>Le Noble Coran</span>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              {/* Conseils nutritionnels */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-islamic-green mb-4">Conseils nutritionnels</h2>
                  <ul className="list-disc list-inside space-y-2 text-islamic-slate">
                    <li>Privilégiez les aliments naturels et halal</li>
                    <li>Évitez les excès (israf), comme mentionné dans le Coran</li>
                    <li>Mangez lentement et avec modération</li>
                    <li>Buvez beaucoup d'eau tout au long de la journée</li>
                    <li>Inclure des aliments recommandés dans la Sunna</li>
                    <li>Respectez les horaires de prière dans votre planification des repas</li>
                  </ul>
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

export default Regime;
