
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface QuranNavigationProps {
  currentSurah: number;
  goToPreviousSurah: () => void;
  goToNextSurah: () => void;
  togglePlayAudio: () => void;
  isPlaying: boolean;
  isSearchMode: boolean;
  isAudioLoading: boolean;
  isLoading: boolean;
}

const QuranNavigation = ({
  currentSurah,
  goToPreviousSurah,
  goToNextSurah,
  togglePlayAudio,
  isPlaying,
  isSearchMode,
  isAudioLoading,
  isLoading
}: QuranNavigationProps) => {
  return (
    <div className="flex flex-wrap justify-between gap-2">
      <Button 
        onClick={goToPreviousSurah} 
        disabled={currentSurah <= 1 || isSearchMode} 
        className="bg-islamic-green hover:bg-islamic-green-dark"
        variant="default"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Sourate précédente
      </Button>
      
      <Button 
        onClick={togglePlayAudio}
        disabled={isLoading || isSearchMode}
        className="bg-islamic-green hover:bg-islamic-green-dark"
        variant="default"
      >
        {isAudioLoading ? (
          <span className="flex items-center">
            <span className="h-4 w-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
            Chargement...
          </span>
        ) : (
          <>
            {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isPlaying ? 'Arrêter la récitation' : 'Écouter la récitation'}
          </>
        )}
      </Button>
      
      <Button 
        onClick={goToNextSurah} 
        disabled={currentSurah >= 114 || isSearchMode} 
        className="bg-islamic-green hover:bg-islamic-green-dark"
        variant="default"
      >
        Sourate suivante
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default QuranNavigation;
