
import { useState, useRef } from 'react';
import { toast } from 'sonner';

export const useQuranAudio = (currentSurah: number) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentReciter, setCurrentReciter] = useState('ar.alafasy');
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const togglePlayAudio = async () => {
    if (isAudioLoading) return;
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setIsAudioLoading(false);
      };
      
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
      try {
        setIsAudioLoading(true);
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${currentSurah}/${currentReciter}`);
        const data = await response.json();
        
        if (data.code === 200) {
          const audioUrl = data.data.ayahs[0].audio;
          audioRef.current.src = audioUrl.replace('http:', 'https:');
          
          audioRef.current.oncanplaythrough = () => {
            audioRef.current?.play()
              .then(() => {
                setIsPlaying(true);
                setIsAudioLoading(false);
              })
              .catch(err => {
                console.error('Erreur de lecture:', err);
                toast.error('Erreur lors de la lecture audio');
                setIsAudioLoading(false);
              });
              
            // Nettoyer l'événement après qu'il se soit déclenché
            audioRef.current!.oncanplaythrough = null;
          };
        } else {
          toast.error('Erreur lors du chargement audio');
          setIsAudioLoading(false);
        }
      } catch (err) {
        console.error('Erreur lors du chargement audio:', err);
        toast.error('Erreur de connexion');
        setIsAudioLoading(false);
      }
    }
  };
  
  return {
    isPlaying,
    currentReciter,
    isAudioLoading,
    setCurrentReciter,
    togglePlayAudio
  };
};
