import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar, MapPin } from 'lucide-react';
import PrayerLocator from '@/components/prayer/PrayerLocator';
import { Progress } from '@/components/ui/progress';

interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  isNext: boolean;
  timeUntil?: string;
  progressPercent?: number;
}

const Prieres = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [location, setLocation] = useState("Paris, France");
  const [coordinates, setCoordinates] = useState({ latitude: 48.8566, longitude: 2.3522 });

  useEffect(() => {
    fetchPrayerTimes(coordinates.latitude, coordinates.longitude);
    
    // Mettre à jour les horaires toutes les minutes pour le décompte
    const intervalId = setInterval(() => {
      updateTimeUntil();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [coordinates]);

  const fetchPrayerTimes = async (latitude: number, longitude: number) => {
    setIsLoading(true);
    try {
      const date = new Date();
      
      // Format current date
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDate(date.toLocaleDateString('fr-FR', options));
      
      // Fetch prayer times
      const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
      const data = await response.json();
      
      // Fetch Hijri date
      const hijriResponse = await fetch('https://api.aladhan.com/v1/gToH');
      const hijriData = await hijriResponse.json();
      
      if (data.code === 200 && hijriData.code === 200) {
        const timings = data.data.timings;
        const hijri = hijriData.data.hijri;
        
        setHijriDate(`${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`);
        
        const now = new Date();
        const formattedTimes = [
          { name: "Fajr", arabicName: "الفجر", time: timings.Fajr, isNext: false },
          { name: "Dhuhr", arabicName: "الظهر", time: timings.Dhuhr, isNext: false },
          { name: "Asr", arabicName: "العصر", time: timings.Asr, isNext: false },
          { name: "Maghrib", arabicName: "المغرب", time: timings.Maghrib, isNext: false },
          { name: "Isha", arabicName: "العشاء", time: timings.Isha, isNext: false }
        ];
        
        // Determine which prayer is next and calculate time until
        let foundNext = false;
        for (let i = 0; i < formattedTimes.length; i++) {
          const [hours, minutes] = formattedTimes[i].time.split(':').map(Number);
          const prayerTime = new Date();
          prayerTime.setHours(hours, minutes, 0);
          
          if (prayerTime > now && !foundNext) {
            formattedTimes[i].isNext = true;
            foundNext = true;
            
            // Calculate time until next prayer
            const timeUntil = calculateTimeUntil(prayerTime, now);
            formattedTimes[i].timeUntil = timeUntil;
            formattedTimes[i].progressPercent = calculateProgressPercent(now, getPreviousPrayerTime(i, formattedTimes), prayerTime);
          }
        }
        
        // If no next prayer found, then the next prayer is Fajr tomorrow
        if (!foundNext) {
          formattedTimes[0].isNext = true;
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          
          const [hours, minutes] = formattedTimes[0].time.split(':').map(Number);
          const nextFajrTime = new Date();
          nextFajrTime.setDate(nextFajrTime.getDate() + 1);
          nextFajrTime.setHours(hours, minutes, 0);
          
          formattedTimes[0].timeUntil = calculateTimeUntil(nextFajrTime, now);
          formattedTimes[0].progressPercent = calculateProgressPercent(now, timeToPrayerTime(formattedTimes[4].time), nextFajrTime);
        }
        
        setPrayerTimes(formattedTimes);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des horaires de prière:", error);
      // Fallback data if API fails
      setPrayerTimes([
        { name: "Fajr", arabicName: "الفجر", time: "06:15", isNext: true, timeUntil: "6h 30m" },
        { name: "Dhuhr", arabicName: "الظهر", time: "13:30", isNext: false },
        { name: "Asr", arabicName: "العصر", time: "17:00", isNext: false },
        { name: "Maghrib", arabicName: "المغرب", time: "20:15", isNext: false },
        { name: "Isha", arabicName: "العشاء", time: "21:45", isNext: false }
      ]);
      setHijriDate("15 Ramadan 1446 هـ");
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateTimeUntil = () => {
    const now = new Date();
    const updatedTimes = prayerTimes.map(prayer => {
      if (prayer.isNext) {
        const [hours, minutes] = prayer.time.split(':').map(Number);
        let prayerTime = new Date();
        
        // If it's for tomorrow's Fajr
        if (prayer.name === "Fajr" && hours < now.getHours()) {
          prayerTime.setDate(prayerTime.getDate() + 1);
        }
        
        prayerTime.setHours(hours, minutes, 0);
        
        return {
          ...prayer,
          timeUntil: calculateTimeUntil(prayerTime, now),
          progressPercent: calculateProgressPercent(
            now, 
            prayer.name === "Fajr" ? timeToPrayerTime(prayerTimes[4].time) : getPreviousPrayerTime(prayerTimes.findIndex(p => p.isNext), prayerTimes),
            prayerTime
          )
        };
      }
      return prayer;
    });
    
    setPrayerTimes(updatedTimes);
  };

  const getPreviousPrayerTime = (currentIndex: number, times: PrayerTime[]): Date => {
    const now = new Date();
    if (currentIndex <= 0) {
      // If the next prayer is Fajr, the previous one is Isha from yesterday
      const previousDay = new Date();
      previousDay.setDate(previousDay.getDate() - 1);
      const [hours, minutes] = times[times.length - 1].time.split(':').map(Number);
      previousDay.setHours(hours, minutes, 0);
      return previousDay;
    }
    
    // Otherwise, get the previous prayer time
    return timeToPrayerTime(times[currentIndex - 1].time);
  };

  const timeToPrayerTime = (timeString: string): Date => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(hours, minutes, 0);
    return prayerTime;
  };

  const calculateTimeUntil = (target: Date, now: Date): string => {
    const diffMs = target.getTime() - now.getTime();
    if (diffMs < 0) return "Maintenant";
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m`;
  };

  const calculateProgressPercent = (now: Date, start: Date, end: Date): number => {
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    
    if (total <= 0) return 0;
    const percent = (elapsed / total) * 100;
    return Math.min(100, Math.max(0, percent));
  };

  const handleLocationChange = (latitude: number, longitude: number, locationName: string) => {
    setCoordinates({ latitude, longitude });
    setLocation(locationName);
    fetchPrayerTimes(latitude, longitude);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-islamic-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-islamic-green-dark mb-3">Horaires des prières</h1>
            <p className="text-islamic-slate max-w-2xl mx-auto">
              Consultez les horaires précis des cinq prières quotidiennes basés sur votre emplacement.
            </p>
          </div>
          
          <div className="max-w-lg mx-auto mb-8">
            <Card className="islamic-border">
              <CardHeader className="pb-0">
                <CardTitle className="text-islamic-green-dark text-center mb-4">
                  Rechercher un lieu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PrayerLocator onLocationChange={handleLocationChange} />
              </CardContent>
            </Card>
          </div>
          
          <div className="max-w-lg mx-auto">
            <Card className="islamic-border">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-islamic-green" />
                    <CardTitle className="text-islamic-green-dark">Horaires du jour</CardTitle>
                  </div>
                  <div className="flex items-center gap-1 text-islamic-slate text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{location}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4 border-b border-islamic-green/10 pb-3">
                  <div className="text-islamic-slate">
                    <Calendar className="h-4 w-4 inline-block mr-1" />
                    <span>{currentDate}</span>
                  </div>
                  <div className="text-islamic-slate islamic-arabic">
                    {hijriDate}
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-pulse-subtle text-islamic-slate">Chargement des horaires...</div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {prayerTimes.map((prayer, index) => (
                      <div 
                        key={prayer.name}
                        className={`flex flex-col p-4 rounded-lg transition-colors ${
                          prayer.isNext 
                            ? 'bg-islamic-green-light/10 border border-islamic-green/30' 
                            : 'hover:bg-islamic-cream'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${prayer.isNext ? 'text-islamic-green-dark' : 'text-islamic-slate'}`}>
                                {prayer.name}
                              </span>
                              <span className="text-islamic-green islamic-arabic text-sm">
                                {prayer.arabicName}
                              </span>
                            </div>
                          </div>
                          <span className={`text-xl ${prayer.isNext ? 'font-semibold text-islamic-green-dark' : 'text-islamic-slate'}`}>
                            {prayer.time}
                          </span>
                        </div>
                        
                        {prayer.isNext && (
                          <div className="mt-1">
                            <div className="flex justify-between text-xs text-islamic-green mb-1">
                              <span>Prochaine prière</span>
                              <span>Dans {prayer.timeUntil}</span>
                            </div>
                            <Progress 
                              value={prayer.progressPercent} 
                              className="h-1.5 bg-islamic-cream" 
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-6 pt-3 border-t border-islamic-green/10">
                  <blockquote className="text-islamic-slate italic text-sm">
                    "...car la prière demeure, pour les croyants, une prescription à des temps déterminés."
                    <footer className="text-islamic-green text-xs mt-1">— Sourate An-Nisa (4:103)</footer>
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Prieres;
