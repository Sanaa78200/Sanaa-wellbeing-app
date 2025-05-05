
import React from 'react';
import { Button } from '@/components/ui/button';

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
}

interface QuranData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahs: Ayah[];
}

interface SearchResult {
  count: number;
  matches: {
    numberInSurah: number;
    text: string;
    surah: {
      number: number;
      name: string;
      englishName: string;
    };
  }[];
}

interface QuranDisplayProps {
  quranData: QuranData | null;
  translationData: QuranData | null;
  searchResults: SearchResult | null;
  isTajweedEnabled: boolean;
  onGoToSurah: (surahNumber: number) => void;
}

const QuranDisplay = ({
  quranData,
  translationData,
  searchResults,
  isTajweedEnabled,
  onGoToSurah
}: QuranDisplayProps) => {
  // Afficher les résultats de recherche
  if (searchResults) {
    if (searchResults.count === 0) {
      return <div className="text-center py-8">Aucun résultat trouvé.</div>;
    }
    
    return (
      <div className="space-y-6">
        {searchResults.matches.map((match, index) => (
          <div key={index} className="border-b border-islamic-green/10 pb-4 mb-4 last:border-none last:mb-0 last:pb-0">
            <div className="font-semibold mb-2 text-islamic-green-dark">
              Sourate {match.surah.number}: {match.surah.name} ({match.surah.englishName}) - Verset {match.numberInSurah}
            </div>
            <div className="text-islamic-slate mb-3">{match.text}</div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onGoToSurah(match.surah.number)}
              className="text-islamic-green border-islamic-green hover:bg-islamic-cream"
            >
              Voir le verset complet
            </Button>
          </div>
        ))}
      </div>
    );
  }
  
  // Afficher les versets du Coran
  if (quranData && translationData) {
    return (
      <div className="space-y-4">
        {quranData.ayahs.map((ayah, index) => (
          <div key={ayah.number} className="pb-3 mb-3 border-b border-islamic-green/10 last:border-none last:mb-0 last:pb-0">
            <div className="flex gap-3">
              <span className="bg-islamic-green text-white flex items-center justify-center w-8 h-8 rounded-full shrink-0">
                {ayah.numberInSurah}
              </span>
              <div>
                <div 
                  className={`text-xl mb-2 font-arabic text-right leading-loose ${isTajweedEnabled ? '' : 'text-black'}`}
                  dangerouslySetInnerHTML={{ __html: ayah.text }}
                  dir="rtl"
                />
                {translationData.ayahs[index] && (
                  <div className="text-islamic-slate text-sm">
                    {translationData.ayahs[index].text}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return null;
};

export default QuranDisplay;
