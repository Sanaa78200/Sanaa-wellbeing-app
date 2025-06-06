
import React, { useState, useRef, useEffect } from 'react';
import { AIMessage } from '@/components/nutrition/types';
import { useUser } from '@/context/UserContext';
import { MessageCircle, Smartphone } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatForm from './ChatForm';
import { useAIChat } from './hooks/useAIChat';
import { useChatMessages } from './hooks/useChatMessages';
import { useMobileDetection } from './hooks/useMobileDetection';
import { useSuggestedQuestions } from './hooks/useSuggestedQuestions';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userData, addPoints } = useUser();
  
  const { isLoading, sendMessage } = useAIChat();
  const { isMobileOptimized } = useMobileDetection();
  const {
    messages,
    editingMessageId,
    editText,
    addMessage,
    resetConversation,
    deleteMessage,
    startEditMessage,
    saveEditMessage,
    cancelEdit,
    setEditText
  } = useChatMessages();
  const { suggestedQuestions, showSuggestions } = useSuggestedQuestions(messages.length);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);
  
  const handleSelectSuggestion = (question: string) => {
    setMessage(question);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error("Veuillez saisir votre question");
      return;
    }
    
    const userMessage: AIMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    
    addMessage(userMessage);
    const currentMessage = message;
    setMessage('');
    
    await sendMessage(currentMessage, messages, userData, (aiMessage) => {
      addMessage(aiMessage);
      addPoints(5, "Consultation assistant nutritionnel");
      
      if (messages.length === 0) {
        addPoints(10, "Première consultation assistant IA");
        toast.success("Félicitations ! Première consultation réussie !");
      }
    });
  };
  
  const chatbotClasses = `fixed inset-0 bg-black/40 z-50 transition-all duration-300 ${
    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`;
  
  const chatbotContentClasses = `fixed ${
    isMobileOptimized 
      ? 'bottom-0 left-0 right-0 w-full h-full'
      : 'bottom-4 right-4 w-96 h-[600px]'
  } bg-white ${isMobileOptimized ? '' : 'rounded-lg'} shadow-xl transform transition-transform duration-300 ${
    isOpen ? 'translate-y-0' : 'translate-y-full'
  }`;
  
  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-islamic-green text-white rounded-full p-4 shadow-lg hover:bg-islamic-green-dark transition-all duration-300 z-50 hover:scale-110"
          aria-label="Ouvrir l'assistant nutritionnel islamique"
        >
          <MessageCircle className="w-6 h-6" />
          {isMobileOptimized && (
            <Smartphone className="w-3 h-3 absolute -top-1 -right-1 bg-islamic-cream text-islamic-green rounded-full p-0.5" />
          )}
        </button>
      )}
      
      <div className={chatbotClasses} onClick={() => setIsOpen(false)}>
        <div className={chatbotContentClasses} onClick={(e) => e.stopPropagation()}>
          <ChatHeader
            userName={userData.name}
            isMobileOptimized={isMobileOptimized}
            onClose={() => setIsOpen(false)}
            onReset={resetConversation}
          />
          
          <MessageList
            messages={messages}
            isLoading={isLoading}
            isMobileOptimized={isMobileOptimized}
            showSuggestions={showSuggestions}
            userName={userData.name}
            suggestedQuestions={suggestedQuestions}
            editingMessageId={editingMessageId}
            editText={editText}
            onSelectSuggestion={handleSelectSuggestion}
            onStartEdit={startEditMessage}
            onSaveEdit={saveEditMessage}
            onCancelEdit={cancelEdit}
            onDeleteMessage={deleteMessage}
            onEditTextChange={setEditText}
            messagesEndRef={messagesEndRef}
          />
          
          <ChatForm
            message={message}
            isLoading={isLoading}
            isMobileOptimized={isMobileOptimized}
            onMessageChange={setMessage}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default AIChatbot;
