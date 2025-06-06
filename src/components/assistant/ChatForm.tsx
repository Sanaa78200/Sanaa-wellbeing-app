
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';

interface ChatFormProps {
  message: string;
  isLoading: boolean;
  isMobileOptimized: boolean;
  onMessageChange: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({
  message,
  isLoading,
  isMobileOptimized,
  onMessageChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t bg-white flex gap-3">
      <Input
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder={isMobileOptimized ? "Votre question..." : "Posez votre question sur la nutrition halal..."}
        disabled={isLoading}
        className="flex-1 border-islamic-green/30 focus-visible:ring-islamic-green text-sm"
        aria-label="Saisir une question sur la nutrition islamique"
      />
      <Button 
        type="submit" 
        size="icon" 
        className="bg-islamic-green hover:bg-islamic-green-dark transition-colors"
        disabled={isLoading || !message.trim()}
        aria-label="Envoyer la question"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
      </Button>
    </form>
  );
};

export default ChatForm;
