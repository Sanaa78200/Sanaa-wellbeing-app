
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import SurahSelector from './SurahSelector';
import QuranDisplay from './QuranDisplay';

// Types
interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
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

const QuranWidget = () => {
  // État
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentSurah, setCurrentSurah] = useState(1);
  const [quranData, setQuranData] = useState<QuranData | null>(null);
  const [translationData, setTranslationData] = useState<QuranData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTajweedEnabled, setIsTajweedEnabled] = useState(true);
  const [currentTranslation, setCurrentTranslation] = useState('fr.hamidullah');
  const [currentReciter, setCurrentReciter] = useState('ar.alafasy');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Chargement initial des sourates
  useEffect(() => {
    fetchSurahs();
  }, []);
  
  // Chargement de la sourate sélectionnée
  useEffect(() => {
    if (currentSurah > 0) {
      fetchSurah(currentSurah);
      setIsSearchMode(false);
    }
  }, [currentSurah, currentTranslation]);
  
  // Chargement de la liste des sourates
  const fetchSurahs = async () => {
    try {
      const response = await fetch('https://api.alquran.cloud/v1/surah');
      const data = await response.json();
      
      if (data.code === 200) {
        setSurahs(data.data);
      } else {
        setError('Erreur lors du chargement des sourates');
        toast.error('Erreur lors du chargement des sourates');
      }
    } catch (err) {
      console.error('Erreur lors du chargement des sourates:', err);
      setError('Erreur de connexion');
      toast.error('Erreur de connexion');
    }
  };
  
  // Chargement d'une sourate
  const fetchSurah = async (surahNumber: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [tajweedResponse, translationResponse] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-tajweed`),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${currentTranslation}`)
      ]);
      
      const tajweedData = await tajweedResponse.json();
      const translationData = await translationResponse.json();
      
      if (tajweedData.code === 200 && translationData.code === 200) {
        setQuranData(tajweedData.data);
        setTranslationData(translationData.data);
      } else {
        setError('Erreur lors du chargement de la sourate');
        toast.error('Erreur lors du chargement de la sourate');
      }
    } catch (err) {
      console.error('Erreur lors du chargement de la sourate:', err);
      setError('Erreur de connexion');
      toast.error('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Recherche
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.warning('Veuillez entrer un terme de recherche');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/search/${searchQuery}/${currentTranslation}`);
      const data = await response.json();
      
      if (data.code === 200) {
        setSearchResults(data.data);
        setIsSearchMode(true);
        
        if (data.data.count === 0) {
          toast.info('Aucun résultat trouvé');
        } else {
          toast.success(`${data.data.count} résultat(s) trouvé(s)`);
        }
      } else {
        setError('Erreur lors de la recherche');
        toast.error('Erreur lors de la recherche');
      }
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setError('Erreur de connexion');
      toast.error('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Lecture audio
  const togglePlayAudio = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
      
      audioRef.current.onerror = () => {
        toast.error('Erreur lors de la lecture audio');
        setIsPlaying(false);
      };
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${currentSurah}/${currentReciter}`);
        const data = await response.json();
        
        if (data.code === 200) {
          const audioUrl = data.data.ayahs[0].audio;
          audioRef.current.src = audioUrl.replace('http:', 'https:');
          await audioRef.current.play();
          setIsPlaying(true);
        } else {
          toast.error('Erreur lors du chargement audio');
        }
      } catch (err) {
        console.error('Erreur lors du chargement audio:', err);
        toast.error('Erreur de connexion');
      }
    }
  };
  
  // Navigation
  const goToPreviousSurah = () => {
    if (currentSurah > 1) {
      setCurrentSurah(currentSurah - 1);
    }
  };
  
  const goToNextSurah = () => {
    if (currentSurah < 114) {
      setCurrentSurah(currentSurah + 1);
    }
  };
  
  // Affichage du contenu principal
  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-12 italic text-islamic-slate">Chargement en cours...</div>;
    }
    
    if (error) {
      return <div className="text-center py-12 text-red-500">{error}</div>;
    }
    
    if (isSearchMode && searchResults) {
      return (
        <QuranDisplay 
          quranData={null} 
          translationData={null} 
          searchResults={searchResults} 
          isTajweedEnabled={isTajweedEnabled}
          onGoToSurah={setCurrentSurah}
        />
      );
    }
    
    if (quranData && translationData) {
      return (
        <QuranDisplay 
          quranData={quranData} 
          translationData={translationData} 
          searchResults={null}
          isTajweedEnabled={isTajweedEnabled}
          onGoToSurah={setCurrentSurah}
        />
      );
    }
    
    return null;
  };
  
  return (
    <Card className="w-full islamic-border">
      <CardHeader className="bg-islamic-green text-white flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <CardTitle>Le Saint Coran</CardTitle>
        <div className="text-sm">
          {quranData && !isSearchMode && (
            <span>
              Sourate {quranData.number}: {quranData.name} ({quranData.englishName}) - {quranData.ayahs.length} versets
            </span>
          )}
          {isSearchMode && searchResults && (
            <span>Résultats de recherche: {searchResults.count} trouvé(s)</span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Paramètres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-islamic-cream/50 p-4 rounded-md">
          <div className="space-y-2">
            <Label htmlFor="translation-select">Traduction :</Label>
            <Select 
              value={currentTranslation} 
              onValueChange={setCurrentTranslation}
            >
              <SelectTrigger id="translation-select">
                <SelectValue placeholder="Choisir une traduction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr.hamidullah">Hamidullah (Français)</SelectItem>
                <SelectItem value="en.sahih">Sahih International (Anglais)</SelectItem>
                <SelectItem value="ar.muyassar">تفسير الميسر (Arabe)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reciter-select">Récitateur :</Label>
            <Select 
              value={currentReciter} 
              onValueChange={setCurrentReciter}
            >
              <SelectTrigger id="reciter-select">
                <SelectValue placeholder="Choisir un récitateur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar.alafasy">Mishary Rashid Alafasy</SelectItem>
                <SelectItem value="ar.abdurrahmaansudais">Abdurrahmaan As-Sudais</SelectItem>
                <SelectItem value="ar.hudhaify">Ali Al-Hudhaify</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="tajweed-checkbox" 
              checked={isTajweedEnabled}
              onCheckedChange={(checked) => setIsTajweedEnabled(checked === true)}
            />
            <Label htmlFor="tajweed-checkbox">Afficher le tajwid</Label>
          </div>
        </div>
        
        {/* Recherche */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <Input 
              placeholder="Rechercher un mot ou un verset..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} className="bg-islamic-accent hover:bg-islamic-accent/80">
            <Search className="h-4 w-4 mr-2" />
            Rechercher
          </Button>
        </div>
        
        {/* Sélecteur de sourates */}
        <SurahSelector
          surahs={surahs}
          onSelectSurah={setCurrentSurah}
          currentSurah={currentSurah}
        />
        
        {/* Affichage du Coran */}
        <div className={`bg-white border border-islamic-green/20 rounded-md p-4 ${isTajweedEnabled ? 'tajweed-enabled' : ''}`}>
          {renderContent()}
        </div>
        
        {/* Contrôles de navigation */}
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
            {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isPlaying ? 'Arrêter la récitation' : 'Écouter la récitation'}
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
      </CardContent>
    </Card>
  );
};

export default QuranWidget;
