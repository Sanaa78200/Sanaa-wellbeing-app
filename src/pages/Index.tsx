
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PrayerTimesSection from '@/components/home/PrayerTimesSection';
import SunnaFoodsSection from '@/components/home/SunnaFoodsSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <PrayerTimesSection />
        <SunnaFoodsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
