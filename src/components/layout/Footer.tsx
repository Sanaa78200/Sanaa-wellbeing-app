import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return <footer className="bg-islamic-cream py-8 border-t border-islamic-green/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-islamic-green-dark font-bold text-lg mb-3">Sanaa Bien-être</h3>
            <p className="text-islamic-slate max-w-md">Application de santé et de bien-être pour femmes musulmanes basée sur les principes islamiques 
et la science nutritionnelle moderne.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-islamic-green mb-3">Liens</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-islamic-slate hover:text-islamic-green transition-colors">Accueil</Link></li>
                <li><Link to="/prieres" className="text-islamic-slate hover:text-islamic-green transition-colors">Horaires de prière</Link></li>
                <li><Link to="/profil" className="text-islamic-slate hover:text-islamic-green transition-colors">Mon Profil</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-islamic-green mb-3">Ressources</h4>
              <ul className="space-y-2">
                <li><Link to="/nutrition-regime" className="text-islamic-slate hover:text-islamic-green transition-colors">Nutrition</Link></li>
                <li><Link to="/coran" className="text-islamic-slate hover:text-islamic-green transition-colors">Coran</Link></li>
                <li><Link to="/ramadan" className="text-islamic-slate hover:text-islamic-green transition-colors">Mode Ramadan</Link></li>
                <li><Link to="/mecca-madina" className="text-islamic-slate hover:text-islamic-green transition-colors">Mecca & Madina Live</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1 mt-6 md:mt-0">
              <h4 className="font-semibold text-islamic-green mb-3">À propos</h4>
              <ul className="space-y-2">
                <li><Link to="/rgpd" className="text-islamic-slate hover:text-islamic-green transition-colors">RGPD & Confidentialité</Link></li>
                <li><a href="#" className="text-islamic-slate hover:text-islamic-green transition-colors">Conditions d'utilisation</a></li>
                <li><a href="#" className="text-islamic-slate hover:text-islamic-green transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="font-semibold text-islamic-gold mb-3">🎁 Idées Cadeaux Islam</h4>
              <a href="https://amzn.to/4lQea4B" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-islamic-slate hover:text-islamic-gold transition-colors text-sm">
                Découvrir nos cadeaux spirituels
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-islamic-green/10 mt-8 pt-6 text-center text-islamic-slate">
          <p>&copy; {new Date().getFullYear()} Sanaa Bien-être. Tous droits réservés.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;