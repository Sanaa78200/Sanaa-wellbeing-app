
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import AmazonBanner from './AmazonBanner';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Navigation cohérente et organisée
  const navItems = [
    {
      name: 'Nouveau mot de passe',
      path: '/reset-password',
      category: 'auth'
    },
    {
      name: t('home'),
      path: '/',
      category: 'main'
    },
    {
      name: t('prayers'),
      path: '/prieres',
      category: 'spiritual'
    },
    {
      name: t('nutrition'),
      path: '/nutrition-regime',
      category: 'health'
    },
    {
      name: t('quran'),
      path: '/coran',
      category: 'spiritual'
    },
    {
      name: t('ramadan'),
      path: '/ramadan',
      category: 'spiritual'
    },
    {
      name: 'Mecca & Madina',
      path: '/mecca-madina',
      category: 'spiritual'
    },
    {
      name: t('profile'),
      path: '/profil',
      category: 'user'
    }
  ];
  
  return (
    <>
      <AmazonBanner />
      <nav className="bg-white shadow-sm border-b border-islamic-green/10 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Moon className="h-6 w-6 text-islamic-green" />
            <span className="font-bold text-islamic-green text-lg">Sanaa</span>
            <span className="text-lg text-fuchsia-500">Bien-être</span>
          </Link>
          
          {/* Navigation desktop améliorée */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={cn(
                  "px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium",
                  location.pathname === item.path
                    ? "bg-islamic-green text-white shadow-sm"
                    : "text-islamic-slate hover:text-islamic-green hover:bg-islamic-cream/50"
                )}
              >
                {isMobile ? item.name.split(' ')[0] : item.name}
              </Link>
            ))}
            <div className="ml-3 flex items-center gap-2">
              <LanguageSelector />
              {user ? (
                <Button 
                  onClick={signOut}
                  variant="ghost" 
                  size="sm"
                  className="text-islamic-green hover:bg-islamic-green/10"
                >
                  Déconnexion
                </Button>
              ) : (
                <Button 
                  asChild 
                  variant="outline" 
                  size="sm"
                  className="border-islamic-green text-islamic-green hover:bg-islamic-green hover:text-white"
                >
                  <Link to="/auth">Connexion</Link>
                </Button>
              )}
            </div>
          </div>
          
          {/* Menu mobile optimisé */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-islamic-slate hover:bg-islamic-cream" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Navigation mobile améliorée */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-80 py-4" : "max-h-0"
        )}>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={cn(
                  "px-3 py-3 rounded-md transition-all text-sm font-medium text-center",
                  location.pathname === item.path
                    ? "bg-islamic-green text-white shadow-sm"
                    : "bg-islamic-cream/50 text-islamic-slate hover:bg-islamic-cream"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
