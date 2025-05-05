
import { useState, useEffect } from 'react';
import { QuranData, Surah } from '../types';
import { toast } from 'sonner';

export const useQuranData = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentSurah, setCurrentSurah] = useState(1);
  const [quranData, setQuranData] = useState<QuranData | null>(null);
  const [translationData, setTranslationData] = useState<QuranData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTranslation, setCurrentTranslation] = useState('fr.hamidullah');
  
  // Chargement initial des sourates
  useEffect(() => {
    fetchSurahs();
  }, []);
  
  // Chargement de la sourate sélectionnée
  useEffect(() => {
    if (currentSurah > 0) {
      fetchSurah(currentSurah);
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
  
  return {
    surahs,
    setSurahs,
    currentSurah,
    setCurrentSurah,
    quranData,
    translationData,
    isLoading,
    error,
    currentTranslation,
    setCurrentTranslation,
    goToPreviousSurah,
    goToNextSurah
  };
};
