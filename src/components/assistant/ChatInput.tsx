
import React from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  message: string;
  isLoading: boolean;
  isMobile: boolean;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  isLoading,
  isMobile,
  onMessageChange,
  onSendMessage
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
      <div className="flex gap-3">
        <Input
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            isMobile 
              ? "Votre question..." 
              : "Posez votre question sur la nutrition halal..."
          }
          disabled={isLoading}
          className="flex-1 border-islamic-green/30 focus-visible:ring-islamic-green"
          aria-label="Saisir une question sur la nutrition islamique"
        />
        
        <Button 
          type="submit" 
          size="icon" 
          className="bg-islamic-green hover:bg-islamic-green-dark transition-colors"
          disabled={isLoading || !message.trim()}
          aria-label="Envoyer la question"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
