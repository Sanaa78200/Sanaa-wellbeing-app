
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

interface PrayerLocatorProps {
  onLocationChange: (latitude: number, longitude: number, locationName: string) => void;
}

const PrayerLocator = ({ onLocationChange }: PrayerLocatorProps) => {
  const [isLocating, setIsLocating] = useState(false);
  const [manualLocation, setManualLocation] = useState('');
  
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
          
          // Reverse geocoding pour obtenir le nom de la localisation
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
          
          onLocationChange(latitude, longitude, locationName);
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
  
  const handleManualLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!manualLocation.trim()) {
      toast.error("Veuillez entrer un nom de lieu");
      return;
    }
    
    setIsLocating(true);
    
    try {
      // Geocoding pour obtenir les coordonnées depuis le nom de lieu
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(manualLocation)}&limit=1`
      );
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const locationName = display_name.split(',').slice(0, 2).join(',');
        
        onLocationChange(parseFloat(lat), parseFloat(lon), locationName);
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
        
        <form onSubmit={handleManualLocationSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Entrez un nom de ville"
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLocating}
            variant="outline"
          >
            <MapPin className="mr-2" />
            Chercher
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PrayerLocator;
