
import React from 'react';
import { Activity, TrendingDown, Calendar, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RegimeNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const RegimeNavigation: React.FC<RegimeNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: <Activity size={20} />
    },
    {
      id: 'progress',
      label: 'Progrès',
      icon: <TrendingDown size={20} />
    },
    {
      id: 'calendar',
      label: 'Calendrier',
      icon: <Calendar size={20} />
    },
    {
      id: 'objectives',
      label: 'Objectifs',
      icon: <Target size={20} />
    }
  ];

  return (
    <nav className="bg-islamic-green text-white shadow-sm">
      <div className="container mx-auto">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "px-4 py-3 flex items-center space-x-2 whitespace-nowrap",
                activeTab === tab.id ? 'border-b-2 border-islamic-cream text-islamic-cream' : 'text-white'
              )}
              aria-selected={activeTab === tab.id}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default RegimeNavigation;
