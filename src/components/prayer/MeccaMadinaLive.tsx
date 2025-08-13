import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, VolumeX, Maximize, Monitor, Smartphone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/sonner';
import { MainAmazonBanner, SidebarAmazonProducts } from '@/components/ads/AmazonProducts';
const MeccaMadinaLive = () => {
  const [currentMeccaSource, setCurrentMeccaSource] = useState(0);
  const [currentMadinaSource, setCurrentMadinaSource] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const isMobile = useIsMobile();

  // Sources mises à jour avec les nouvelles URLs
  const meccaSources = [{
    url: "https://www.youtube.com/embed/9YNr0G4EE0Q?autoplay=1&mute=1&rel=0&modestbranding=1",
    name: "Mecca Live Direct - Source principale"
  }, {
    url: "https://www.youtube.com/embed/y4_c6NIl8XA?autoplay=1&mute=1&rel=0&modestbranding=1",
    name: "Mecca Live - Source alternative"
  }, {
    url: "https://www.youtube.com/embed/XfIVFU77Z9w?autoplay=1&mute=1&rel=0&modestbranding=1",
    name: "Mecca Live - Source de secours"
  }];

  // Source Médina mise à jour avec le nouveau lien
  const madinaSources = [{
    url: "https://www.youtube.com/embed/TpT8b8JFZ6E?autoplay=1&mute=1&rel=0&modestbranding=1",
    name: "Madina Live Direct - Source principale (mise à jour)"
  }, {
    url: "https://www.youtube.com/embed/R-4O5R7Ld0Y?autoplay=1&mute=1&rel=0&modestbranding=1",
    name: "Madina Live - Source alternative"
  }, {
    url: "https://www.youtube.com/embed/2Yw3JGhzIpk?autoplay=1&mute=1&rel=0&modestbranding=1",
    name: "Madina Live - Source de secours"
  }];
  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? "Son activé" : "Son coupé");
  };
  const changeSource = (type: 'mecca' | 'madina', sourceIndex: number) => {
    if (type === 'mecca') {
      setCurrentMeccaSource(sourceIndex);
      toast.success(`Source Mecca changée : ${meccaSources[sourceIndex].name}`);
    } else {
      setCurrentMadinaSource(sourceIndex);
      toast.success(`Source Madina changée : ${madinaSources[sourceIndex].name}`);
    }
  };
  const toggleFullscreen = (element: string) => {
    const iframe = document.getElementById(element) as HTMLElement;
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  // Optimisation mobile avec détection automatique
  useEffect(() => {
    if (isMobile) {
      setIsPlaying(false);
      toast.info("Mode mobile activé - Appuyez sur lecture pour démarrer");
    }
  }, [isMobile]);
  return <div className="min-h-screen bg-islamic-pattern py-6">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-islamic-green-dark mb-3">
            Mecca et Madina Live
          </h1>
          <p className="text-islamic-slate max-w-2xl mx-auto">
            Diffusion en direct des Lieux Saints de l'Islam. Connectez-vous spirituellement depuis n'importe où dans le monde.
          </p>
          <div className="flex justify-center items-center gap-2 mt-4">
            <Badge className="bg-green-100 text-green-800">
              🔴 En direct
            </Badge>
            <Badge className="bg-islamic-cream text-islamic-green">
              {isMobile ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
              <span className="ml-1">{isMobile ? 'Mobile' : 'Desktop'}</span>
            </Badge>
          </div>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Zone vidéos principales */}
          <div className="lg:col-span-3 space-y-6">
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
              {/* Mecca Live */}
              <Card className="overflow-hidden shadow-lg">
                <CardHeader className="bg-gradient-to-r from-islamic-green to-islamic-green-dark text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      🕋 La Mecque (Mecca)
                    </span>
                    <Badge className="bg-white/20 text-white">
                      Source {currentMeccaSource + 1}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-video">
                      <iframe id="mecca-iframe" src={`${meccaSources[currentMeccaSource].url}${isMuted ? '&mute=1' : '&mute=0'}`} title="Mecca Live Stream" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                    
                    {/* Contrôles vidéo */}
                    <div className="p-4 bg-gray-50 border-t">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Button variant="outline" size="sm" onClick={toggleMute} className="flex items-center gap-2">
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          {isMuted ? 'Activer le son' : 'Couper le son'}
                        </Button>
                        
                        <Button variant="outline" size="sm" onClick={() => toggleFullscreen('mecca-iframe')} className="flex items-center gap-2">
                          <Maximize className="w-4 h-4" />
                          Plein écran
                        </Button>
                      </div>
                      
                      {/* Sélecteur de source */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Sources disponibles :</p>
                        <div className="flex flex-wrap gap-1">
                          {meccaSources.map((source, index) => <Button key={index} variant={currentMeccaSource === index ? "default" : "outline"} size="sm" onClick={() => changeSource('mecca', index)} className="text-xs">
                              Source {index + 1}
                            </Button>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Madina Live */}
              <Card className="overflow-hidden shadow-lg">
                <CardHeader className="bg-gradient-to-r from-islamic-green to-islamic-green-dark text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      🕌 Médine (Madina)
                    </span>
                    <Badge className="bg-white/20 text-white">
                      Source {currentMadinaSource + 1}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-video">
                      <iframe id="madina-iframe" src={`${madinaSources[currentMadinaSource].url}${isMuted ? '&mute=1' : '&mute=0'}`} title="Madina Live Stream" className="w-full h-full" allowFullScreen />
                    </div>
                    
                    {/* Contrôles vidéo */}
                    <div className="p-4 bg-gray-50 border-t">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Button variant="outline" size="sm" onClick={toggleMute} className="flex items-center gap-2">
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          {isMuted ? 'Activer le son' : 'Couper le son'}
                        </Button>
                        
                        <Button variant="outline" size="sm" onClick={() => toggleFullscreen('madina-iframe')} className="flex items-center gap-2">
                          <Maximize className="w-4 h-4" />
                          Plein écran
                        </Button>
                      </div>
                      
                      {/* Sélecteur de source */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Sources disponibles :</p>
                        <div className="flex flex-wrap gap-1">
                          {madinaSources.map((source, index) => <Button key={index} variant={currentMadinaSource === index ? "default" : "outline"} size="sm" onClick={() => changeSource('madina', index)} className="text-xs">
                              Source {index + 1}
                            </Button>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Zone produits Amazon pour desktop en bas */}
            {!isMobile && <MainAmazonBanner />}
            
            {/* Informations complémentaires */}
            <div className="grid gap-4 md:grid-cols-2">
              
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-islamic-green">🌐 Sources Multiples</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Plusieurs sources de diffusion disponibles pour garantir une connexion stable en permanence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Sidebar droite avec produits Amazon */}
          <div className="lg:col-span-1">
            <SidebarAmazonProducts />
          </div>
        </div>
        
        {/* Zone produits Amazon pour mobile en bas de page */}
        {isMobile && <div className="mt-8">
            <MainAmazonBanner />
          </div>}
      </div>
    </div>;
};
export default MeccaMadinaLive;