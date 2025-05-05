
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import QuranWidget from '@/components/quran/QuranWidget';

const Coran = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-islamic-pattern">
        <div className="container mx-auto px-4 py-8">
          <QuranWidget />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Coran;
