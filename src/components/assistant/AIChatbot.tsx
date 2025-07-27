
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Smartphone, X } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/sonner';
import { AIMessage } from '@/components/nutrition/types';
import ChatWindow from './ChatWindow';
import { useChat } from './hooks/useChat';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userData, addPoints } = useUser();
  const { user } = useAuth();
  
  const {
    messages,
    message,
    isLoading,
    setMessage,
    sendMessage,
    clearMessages,
    deleteMessage,
    editMessage
  } = useChat();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Veuillez saisir votre question");
      return;
    }

    if (!user) {
      toast.error("Veuillez vous connecter pour utiliser le chat");
      return;
    }

    try {
      const isFirstMessage = messages.length === 0;
      await sendMessage(message, userData);
      
      addPoints(5, "Consultation assistant nutritionnel");
      
      if (isFirstMessage) {
        addPoints(10, "Première consultation assistant IA");
        toast.success("Félicitations ! Première consultation réussie !");
      }
    } catch (error) {
      console.error('Erreur envoi message:', error);
      toast.error("Erreur lors de l'envoi du message");
    }
  };

  const handleReset = () => {
    clearMessages();
    toast.success("Conversation réinitialisée");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-islamic-green text-white rounded-full p-4 shadow-lg hover:bg-islamic-green-dark transition-all duration-300 z-50 hover:scale-110"
        aria-label="Ouvrir l'assistant nutritionnel islamique"
      >
        <MessageCircle className="w-6 h-6" />
        {isMobile && (
          <Smartphone className="w-3 h-3 absolute -top-1 -right-1 bg-islamic-cream text-islamic-green rounded-full p-0.5" />
        )}
      </button>
    );
  }

  const chatClasses = `fixed inset-0 bg-black/40 z-50 transition-all duration-300`;
  const windowClasses = `fixed ${
    isMobile 
      ? 'bottom-0 left-0 right-0 w-full h-full'
      : 'bottom-4 right-4 w-96 h-[600px]'
  } bg-white ${isMobile ? '' : 'rounded-lg'} shadow-xl transform transition-transform duration-300`;

  return (
    <div className={chatClasses} onClick={() => setIsOpen(false)}>
      <div className={windowClasses} onClick={(e) => e.stopPropagation()}>
        <ChatWindow
          messages={messages}
          message={message}
          isLoading={isLoading}
          isMobile={isMobile}
          userName={userData.name}
          messagesEndRef={messagesEndRef}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}
          onClose={() => setIsOpen(false)}
          onReset={handleReset}
          onDeleteMessage={deleteMessage}
          onEditMessage={editMessage}
        />
      </div>
    </div>
  );
};

export default AIChatbot;
