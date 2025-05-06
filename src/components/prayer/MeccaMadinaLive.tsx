
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MeccaMadinaLive = () => {
  // State to track which source options are visible
  const [visibleOptions, setVisibleOptions] = useState({
    mecca: false,
    madina: false
  });
  
  // Function to toggle mute status
  const toggleMute = (playerId: string) => {
    const player = document.getElementById(playerId) as HTMLIFrameElement;
    if (!player) return;
    
    const currentSrc = player.src;
    if (currentSrc.includes('&mute=1')) {
      player.src = currentSrc.replace('&mute=1', '');
    } else {
      player.src = currentSrc + '&mute=1';
    }
  };
  
  // Function to toggle fullscreen
  const toggleFullscreen = (playerId: string) => {
    const player = document.getElementById(playerId) as HTMLIFrameElement;
    if (!player) return;
    
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if ((player as any).mozRequestFullScreen) { /* Firefox */
      (player as any).mozRequestFullScreen();
    } else if ((player as any).webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      (player as any).webkitRequestFullscreen();
    } else if ((player as any).msRequestFullscreen) { /* IE/Edge */
      (player as any).msRequestFullscreen();
    }
  };
  
  // Function to toggle source options
  const toggleSourceOptions = (sourceId: 'mecca' | 'madina') => {
    setVisibleOptions(prev => ({
      ...prev,
      [sourceId]: !prev[sourceId]
    }));
  };
  
  // Function to change video source
  const changeSource = (playerId: string, sourceUrl: string) => {
    const player = document.getElementById(playerId) as HTMLIFrameElement;
    const loadingId = playerId.replace('player', 'loading');
    const loading = document.getElementById(loadingId);
    
    if (!player || !loading) return;
    
    // Show loading indicator
    loading.style.display = 'block';
    
    // Change source
    player.src = sourceUrl;
    
    // Hide loading indicator after loading
    player.onload = function() {
      if (loading) loading.style.display = 'none';
    };
    
    // Also hide the source options
    const sourceType = playerId.includes('mecca') ? 'mecca' : 'madina';
    setVisibleOptions(prev => ({
      ...prev,
      [sourceType]: false
    }));
  };
  
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-islamic-green-dark mb-2">Mecca et Madina Live</h1>
          <p className="text-islamic-slate">Diffusion en direct sans publicité</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section Mecca Live */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative pt-[56.25%]">
              <iframe 
                id="mecca-player" 
                className="absolute top-0 left-0 w-full h-full border-none"
                src="https://www.youtube.com/embed/y4_c6NIl8XA?autoplay=1&mute=1" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
              <div id="mecca-loading" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white py-2 px-4 rounded hidden">
                Chargement...
              </div>
            </div>
            
            <div className="p-4 bg-islamic-cream">
              <h3 className="font-medium text-lg text-islamic-green-dark mb-3">La Mecque (Mecca) - En Direct</h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={() => toggleMute('mecca-player')}
                  variant="default"
                  className="bg-islamic-green hover:bg-islamic-green-dark"
                >
                  Activer/Couper le son
                </Button>
                <Button 
                  onClick={() => toggleFullscreen('mecca-player')} 
                  variant="outline"
                  className="border-islamic-green text-islamic-green hover:bg-islamic-cream"
                >
                  Plein écran
                </Button>
                <Button 
                  onClick={() => toggleSourceOptions('mecca')}
                  variant="outline"
                  className="border-islamic-green text-islamic-green hover:bg-islamic-cream"
                >
                  Sources alternatives
                </Button>
              </div>
              
              {visibleOptions.mecca && (
                <div className="mt-3 bg-white rounded p-3 border border-gray-200">
                  <div 
                    className="p-2 cursor-pointer hover:bg-islamic-cream rounded transition-colors"
                    onClick={() => changeSource('mecca-player', 'https://www.youtube.com/embed/y4_c6NIl8XA?autoplay=1&mute=1')}
                  >
                    Source 1: YouTube Officiel
                  </div>
                  <div 
                    className="p-2 cursor-pointer hover:bg-islamic-cream rounded transition-colors"
                    onClick={() => changeSource('mecca-player', 'https://www.youtube.com/embed/XfIVFU77Z9w?autoplay=1&mute=1')}
                  >
                    Source 2: YouTube Alternatif
                  </div>
                  <div 
                    className="p-2 cursor-pointer hover:bg-islamic-cream rounded transition-colors"
                    onClick={() => changeSource('mecca-player', 'https://www.youtube.com/embed/Fqg1zfRcwZY?autoplay=1&mute=1')}
                  >
                    Source 3: Mecca Live
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Section Madina Live */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative pt-[56.25%]">
              <iframe 
                id="madina-player" 
                className="absolute top-0 left-0 w-full h-full border-none"
                src="https://www.youtube.com/embed/Fqg1zfRcwZY?autoplay=1&mute=1" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
              <div id="madina-loading" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white py-2 px-4 rounded hidden">
                Chargement...
              </div>
            </div>
            
            <div className="p-4 bg-islamic-cream">
              <h3 className="font-medium text-lg text-islamic-green-dark mb-3">Médine (Madina) - En Direct</h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={() => toggleMute('madina-player')} 
                  variant="default"
                  className="bg-islamic-green hover:bg-islamic-green-dark"
                >
                  Activer/Couper le son
                </Button>
                <Button 
                  onClick={() => toggleFullscreen('madina-player')}
                  variant="outline"
                  className="border-islamic-green text-islamic-green hover:bg-islamic-cream"
                >
                  Plein écran
                </Button>
                <Button 
                  onClick={() => toggleSourceOptions('madina')}
                  variant="outline"
                  className="border-islamic-green text-islamic-green hover:bg-islamic-cream"
                >
                  Sources alternatives
                </Button>
              </div>
              
              {visibleOptions.madina && (
                <div className="mt-3 bg-white rounded p-3 border border-gray-200">
                  <div 
                    className="p-2 cursor-pointer hover:bg-islamic-cream rounded transition-colors"
                    onClick={() => changeSource('madina-player', 'https://www.youtube.com/embed/Fqg1zfRcwZY?autoplay=1&mute=1')}
                  >
                    Source 1: YouTube Officiel
                  </div>
                  <div 
                    className="p-2 cursor-pointer hover:bg-islamic-cream rounded transition-colors"
                    onClick={() => changeSource('madina-player', 'https://www.youtube.com/embed/R-4O5R7Ld0Y?autoplay=1&mute=1')}
                  >
                    Source 2: YouTube Alternatif
                  </div>
                  <div 
                    className="p-2 cursor-pointer hover:bg-islamic-cream rounded transition-colors"
                    onClick={() => changeSource('madina-player', 'https://www.youtube.com/embed/2Yw3JGhzIpk?autoplay=1&mute=1')}
                  >
                    Source 3: Madina Live
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-islamic-slate text-sm">
          <p>Ce service est fourni à titre informatif uniquement. Les diffusions sont des flux officiels publics.</p>
        </div>
      </div>
    </div>
  );
};

export default MeccaMadinaLive;
