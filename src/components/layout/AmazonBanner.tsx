import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, Zap } from 'lucide-react';

export const AmazonBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-islamic-green to-islamic-green-dark text-white py-3 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <Zap className="h-4 w-4 text-yellow-300" />
          </div>
          <div>
            <span className="font-semibold text-sm md:text-base">
              📚 Livres Islamiques en Promotion
            </span>
            <span className="hidden md:inline ml-2 text-sm opacity-90">
              • Découvrez notre sélection de livres islamiques à prix réduits
            </span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="bg-white text-islamic-green hover:bg-islamic-cream border-white"
          onClick={() => window.open('https://amzn.to/4mbWsbg', '_blank')}
        >
          <span className="hidden sm:inline">Voir les promos</span>
          <span className="sm:hidden">Promos</span>
          <ExternalLink className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default AmazonBanner;