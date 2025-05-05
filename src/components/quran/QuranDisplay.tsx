
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

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
  showTranslation: boolean;
  onGoToSurah: (surahNumber: number) => void;
  currentAyah?: number;
}

const QuranDisplay = ({
  quranData,
  translationData,
  searchResults,
  isTajweedEnabled,
  showTranslation,
  onGoToSurah,
  currentAyah = -1
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
  
  // Afficher uniquement l'indicateur de verset actuel pour l'audio
  if (quranData && translationData) {
    return (
      <div className="space-y-6">
        <div className="text-center py-4 text-islamic-green-dark">
          {currentAyah >= 0 && (
            <div className="text-xl font-semibold">
              Lecture en cours: Verset {currentAyah + 1} / {quranData.ayahs.length}
            </div>
          )}
          {currentAyah < 0 && (
            <div className="text-islamic-slate">
              Appuyez sur le bouton "Écouter la récitation" pour commencer la lecture audio
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return null;
};

export default QuranDisplay;
