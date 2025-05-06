
import React from 'react';
import { Activity, TrendingDown, Calendar, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RegimeNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobile?: boolean;
}

const RegimeNavigation: React.FC<RegimeNavigationProps> = ({ activeTab, onTabChange, isMobile }) => {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: <Activity size={isMobile ? 18 : 20} />
    },
    {
      id: 'progress',
      label: 'Progrès',
      icon: <TrendingDown size={isMobile ? 18 : 20} />
    },
    {
      id: 'calendar',
      label: 'Calendrier',
      icon: <Calendar size={isMobile ? 18 : 20} />
    },
    {
      id: 'objectives',
      label: 'Objectifs',
      icon: <Target size={isMobile ? 18 : 20} />
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
                "px-4 py-3 flex items-center space-x-2 whitespace-nowrap flex-1 justify-center",
                activeTab === tab.id ? 'border-b-2 border-islamic-cream text-islamic-cream' : 'text-white'
              )}
              aria-selected={activeTab === tab.id}
            >
              {tab.icon}
              {!isMobile && <span>{tab.label}</span>}
              {isMobile && <span className="text-xs">{tab.label.substring(0, 3)}</span>}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default RegimeNavigation;
