
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Play, Pause, Volume } from 'lucide-react';

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
  
  // Afficher l'interface de lecture audio avec la progression
  if (quranData && translationData) {
    // Calculer le pourcentage de progression
    const totalAyahs = quranData.ayahs.length;
    const progressPercentage = currentAyah >= 0 ? ((currentAyah + 1) / totalAyahs) * 100 : 0;
    
    return (
      <div className="space-y-6">
        {/* Section du titre de la sourate */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-arabic font-bold text-islamic-green-dark mb-1">
            {quranData.name}
          </h2>
          <p className="text-islamic-slate">
            {quranData.englishName} - {quranData.englishNameTranslation}
          </p>
        </div>
        
        {/* Section de lecture audio */}
        <div className="bg-islamic-cream rounded-lg p-4 shadow-sm">
          <div className="text-center py-2 mb-3">
            {currentAyah >= 0 ? (
              <div className="text-xl font-semibold text-islamic-green-dark">
                Lecture en cours: Verset {currentAyah + 1} / {totalAyahs}
              </div>
            ) : (
              <div className="text-islamic-slate">
                Appuyez sur le bouton "Écouter la récitation" pour commencer la lecture audio
              </div>
            )}
          </div>
          
          {/* Barre de progression */}
          {currentAyah >= 0 && (
            <div className="space-y-3">
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-islamic-slate">
                <span>Verset {currentAyah + 1}</span>
                <span>{totalAyahs} versets</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Icône décorative */}
        <div className="flex justify-center my-4">
          <Volume className="text-islamic-green-dark h-16 w-16 opacity-20" />
        </div>
      </div>
    );
  }
  
  return null;
};

export default QuranDisplay;
