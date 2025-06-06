
import { useState } from 'react';
import { AIMessage } from '@/components/nutrition/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/components/ui/sonner';

export const useChatMessages = () => {
  const [messages, setMessages] = useLocalStorage<AIMessage[]>('ai-messages', []);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const addMessage = (message: AIMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const resetConversation = () => {
    setMessages([]);
    setEditingMessageId(null);
    toast.success("Conversation réinitialisée");
  };

  const deleteMessage = (index: number) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
    toast.success("Message supprimé");
  };

  const startEditMessage = (index: number, content: string) => {
    setEditingMessageId(index);
    setEditText(content);
  };

  const saveEditMessage = (index: number) => {
    const updatedMessages = [...messages];
    updatedMessages[index] = {
      ...updatedMessages[index],
      content: editText,
      timestamp: new Date().toISOString(),
      edited: true
    };
    setMessages(updatedMessages);
    setEditingMessageId(null);
    setEditText('');
    toast.success("Message modifié");
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditText('');
  };

  return {
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
  };
};
