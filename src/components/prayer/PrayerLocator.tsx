
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Search } from 'lucide-react';
import { toast } from "sonner";

interface PrayerLocatorProps {
  onLocationChange: (location: { lat: number; lng: number; address: string }) => void;
}

// Type pour les résultats de recherche
interface LocationSearchResult {
  description: string;
  place_id: string;
}

const PrayerLocator = ({ onLocationChange }: PrayerLocatorProps) => {
  const [isLocating, setIsLocating] = useState(false);
  const [manualLocation, setManualLocation] = useState('');
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  
  // Détection des clics en dehors des résultats de recherche
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleGeolocation = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast.error("La géolocalisation n'est pas supportée par votre navigateur");
      setIsLocating(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Utiliser Nominatim pour le géocodage inversé
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
          );
          
          const data = await response.json();
          let locationName = 'Localisation inconnue';
          
          if (data && data.address) {
            if (data.address.city) {
              locationName = `${data.address.city}, ${data.address.country}`;
            } else if (data.address.town) {
              locationName = `${data.address.town}, ${data.address.country}`;
            } else if (data.address.village) {
              locationName = `${data.address.village}, ${data.address.country}`;
            } else {
              locationName = data.address.country || locationName;
            }
          }
          
          onLocationChange({ lat: latitude, lng: longitude, address: locationName });
          toast.success(`Localisation trouvée: ${locationName}`);
        } catch (error) {
          console.error("Erreur lors de la géolocalisation:", error);
          toast.error("Impossible de déterminer votre position");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Erreur de géolocalisation:", error);
        
        let errorMessage = "Impossible d'accéder à votre position";
        if (error.code === 1) {
          errorMessage = "Vous avez refusé l'accès à votre position";
        } else if (error.code === 2) {
          errorMessage = "Position non disponible";
        } else if (error.code === 3) {
          errorMessage = "Délai d'attente dépassé";
        }
        
        toast.error(errorMessage);
        setIsLocating(false);
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true }
    );
  };
  
  const handleLocationSearch = async () => {
    if (!manualLocation.trim()) {
      toast.error("Veuillez entrer un nom de lieu");
      return;
    }
    
    // Simuler les résultats de recherche
    const mockResults: LocationSearchResult[] = [
      { description: `${manualLocation} (option principale)`, place_id: '1' },
      { description: `${manualLocation} (autre option)`, place_id: '2' },
    ];
    
    setSearchResults(mockResults);
    setShowResults(true);
  };
  
  const handleManualLocationSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setIsLocating(true);
    setShowResults(false);
    
    try {
      // Utiliser Nominatim pour la recherche géographique
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(manualLocation)}&limit=1`
      );
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const locationName = display_name.split(',').slice(0, 2).join(',');
        
        onLocationChange({ lat: parseFloat(lat), lng: parseFloat(lon), address: locationName });
        toast.success(`Lieu trouvé: ${locationName}`);
      } else {
        toast.error("Lieu non trouvé. Veuillez essayer un autre nom.");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche du lieu:", error);
      toast.error("Impossible de trouver ce lieu");
    } finally {
      setIsLocating(false);
    }
  };

  const handleLocationResultSelect = async (placeId: string, description: string) => {
    setShowResults(false);
    setManualLocation(description);
    setIsLocating(true);
    
    try {
      // Utiliser Nominatim pour la recherche
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(description)}&limit=1`
      );
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        onLocationChange({ 
          lat: parseFloat(lat), 
          lng: parseFloat(lon), 
          address: description 
        });
        toast.success(`Lieu trouvé: ${description}`);
      } else {
        toast.error("Lieu non trouvé avec les détails fournis.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du lieu:", error);
      toast.error("Impossible de récupérer les détails de ce lieu");
    } finally {
      setIsLocating(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <Button 
          onClick={handleGeolocation}
          disabled={isLocating}
          className="bg-islamic-green hover:bg-islamic-green-dark text-white w-full"
        >
          <Navigation className="mr-2" />
          {isLocating ? 'Recherche en cours...' : 'Utiliser ma position actuelle'}
        </Button>
        
        <div className="text-center text-islamic-slate text-sm">ou</div>
        
        <div className="relative">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Entrez un nom de ville"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleLocationSearch}
              disabled={isLocating || !manualLocation.trim()}
              variant="outline"
            >
              <Search className="mr-2" />
              Chercher
            </Button>
          </div>
          
          {showResults && searchResults.length > 0 && (
            <div 
              ref={searchResultsRef}
              className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {searchResults.map((result) => (
                <div
                  key={result.place_id}
                  className="px-4 py-2 hover:bg-slate-100 cursor-pointer flex items-center"
                  onClick={() => handleLocationResultSelect(result.place_id, result.description)}
                >
                  <MapPin className="w-4 h-4 mr-2 text-islamic-green" />
                  <span>{result.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayerLocator;
