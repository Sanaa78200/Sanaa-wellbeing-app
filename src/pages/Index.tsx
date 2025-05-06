
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PrayerTimesSection from '@/components/home/PrayerTimesSection';
import SunnaFoodsSection from '@/components/home/SunnaFoodsSection';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Clock, Calendar, Activity, User } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Accès rapide */}
        <section className="py-8 bg-islamic-pattern">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-islamic-green text-center mb-6">Accès rapide</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Link to="/coran" className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                <Book className="h-10 w-10 text-islamic-green mb-2" />
                <span className="text-islamic-slate font-medium text-center">Le Saint Coran</span>
              </Link>
              <Link to="/prieres" className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                <Clock className="h-10 w-10 text-islamic-green mb-2" />
                <span className="text-islamic-slate font-medium text-center">Horaires de prières</span>
              </Link>
              <Link to="/ramadan" className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                <Calendar className="h-10 w-10 text-islamic-green mb-2" />
                <span className="text-islamic-slate font-medium text-center">Mode Ramadan</span>
              </Link>
              <Link to="/nutrition-regime" className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                <Activity className="h-10 w-10 text-islamic-green mb-2" />
                <span className="text-islamic-slate font-medium text-center">Nutrition & Régime</span>
              </Link>
              <Link to="/profil" className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                <User className="h-10 w-10 text-islamic-green mb-2" />
                <span className="text-islamic-slate font-medium text-center">Mon Profil</span>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Vue directe de Madinah */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-islamic-green text-center mb-6">Vue directe de Madinah</h2>
            <div className="flex justify-center">
              <Card className="w-full max-w-3xl overflow-hidden">
                <CardContent className="p-0">
                  <iframe 
                    src="https://makkahlive.net/medinah.aspx" 
                    title="Madinah Live" 
                    width="100%" 
                    height="315" 
                    frameBorder="0" 
                    allowFullScreen
                    className="w-full"
                  ></iframe>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-4">
              <Link to="/coran" className="inline-flex items-center text-islamic-green hover:underline">
                <span>Consulter le Coran</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>
        
        <FeaturesSection />
        <PrayerTimesSection />
        <SunnaFoodsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
