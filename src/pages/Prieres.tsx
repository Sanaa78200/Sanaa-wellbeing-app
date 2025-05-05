
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PrayerLocator from '@/components/prayer/PrayerLocator';
import { Progress } from '@/components/ui/progress';

// Interface mise à jour pour inclure timeUntil et progressPercent
interface PrayerTime {
  name: string;
  arabicName: string;
  time: any;
  isNext: boolean;
  timeUntil?: string; // Propriété ajoutée
  progressPercent?: number; // Propriété ajoutée
}

const Prieres = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [hijriDate, setHijriDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);

  useEffect(() => {
    if (location) {
      fetchPrayerTimes();
    }
  }, [location]);

  const fetchPrayerTimes = async () => {
    if (!location) return;

    setIsLoading(true);
    setError(null);

    try {
      // Simulation de chargement pour l'exemple
      // Dans une implémentation réelle, vous feriez un appel API ici
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Pour l'exemple, nous utilisons des données statiques
      // Dans une implémentation réelle, vous utiliseriez la réponse de l'API
      setPrayerTimes([
        { name: "Fajr", arabicName: "الفجر", time: "04:30", isNext: false, timeUntil: "2h 15min", progressPercent: 75 },
        { name: "Dhuhr", arabicName: "الظهر", time: "12:30", isNext: true, timeUntil: "4h 45min", progressPercent: 40 },
        { name: "Asr", arabicName: "العصر", time: "16:15", isNext: false, timeUntil: "8h 30min", progressPercent: 10 },
        { name: "Maghrib", arabicName: "المغرب", time: "20:15", isNext: false, timeUntil: "12h 30min", progressPercent: 0 },
        { name: "Isha", arabicName: "العشاء", time: "21:45", isNext: false, timeUntil: "14h", progressPercent: 0 }
      ]);
      setHijriDate("15 Ramadan 1446 هـ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationChange = (newLocation: { lat: number; lng: number; address: string }) => {
    setLocation(newLocation);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-islamic-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-islamic-green-dark mb-3">Horaires de Prière</h1>
            <p className="text-islamic-slate max-w-2xl mx-auto">
              Consultez les horaires de prière précis pour votre emplacement actuel ou recherchez par ville.
            </p>
            {hijriDate && (
              <p className="mt-2 font-arabic text-xl text-islamic-gold">{hijriDate}</p>
            )}
          </div>

          <PrayerLocator onLocationChange={handleLocationChange} />

          {isLoading ? (
            <div className="text-center py-10">
              <div className="spinner"></div>
              <p className="mt-3">Chargement des horaires de prière...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">
              <p>{error}</p>
              <button
                className="mt-3 px-4 py-2 bg-islamic-green text-white rounded-lg hover:bg-islamic-green-dark transition-colors"
                onClick={fetchPrayerTimes}
              >
                Réessayer
              </button>
            </div>
          ) : prayerTimes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {prayerTimes.map((prayer, index) => (
                <div
                  key={index}
                  className={`islamic-card p-6 flex flex-col ${
                    prayer.isNext ? "border-islamic-gold border-2" : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold">{prayer.name}</h3>
                    <span className="font-arabic text-xl">{prayer.arabicName}</span>
                  </div>
                  <div className="text-2xl font-bold text-center py-3">{prayer.time}</div>
                  
                  {prayer.isNext && (
                    <div className="mt-2">
                      <p className="text-islamic-green-dark mb-1">Prochaine prière dans {prayer.timeUntil}</p>
                      <Progress value={prayer.progressPercent} className="h-2" />
                    </div>
                  )}
                  
                  {!prayer.isNext && prayer.timeUntil && (
                    <p className="text-islamic-slate text-sm mt-2">Dans {prayer.timeUntil}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {location && (
            <div className="text-center">
              <p className="text-islamic-slate">
                Horaires pour : <span className="font-semibold">{location.address}</span>
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Prieres;
