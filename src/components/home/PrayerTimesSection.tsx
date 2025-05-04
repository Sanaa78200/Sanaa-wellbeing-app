
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface PrayerTime {
  name: string;
  time: string;
  arabicName: string;
}

const PrayerTimesSection = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setIsLoading(true);
      try {
        // Pour demo purposes nous utilisons Paris coordinates
        const latitude = 48.8566;
        const longitude = 2.3522;
        const date = new Date();
        
        // Format current date
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(date.toLocaleDateString('fr-FR', options));
        
        const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
        const data = await response.json();
        
        if (data.code === 200) {
          const timings = data.data.timings;
          const formattedTimes = [
            { name: "Fajr", arabicName: "الفجر", time: timings.Fajr },
            { name: "Dhuhr", arabicName: "الظهر", time: timings.Dhuhr },
            { name: "Asr", arabicName: "العصر", time: timings.Asr },
            { name: "Maghrib", arabicName: "المغرب", time: timings.Maghrib },
            { name: "Isha", arabicName: "العشاء", time: timings.Isha }
          ];
          
          setPrayerTimes(formattedTimes);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des horaires de prière:", error);
        // Fallback data if API fails
        setPrayerTimes([
          { name: "Fajr", arabicName: "الفجر", time: "06:15" },
          { name: "Dhuhr", arabicName: "الظهر", time: "13:30" },
          { name: "Asr", arabicName: "العصر", time: "17:00" },
          { name: "Maghrib", arabicName: "المغرب", time: "20:15" },
          { name: "Isha", arabicName: "العشاء", time: "21:45" }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPrayerTimes();
  }, []);
  
  // Function to determine if a prayer time is the next one
  const isNextPrayer = (time: string): boolean => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(hours, minutes, 0);
    
    return prayerTime > now;
  };

  return (
    <section className="py-16 bg-islamic-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="islamic-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-islamic-green-dark flex items-center justify-center gap-2">
                <Clock className="h-5 w-5" />
                Horaires des prières
              </CardTitle>
              <p className="text-center text-islamic-slate text-sm">{currentDate}</p>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse-subtle text-islamic-slate">Chargement des horaires...</div>
                </div>
              ) : (
                <div className="space-y-2">
                  {prayerTimes.map((prayer, index) => {
                    const isNext = isNextPrayer(prayer.time);
                    
                    return (
                      <div 
                        key={prayer.name}
                        className={`islamic-prayer-time ${isNext ? 'bg-islamic-cream border border-islamic-green/20' : ''}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-islamic-green-dark font-medium">
                            {prayer.name}
                          </span>
                          <span className="text-islamic-slate text-sm islamic-arabic">
                            {prayer.arabicName}
                          </span>
                        </div>
                        <span className={`${isNext ? 'text-islamic-green-dark font-semibold' : 'text-islamic-slate'}`}>
                          {prayer.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PrayerTimesSection;
