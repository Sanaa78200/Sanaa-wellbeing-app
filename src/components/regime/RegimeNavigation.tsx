
import React from 'react';
import { Activity, TrendingDown, Calendar, Target } from 'lucide-react';

interface RegimeNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const RegimeNavigation: React.FC<RegimeNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-islamic-green text-white shadow-sm">
      <div className="container mx-auto">
        <div className="flex overflow-x-auto">
          <button 
            onClick={() => onTabChange('dashboard')}
            className={`px-4 py-3 flex items-center space-x-2 whitespace-nowrap ${activeTab === 'dashboard' ? 'border-b-2 border-islamic-cream text-islamic-cream' : 'text-white'}`}
          >
            <Activity size={20} />
            <span>Tableau de bord</span>
          </button>
          <button 
            onClick={() => onTabChange('progress')}
            className={`px-4 py-3 flex items-center space-x-2 whitespace-nowrap ${activeTab === 'progress' ? 'border-b-2 border-islamic-cream text-islamic-cream' : 'text-white'}`}
          >
            <TrendingDown size={20} />
            <span>Progrès</span>
          </button>
          <button 
            onClick={() => onTabChange('calendar')}
            className={`px-4 py-3 flex items-center space-x-2 whitespace-nowrap ${activeTab === 'calendar' ? 'border-b-2 border-islamic-cream text-islamic-cream' : 'text-white'}`}
          >
            <Calendar size={20} />
            <span>Calendrier</span>
          </button>
          <button 
            onClick={() => onTabChange('objectives')}
            className={`px-4 py-3 flex items-center space-x-2 whitespace-nowrap ${activeTab === 'objectives' ? 'border-b-2 border-islamic-cream text-islamic-cream' : 'text-white'}`}
          >
            <Target size={20} />
            <span>Objectifs</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default RegimeNavigation;
