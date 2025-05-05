
import { useState } from 'react';
import { SearchResult } from '../types';
import { toast } from 'sonner';

export const useQuranSearch = (currentTranslation: string) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.warning('Veuillez entrer un terme de recherche');
      return;
    }
    
    setIsLoading(true);
    
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
        toast.error('Erreur lors de la recherche');
      }
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      toast.error('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };
  
  const exitSearchMode = () => {
    setIsSearchMode(false);
    setSearchResults(null);
  };
  
  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchMode,
    isLoading,
    handleSearch,
    exitSearchMode
  };
};
