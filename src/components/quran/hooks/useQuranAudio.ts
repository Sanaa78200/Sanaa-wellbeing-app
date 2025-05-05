
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
    
    // Réinitialiser l'audio quand la sourate change
    if (isPlaying) {
      stopAudio();
    }
    
    setCurrentAyah(0);
    audioUrlsRef.current = [];
  }, [currentSurah, currentReciter]);
  
  // Configurer les gestionnaires d'événements audio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    const handleAudioEnd = () => {
      // Utiliser une fonction de mise à jour pour garantir la valeur la plus récente
      setCurrentAyah(prev => {
        const nextAyah = prev + 1;
        if (nextAyah < audioUrlsRef.current.length) {
          // Jouer le verset suivant dans la sourate actuelle
          playAyah(nextAyah);
          return nextAyah;
        } else if (currentSurahRef.current < 114) {
          // Passage à la sourate suivante
          const nextSurah = currentSurahRef.current + 1;
          setTimeout(() => loadNextSurah(nextSurah), 500); // Léger délai pour une transition plus fluide
          return prev; // La mise à jour de currentAyah sera faite dans loadNextSurah
        } else {
          // C'est la fin de la dernière sourate
          stopAudio();
          toast.info("Vous avez terminé toutes les sourates disponibles");
          return prev;
        }
      });
    };
    
    if (audioRef.current) {
      // Supprimer d'abord les anciens écouteurs pour éviter les doublons
      audioRef.current.removeEventListener('ended', handleAudioEnd);
      // Ajouter le nouvel écouteur
      audioRef.current.addEventListener('ended', handleAudioEnd);
    }
    
    // Nettoyage à la suppression du composant
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleAudioEnd);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
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
  
  // Charger et commencer à lire la sourate suivante
  const loadNextSurah = async (surahNumber: number) => {
    try {
      setIsAudioLoading(true);
      // Charger la sourate suivante
      const urls = await loadAudioUrls(surahNumber);
      if (urls.length > 0) {
        // Mettre à jour la référence externe de la sourate
        currentSurahRef.current = surahNumber;
        // Réinitialiser l'index du verset
        setCurrentAyah(0);
        // Commencer la lecture du premier verset avec un léger délai
        setTimeout(() => {
          playAyah(0);
          setIsPlaying(true);
        }, 300);
        // Notification pour informer l'utilisateur
        toast.success(`Passage à la sourate ${surahNumber}`);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de la sourate suivante:", error);
      stopAudio();
      toast.error("Impossible de charger la sourate suivante");
    } finally {
      setIsAudioLoading(false);
    }
  };
  
  // Jouer un verset spécifique avec préchargement
  const playAyah = (ayahIndex: number) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    if (ayahIndex >= 0 && ayahIndex < audioUrlsRef.current.length) {
      // Précharger le verset suivant si disponible
      if (ayahIndex + 1 < audioUrlsRef.current.length) {
        const nextAudio = new Audio();
        nextAudio.src = audioUrlsRef.current[ayahIndex + 1];
        nextAudio.preload = "auto";
      }
      
      // Jouer le verset actuel
      audioRef.current.src = audioUrlsRef.current[ayahIndex];
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
        toast.error("Erreur lors de la lecture audio. Veuillez réessayer en cliquant sur le bouton.");
        setIsPlaying(false);
      });
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
  
  // Fonction pour avancer ou reculer manuellement d'un verset
  const navigateAyah = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      setCurrentAyah(prev => {
        const next = prev + 1;
        if (next < audioUrlsRef.current.length) {
          if (isPlaying) playAyah(next);
          return next;
        }
        return prev;
      });
    } else {
      setCurrentAyah(prev => {
        const previous = prev - 1;
        if (previous >= 0) {
          if (isPlaying) playAyah(previous);
          return previous;
        }
        return prev;
      });
    }
  };
  
  return {
    isPlaying,
    isAudioLoading,
    currentReciter,
    setCurrentReciter,
    currentAyah,
    totalAyahs,
    togglePlayAudio,
    stopAudio,
    navigateAyah,
    loadNextSurah
  };
};
