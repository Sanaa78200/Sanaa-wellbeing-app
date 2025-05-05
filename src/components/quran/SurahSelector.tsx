
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface SurahSelectorProps {
  surahs: Surah[];
  onSelectSurah: (surahNumber: number) => void;
  currentSurah: number;
}

const SurahSelector = ({ surahs, onSelectSurah, currentSurah }: SurahSelectorProps) => {
  const [showAllSurahs, setShowAllSurahs] = useState(false);
  
  // Afficher soit les 10 premières sourates, soit toutes les sourates
  const displayedSurahs = showAllSurahs ? surahs : surahs.slice(0, 10);
  
  return (
    <div className="space-y-2">
      <ScrollArea className="h-[180px] w-full rounded-md border border-islamic-green/20 bg-white p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {displayedSurahs.map((surah) => (
            <Button
              key={surah.number}
              variant="outline"
              size="sm"
              className={`text-xs justify-start ${currentSurah === surah.number ? 'bg-islamic-cream border-islamic-green text-islamic-green' : ''}`}
              onClick={() => onSelectSurah(surah.number)}
            >
              {surah.number}. {surah.name} ({surah.englishName})
            </Button>
          ))}
        </div>
        
        {!showAllSurahs && surahs.length > 10 && (
          <div className="mt-2 text-center">
            <Button 
              variant="link" 
              size="sm" 
              onClick={() => setShowAllSurahs(true)}
              className="text-islamic-green"
            >
              Voir toutes les sourates
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default SurahSelector;
