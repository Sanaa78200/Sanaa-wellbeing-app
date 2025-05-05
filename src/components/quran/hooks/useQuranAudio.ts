
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export const useQuranAudio = (currentSurah: number) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentReciter, setCurrentReciter] = useState('ar.alafasy');
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(0);
  const [ayahAudios, setAyahAudios] = useState<string[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Chargement des audios de la sourate
  useEffect(() => {
    if (isPlaying) {
      loadSurahAudio();
    }
  }, [currentSurah, currentReciter]);
  
  // Gestion de la lecture continue
  useEffect(() => {
    if (!audioRef.current) return;
    
    const handleEnded = () => {
      if (currentAyah < ayahAudios.length - 1) {
        // Passer au prochain ayah
        setCurrentAyah(prev => prev + 1);
      } else {
        // Fin de la sourate
        setIsPlaying(false);
        setCurrentAyah(0);
        toast.success('Lecture de la sourate terminée');
      }
    };
    
    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      audioRef.current?.removeEventListener('ended', handleEnded);
    };
  }, [currentAyah, ayahAudios.length]);
  
  // Jouer l'ayah actuel quand il change
  useEffect(() => {
    if (isPlaying && ayahAudios.length > 0 && currentAyah < ayahAudios.length) {
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      
      audioRef.current.src = ayahAudios[currentAyah];
      audioRef.current.play()
        .catch(err => {
          console.error('Erreur de lecture:', err);
          toast.error('Erreur lors de la lecture audio');
          setIsPlaying(false);
        });
    }
  }, [currentAyah, ayahAudios, isPlaying]);
  
  const loadSurahAudio = async () => {
    try {
      setIsAudioLoading(true);
      
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${currentSurah}/${currentReciter}`);
      const data = await response.json();
      
      if (data.code === 200 && data.data.ayahs) {
        const audioUrls = data.data.ayahs.map((ayah: any) => 
          ayah.audio.replace('http:', 'https:')
        );
        
        setAyahAudios(audioUrls);
        setCurrentAyah(0);
        setIsAudioLoading(false);
      } else {
        toast.error('Erreur lors du chargement audio');
        setIsPlaying(false);
        setIsAudioLoading(false);
      }
    } catch (err) {
      console.error('Erreur lors du chargement audio:', err);
      toast.error('Erreur de connexion');
      setIsPlaying(false);
      setIsAudioLoading(false);
    }
  };
  
  const togglePlayAudio = async () => {
    if (isAudioLoading) return;
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      audioRef.current.onerror = () => {
        toast.error('Erreur lors de la lecture audio');
        setIsPlaying(false);
        setIsAudioLoading(false);
      };
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      
      if (ayahAudios.length === 0) {
        await loadSurahAudio();
      } else if (currentAyah < ayahAudios.length) {
        audioRef.current.src = ayahAudios[currentAyah];
        audioRef.current.play()
          .catch(err => {
            console.error('Erreur de lecture:', err);
            toast.error('Erreur lors de la lecture audio');
            setIsPlaying(false);
          });
      }
    }
  };
  
  return {
    isPlaying,
    currentReciter,
    isAudioLoading,
    currentAyah,
    totalAyahs: ayahAudios.length,
    setCurrentReciter,
    togglePlayAudio
  };
};
