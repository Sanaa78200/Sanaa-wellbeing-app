
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

export const useQuranAudio = (currentSurah: number) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [currentReciter, setCurrentReciter] = useState('ar.alafasy');
  const [currentAyah, setCurrentAyah] = useState(0);
  const [totalAyahs, setTotalAyahs] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlsRef = useRef<string[]>([]);
  const currentSurahRef = useRef<number>(currentSurah);
  
  // Mettre à jour la référence quand la sourate change
  useEffect(() => {
    currentSurahRef.current = currentSurah;
  }, [currentSurah]);
  
  // Charger les URLs audio quand la sourate ou le récitant change
  useEffect(() => {
    if (isPlaying) {
      stopAudio();
    }
    
    setCurrentAyah(0);
    audioUrlsRef.current = [];
  }, [currentSurah, currentReciter]);
  
  // Fonction pour charger les URLs audio d'une sourate
  const loadAudioUrls = async (surahNumber: number) => {
    try {
      setIsAudioLoading(true);
      
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${currentReciter}`);
      const data = await response.json();
      
      if (data.code === 200 && data.data && data.data.ayahs) {
        setTotalAyahs(data.data.ayahs.length);
        
        // Stocker les URLs audio
        const urls = data.data.ayahs.map((ayah: any) => ayah.audio);
        audioUrlsRef.current = urls;
        
        return urls;
      }
      
      throw new Error('Failed to load audio URLs');
    } catch (err) {
      console.error('Error loading audio URLs:', err);
      toast.error("Erreur lors du chargement audio. Veuillez réessayer.");
      return [];
    } finally {
      setIsAudioLoading(false);
    }
  };
  
  // Jouer le verset suivant avec continuité automatique
  const playNextAyah = () => {
    if (currentAyah < audioUrlsRef.current.length - 1) {
      setCurrentAyah(prevAyah => prevAyah + 1);
      playAyah(currentAyah + 1);
    } else if (currentSurahRef.current < 114) {
      // Passer automatiquement à la sourate suivante
      const nextSurah = currentSurahRef.current + 1;
      loadNextSurah(nextSurah);
    } else {
      // C'est la fin de la dernière sourate
      stopAudio();
      toast.info("Vous avez terminé toutes les sourates disponibles");
    }
  };
  
  // Charger et commencer à lire la sourate suivante
  const loadNextSurah = async (surahNumber: number) => {
    try {
      // Charger la sourate suivante
      const urls = await loadAudioUrls(surahNumber);
      if (urls.length > 0) {
        // Mettre à jour la référence externe de la sourate (sera utilisée par le composant parent)
        currentSurahRef.current = surahNumber;
        // Réinitialiser l'index du verset
        setCurrentAyah(0);
        // Commencer la lecture du premier verset
        playAyah(0);
        // Notification pour informer l'utilisateur
        toast.success(`Passage à la sourate ${surahNumber}`);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de la sourate suivante:", error);
      stopAudio();
    }
  };
  
  // Jouer un verset spécifique
  const playAyah = (ayahIndex: number) => {
    if (audioRef.current) {
      if (ayahIndex >= 0 && ayahIndex < audioUrlsRef.current.length) {
        audioRef.current.src = audioUrlsRef.current[ayahIndex];
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
          toast.error("Erreur lors de la lecture audio");
        });
      }
    }
  };
  
  // Arrêter la lecture audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };
  
  // Basculer la lecture audio
  const togglePlayAudio = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Configurer l'événement de fin de lecture pour passer au verset suivant
      audioRef.current.addEventListener('ended', playNextAyah);
    }
    
    if (isPlaying) {
      stopAudio();
    } else {
      setIsAudioLoading(true);
      
      try {
        // Si les URLs audio n'ont pas encore été chargées
        if (audioUrlsRef.current.length === 0) {
          const urls = await loadAudioUrls(currentSurah);
          if (urls.length === 0) {
            throw new Error('No audio URLs loaded');
          }
        }
        
        // Commencer la lecture depuis le verset actuel
        playAyah(currentAyah);
        setIsPlaying(true);
      } catch (err) {
        console.error('Error toggling audio:', err);
        toast.error("Erreur lors de la lecture. Veuillez réessayer.");
      } finally {
        setIsAudioLoading(false);
      }
    }
  };
  
  // Nettoyer les ressources audio à la suppression du composant
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', playNextAyah);
      }
    };
  }, []);
  
  return {
    isPlaying,
    isAudioLoading,
    currentReciter,
    setCurrentReciter,
    currentAyah,
    totalAyahs,
    togglePlayAudio,
    // Ajouter la méthode pour passer à la sourate suivante manuellement
    loadNextSurah
  };
};
