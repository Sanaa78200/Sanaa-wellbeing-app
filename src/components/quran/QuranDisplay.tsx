
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
  // Fonction pour corriger le texte arabe si nécessaire
  useEffect(() => {
    if (quranData) {
      const arabicElements = document.querySelectorAll('.arabic-text');
      arabicElements.forEach(element => {
        // Cette fonction est vide pour l'instant, mais pourrait être utilisée 
        // pour appliquer des corrections si nécessaire dans le futur
      });
    }
  }, [quranData]);
  
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
      <div className="space-y-6">
        {quranData.ayahs.map((ayah, index) => (
          <div 
            key={ayah.number} 
            className={`pb-4 mb-4 border-b border-islamic-green/10 last:border-none last:mb-0 last:pb-0 ${
              currentAyah === index ? 'bg-islamic-cream rounded-md p-2' : ''
            }`}
          >
            <div className="flex gap-4 items-start ayah-element">
              <span className={`bg-islamic-green text-white flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-1 ${
                currentAyah === index ? 'animate-pulse' : ''
              }`}>
                {ayah.numberInSurah}
              </span>
              <div className="w-full">
                <div 
                  className={`text-3xl mb-3 arabic-text leading-loose tracking-wide ${isTajweedEnabled ? '' : 'text-black'}`}
                  dangerouslySetInnerHTML={{ __html: ayah.text }}
                  dir="rtl"
                  id={`ayah-${quranData.number}-${ayah.numberInSurah}`}
                />
                {showTranslation && translationData.ayahs[index] && (
                  <div className="text-islamic-slate mt-2 text-base">
                    {translationData.ayahs[index].text}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Pagination pour les sourates longues */}
        {quranData.ayahs.length > 20 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink 
                  href="#top" 
                  className="bg-islamic-green text-white hover:bg-islamic-green-dark"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Retour en haut
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    );
  }
  
  return null;
};

export default QuranDisplay;
