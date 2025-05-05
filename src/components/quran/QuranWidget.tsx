
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useQuranData } from './hooks/useQuranData';
import { useQuranAudio } from './hooks/useQuranAudio';
import { useQuranSearch } from './hooks/useQuranSearch';

import SurahSelector from './SurahSelector';
import QuranDisplay from './QuranDisplay';
import QuranSettings from './QuranSettings';
import QuranSearch from './QuranSearch';
import QuranNavigation from './QuranNavigation';
import RecipeSearch from '../nutrition/RecipeSearch';

const QuranWidget = () => {
  // État UI
  const [isTajweedEnabled, setIsTajweedEnabled] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false); // Désactivé par défaut
  
  // Hooks personnalisés
  const quranData = useQuranData();
  const quranAudio = useQuranAudio(quranData.currentSurah);
  const quranSearch = useQuranSearch(quranData.currentTranslation);

  // Scroll to active ayah when playing
  useEffect(() => {
    if (quranAudio.isPlaying && quranAudio.currentAyah > 0 && quranData.quranData) {
      const ayahElements = document.querySelectorAll('.ayah-element');
      if (ayahElements[quranAudio.currentAyah]) {
        ayahElements[quranAudio.currentAyah].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [quranAudio.currentAyah, quranAudio.isPlaying]);
  
  // Affichage du contenu principal
  const renderContent = () => {
    if (quranData.isLoading || quranSearch.isLoading) {
      return <div className="text-center py-12 italic text-islamic-slate">Chargement en cours...</div>;
    }
    
    if (quranData.error) {
      return <div className="text-center py-12 text-red-500">{quranData.error}</div>;
    }
    
    if (quranSearch.isSearchMode && quranSearch.searchResults) {
      return (
        <QuranDisplay 
          quranData={null} 
          translationData={null} 
          searchResults={quranSearch.searchResults} 
          isTajweedEnabled={isTajweedEnabled}
          showTranslation={showTranslation}
          onGoToSurah={(surahNumber) => {
            quranData.setCurrentSurah(surahNumber);
            quranSearch.exitSearchMode();
          }}
        />
      );
    }
    
    if (quranData.quranData && quranData.translationData) {
      return (
        <QuranDisplay 
          quranData={quranData.quranData} 
          translationData={quranData.translationData} 
          searchResults={null}
          isTajweedEnabled={isTajweedEnabled}
          showTranslation={showTranslation}
          onGoToSurah={quranData.setCurrentSurah}
          currentAyah={quranAudio.isPlaying ? quranAudio.currentAyah : -1}
          isPlaying={quranAudio.isPlaying}
          onNavigateAyah={quranAudio.navigateAyah}
        />
      );
    }
    
    return null;
  };
  
  return (
    <>
      <RecipeSearch />
      
      <Card className="w-full islamic-border" id="top">
        <CardHeader className="bg-islamic-green text-white flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <CardTitle>Le Saint Coran - Récitation Audio</CardTitle>
          <div className="text-sm">
            {quranData.quranData && !quranSearch.isSearchMode && (
              <span>
                Sourate {quranData.quranData.number}: {quranData.quranData.name} ({quranData.quranData.englishName}) - {quranData.quranData.ayahs.length} versets
              </span>
            )}
            {quranSearch.isSearchMode && quranSearch.searchResults && (
              <span>Résultats de recherche: {quranSearch.searchResults.count} trouvé(s)</span>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Paramètres */}
          <QuranSettings 
            currentTranslation={quranData.currentTranslation}
            setCurrentTranslation={quranData.setCurrentTranslation}
            currentReciter={quranAudio.currentReciter}
            setCurrentReciter={quranAudio.setCurrentReciter}
            isTajweedEnabled={isTajweedEnabled}
            setIsTajweedEnabled={setIsTajweedEnabled}
            showTranslation={showTranslation}
            setShowTranslation={setShowTranslation}
          />
          
          {/* Sélecteur de sourates */}
          <SurahSelector
            surahs={quranData.surahs}
            onSelectSurah={(surahNumber) => {
              quranData.setCurrentSurah(surahNumber);
              quranSearch.exitSearchMode();
            }}
            currentSurah={quranData.currentSurah}
          />
          
          {/* Affichage du Coran */}
          <div className="bg-white border border-islamic-green/20 rounded-md p-4">
            {renderContent()}
          </div>
          
          {/* Contrôles de navigation */}
          <QuranNavigation 
            currentSurah={quranData.currentSurah}
            goToPreviousSurah={quranData.goToPreviousSurah}
            goToNextSurah={quranData.goToNextSurah}
            togglePlayAudio={quranAudio.togglePlayAudio}
            isPlaying={quranAudio.isPlaying}
            isSearchMode={quranSearch.isSearchMode}
            isAudioLoading={quranAudio.isAudioLoading}
            isLoading={quranData.isLoading}
            currentAyah={quranAudio.currentAyah}
            totalAyahs={quranAudio.totalAyahs}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default QuranWidget;
