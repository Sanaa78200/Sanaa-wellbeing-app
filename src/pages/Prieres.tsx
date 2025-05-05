
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
  timeUntil?: string;
  progressPercent?: number;
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
      const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${location.lat}&longitude=${location.lng}&method=2`);
      const data = await response.json();
      
      if (data.code === 200) {
        const timings = data.data.timings;
        const now = new Date();
        
        // Extraire la date hijri
        const hijri = data.data.date.hijri;
        setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year} هـ`);
        
        // Déterminer quelle est la prochaine prière et calculer le temps restant
        const prayerList: PrayerTime[] = [];
        const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
        const arabicNames = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];
        
        // Trouver la prière actuelle et la prochaine
        let nextPrayerIndex = -1;
        for (let i = 0; i < prayerNames.length; i++) {
          const prayerTime = timings[prayerNames[i]];
          const [hours, minutes] = prayerTime.split(':').map(Number);
          const prayerDate = new Date();
          prayerDate.setHours(hours, minutes, 0);
          
          if (prayerDate > now) {
            nextPrayerIndex = i;
            break;
          }
        }
        
        // Si aucune prière trouvée pour aujourd'hui, la prochaine est Fajr demain
        if (nextPrayerIndex === -1) nextPrayerIndex = 0;
        
        // Calculer les temps et pourcentages pour chaque prière
        for (let i = 0; i < prayerNames.length; i++) {
          const prayerName = prayerNames[i];
          const prayerTime = timings[prayerName];
          const [hours, minutes] = prayerTime.split(':').map(Number);
          
          const prayerDate = new Date();
          prayerDate.setHours(hours, minutes, 0);
          
          const isNext = i === nextPrayerIndex;
          
          // Calculer le temps restant pour la prochaine prière
          let timeUntil = '';
          let progressPercent = 0;
          
          if (isNext) {
            const diffMs = prayerDate.getTime() - now.getTime();
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            
            timeUntil = `${diffHours}h ${diffMinutes}min`;
            
            // Si c'est Fajr et nous sommes après Isha, calculer le temps depuis Isha
            if (i === 0 && prayerNames.length > 0) {
              const previousPrayerTime = timings[prayerNames[prayerNames.length - 1]];
              const [prevHours, prevMinutes] = previousPrayerTime.split(':').map(Number);
              
              const prevPrayerDate = new Date();
              prevPrayerDate.setHours(prevHours, prevMinutes, 0);
              
              if (prevPrayerDate > now) prevPrayerDate.setDate(prevPrayerDate.getDate() - 1);
              
              const totalDiffMs = prayerDate.getTime() - prevPrayerDate.getTime();
              const elapsedDiffMs = now.getTime() - prevPrayerDate.getTime();
              
              progressPercent = Math.min(100, (elapsedDiffMs / totalDiffMs) * 100);
            } else if (i > 0) {
              // Pour les autres prières, calculer depuis la prière précédente
              const previousPrayerTime = timings[prayerNames[i-1]];
              const [prevHours, prevMinutes] = previousPrayerTime.split(':').map(Number);
              
              const prevPrayerDate = new Date();
              prevPrayerDate.setHours(prevHours, prevMinutes, 0);
              
              const totalDiffMs = prayerDate.getTime() - prevPrayerDate.getTime();
              const elapsedDiffMs = now.getTime() - prevPrayerDate.getTime();
              
              progressPercent = Math.min(100, (elapsedDiffMs / totalDiffMs) * 100);
            }
          } else {
            // Pour les autres prières, calculer simplement le temps jusqu'à elles
            const diffMs = prayerDate.getTime() - now.getTime();
            
            // Si la prière est déjà passée aujourd'hui, ajouter 24h
            if (diffMs < 0) {
              const tomorrow = new Date(now);
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(hours, minutes, 0);
              
              const tomorrowDiffMs = tomorrow.getTime() - now.getTime();
              const diffHours = Math.floor(tomorrowDiffMs / (1000 * 60 * 60));
              const diffMinutes = Math.floor((tomorrowDiffMs % (1000 * 60 * 60)) / (1000 * 60));
              
              timeUntil = `${diffHours}h ${diffMinutes}min (demain)`;
            } else {
              const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
              const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
              
              timeUntil = `${diffHours}h ${diffMinutes}min`;
            }
          }
          
          prayerList.push({
            name: prayerName,
            arabicName: arabicNames[i],
            time: prayerTime,
            isNext,
            timeUntil,
            progressPercent
          });
        }
        
        setPrayerTimes(prayerList);
      } else {
        setError("Erreur lors de la récupération des horaires de prière");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des horaires de prière:", error);
      setError("Impossible de récupérer les horaires de prière. Veuillez réessayer plus tard.");
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

          <div className="max-w-md mx-auto mb-8">
            <PrayerLocator onLocationChange={handleLocationChange} />
          </div>

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
                  
                  {prayer.isNext && prayer.timeUntil && prayer.progressPercent !== undefined && (
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
