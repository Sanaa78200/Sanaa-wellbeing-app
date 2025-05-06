
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MeccaMadinaLive from '@/components/prayer/MeccaMadinaLive';

const MeccaMadina = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-islamic-pattern">
        <MeccaMadinaLive />
      </main>
      <Footer />
    </div>
  );
};

export default MeccaMadina;
