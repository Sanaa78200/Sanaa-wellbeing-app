
import { AIMessage } from '@/components/nutrition/types';
import { supabase } from '@/integrations/supabase/client';

export const useAIService = () => {
  const sendMessageToAI = async (
    message: string,
    conversationHistory: AIMessage[],
    userData: any
  ): Promise<AIMessage> => {
    console.log('📤 Envoi message via Edge Function:', message);

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error("Vous devez être connecté pour utiliser le chat");
    }

    const response = await supabase.functions.invoke('chat-ai', {
      body: {
        message,
        conversationHistory,
        userData
      }
    });

    if (response.error) {
      console.error('❌ Erreur Edge Function:', response.error);
      throw new Error(response.error.message || 'Erreur du service de chat');
    }

    console.log('📊 Réponse reçue via Edge Function');
    return response.data;
  };

  return {
    sendMessageToAI
  };
};
