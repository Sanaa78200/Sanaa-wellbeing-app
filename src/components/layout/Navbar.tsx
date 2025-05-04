import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Calendar, Utensils, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Navigation items
  const navItems = [{
    name: 'Accueil',
    path: '/'
  }, {
    name: 'Calculateur',
    path: '/calculateur'
  }, {
    name: 'Prières',
    path: '/prieres'
  }, {
    name: 'Nutrition',
    path: '/nutrition'
  }, {
    name: 'Mode Ramadan',
    path: '/ramadan'
  }];
  return <nav className="bg-white shadow-sm border-b border-islamic-green/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Moon className="h-6 w-6 text-islamic-green" />
            <span className="font-bold text-islamic-green text-lg">Sanaa
          </span>
            <span className="text-lg text-fuchsia-500">Bien-être</span>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map(item => <Link key={item.name} to={item.path} className="px-3 py-2 text-islamic-slate hover:text-islamic-green transition-colors">
                {item.name}
              </Link>)}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-islamic-slate" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        <div className={cn("md:hidden transition-all duration-300 ease-in-out overflow-hidden", isMenuOpen ? "max-h-64 py-2" : "max-h-0")}>
          <div className="flex flex-col space-y-2">
            {navItems.map(item => <Link key={item.name} to={item.path} className="px-3 py-2 hover:bg-islamic-cream rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </Link>)}
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;