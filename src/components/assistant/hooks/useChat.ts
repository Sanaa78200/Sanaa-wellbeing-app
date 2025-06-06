
import { useState } from 'react';
import { AIMessage } from '@/components/nutrition/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAIService } from './useAIService';

export const useChat = () => {
  const [messages, setMessages] = useLocalStorage<AIMessage[]>('ai-chat-messages', []);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessageToAI } = useAIService();

  const addMessage = (newMessage: AIMessage) => {
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = async (content: string, userData: any) => {
    const userMessage: AIMessage = {
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };

    addMessage(userMessage);
    setMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToAI(content, messages, userData);
      addMessage(aiResponse);
    } catch (error) {
      console.error('Erreur envoi message:', error);
      
      const fallbackMessage: AIMessage = {
        role: 'assistant',
        content: "السلام عليكم، je rencontre des difficultés techniques temporaires. Veuillez réessayer dans quelques instants. En attendant, rappelez-vous que selon la Sunna, il est recommandé de manger avec modération et de privilégier les aliments naturels et halal. بارك الله فيكم",
        timestamp: new Date().toISOString()
      };
      
      addMessage(fallbackMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const deleteMessage = (index: number) => {
    setMessages(prev => prev.filter((_, i) => i !== index));
  };

  const editMessage = (index: number, newContent: string) => {
    setMessages(prev => prev.map((msg, i) => 
      i === index 
        ? { ...msg, content: newContent, edited: true, timestamp: new Date().toISOString() }
        : msg
    ));
  };

  return {
    messages,
    message,
    isLoading,
    setMessage,
    sendMessage,
    clearMessages,
    deleteMessage,
    editMessage
  };
};
