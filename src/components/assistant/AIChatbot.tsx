
import React, { useState, useRef, useEffect } from 'react';
import { AIMessage } from '@/components/nutrition/types';
import { useUser } from '@/context/UserContext';
import { MessageCircle, Smartphone } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatForm from './ChatForm';

// Questions suggérées
const suggestedQuestions = [
  "Quels aliments halal pour perdre du poids ?",
  "Comment bien s'alimenter pendant le Ramadan ?",
  "Quelles sont les meilleures protéines halal ?",
  "Comment créer un menu équilibré selon la Sunna ?",
  "Quels aliments donnent de l'énergie selon l'Islam ?"
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useLocalStorage<AIMessage[]>('ai-messages', []);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isMobileOptimized, setIsMobileOptimized] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userData, addPoints } = useUser();
  
  // Récupération de la clé API
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
    
    // Clé par défaut si pas trouvée
    console.log('🔑 Utilisation clé par défaut');
    return "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";
  };
  
  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileOptimized(isMobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);
  
  useEffect(() => {
    if (messages.length > 2) {
      setShowSuggestions(false);
    }
  }, [messages.length]);

  // Système de prompt simplifié
  const getSystemMessage = () => {
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

  // Réinitialiser la conversation
  const resetConversation = () => {
    setMessages([]);
    setShowSuggestions(true);
    setEditingMessageId(null);
    toast.success("Conversation réinitialisée");
  };

  // Supprimer un message
  const deleteMessage = (index: number) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
    toast.success("Message supprimé");
  };

  // Modifier un message
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
  
  const handleSelectSuggestion = (question: string) => {
    setMessage(question);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error("Veuillez saisir votre question");
      return;
    }
    
    const apiKey = getApiKey();
    if (!apiKey) {
      toast.error("Clé API manquante");
      return;
    }
    
    console.log('📤 Envoi message:', message);
    
    const userMessage: AIMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      // Préparer l'historique des messages pour l'API
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      const requestBody = {
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: getSystemMessage()
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
      
      setMessages(prev => [...prev, aiMessage]);
      addPoints(5, "Consultation assistant nutritionnel");
      
      // Bonus première consultation
      if (messages.length === 0) {
        addPoints(10, "Première consultation assistant IA");
        toast.success("Félicitations ! Première consultation réussie !");
      }
      
      toast.success("Réponse reçue !");
      
    } catch (error) {
      console.error('💥 Erreur complète:', error);
      
      toast.error("Erreur de connexion", {
        description: "Vérifiez votre clé API dans les paramètres"
      });
      
      // Message de fallback
      const fallbackMessage: AIMessage = {
        role: 'assistant',
        content: "السلام عليكم، je rencontre des difficultés techniques temporaires. Vérifiez que votre clé API GROQ est bien configurée dans les paramètres. En attendant, rappelez-vous que selon la Sunna, il est recommandé de manger avec modération et de privilégier les aliments naturels et halal. بارك الله فيكم",
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Styles adaptatifs
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
      {/* Bouton flottant */}
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
      
      {/* Interface chatbot */}
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
