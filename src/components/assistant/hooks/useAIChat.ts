
import { useState } from 'react';
import { AIMessage } from '@/components/nutrition/types';
import { toast } from '@/components/ui/sonner';

export const useAIChat = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getApiKey = () => {
    try {
      const storedKeys = localStorage.getItem('secure-api-keys');
      if (storedKeys) {
        const keys = JSON.parse(storedKeys);
        const groqKey = keys.find((k: any) => k.service.toLowerCase() === 'groq');
        if (groqKey?.key) {
          console.log('✅ Clé API GROQ trouvée');
          return groqKey.key;
        }
      }
    } catch (error) {
      console.error('❌ Erreur récupération clé API:', error);
    }
    
    console.log('🔑 Utilisation clé par défaut');
    return "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";
  };

  const getSystemMessage = (userData: any) => {
    const userInfo = userData.name ? `L'utilisateur s'appelle ${userData.name}. ` : '';
    const goalInfo = userData.goal ? `Son objectif est de ${userData.goal === 'lose' ? 'perdre du poids' : userData.goal === 'gain' ? 'prendre du poids' : 'maintenir son poids'}. ` : '';
    
    return `Tu es un assistant IA spécialisé dans la nutrition halal et le bien-être selon l'Islam.

${userInfo}${goalInfo}

DIRECTIVES IMPORTANTES:
- Réponds TOUJOURS en français
- Reste dans le domaine nutrition, santé et bien-être islamique
- Utilise des références au Coran et à la Sunna quand approprié
- Sois bienveillant et respectueux des valeurs islamiques
- Donne des conseils pratiques et réalisables
- Suggère des aliments halal uniquement`;
  };

  const sendMessage = async (
    message: string, 
    messages: AIMessage[], 
    userData: any,
    onSuccess: (response: AIMessage) => void
  ) => {
    const apiKey = getApiKey();
    if (!apiKey) {
      toast.error("Clé API manquante");
      return;
    }
    
    console.log('📤 Envoi message:', message);
    setIsLoading(true);
    
    try {
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      const requestBody = {
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: getSystemMessage(userData)
          },
          ...conversationHistory,
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
        top_p: 0.9
      };
      
      console.log('📋 Requête API:', requestBody);
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('📈 Statut réponse:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur API:', response.status, errorText);
        throw new Error(`Erreur API ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('📊 Réponse complète:', data);
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Réponse invalide de l\'API');
      }
      
      const aiMessage: AIMessage = {
        role: 'assistant',
        content: data.choices[0].message.content.trim(),
        timestamp: new Date().toISOString()
      };
      
      onSuccess(aiMessage);
      toast.success("Réponse reçue !");
      
    } catch (error) {
      console.error('💥 Erreur complète:', error);
      
      toast.error("Erreur de connexion", {
        description: "Vérifiez votre clé API dans les paramètres"
      });
      
      const fallbackMessage: AIMessage = {
        role: 'assistant',
        content: "السلام عليكم، je rencontre des difficultés techniques temporaires. Vérifiez que votre clé API GROQ est bien configurée dans les paramètres. En attendant, rappelez-vous que selon la Sunna, il est recommandé de manger avec modération et de privilégier les aliments naturels et halal. بارك الله فيكم",
        timestamp: new Date().toISOString()
      };
      
      onSuccess(fallbackMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    sendMessage
  };
};
