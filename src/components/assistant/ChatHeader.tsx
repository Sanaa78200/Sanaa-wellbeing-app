
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, RotateCcw } from 'lucide-react';

interface ChatHeaderProps {
  userName?: string;
  isMobileOptimized: boolean;
  onClose: () => void;
  onReset: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  userName, 
  isMobileOptimized, 
  onClose, 
  onReset 
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-islamic-green to-islamic-green-dark text-white">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-islamic-green" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Assistant Nutrition Islamique</h3>
          <div className="flex items-center space-x-2">
            <Badge className="bg-islamic-cream text-islamic-green text-xs">Halal & Sunna</Badge>
            {isMobileOptimized && <Badge className="bg-white/20 text-white text-xs">Mobile</Badge>}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button 
          onClick={onReset}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Réinitialiser la conversation"
          title="Nouvelle conversation"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button 
          onClick={onClose} 
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Fermer l'assistant"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
