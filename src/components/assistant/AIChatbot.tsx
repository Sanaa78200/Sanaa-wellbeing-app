
import React, { useState, useRef, useEffect } from 'react';
import { AIMessage } from '@/components/nutrition/types';
import { useUser } from '@/context/UserContext';
import { MessageCircle, Smartphone } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatForm from './ChatForm';

// Nouvelle clé API GROQ mise à jour
const GROQ_API_KEY = "gsk_Y8qGXnZ4KrFwJ9PvH2mLWGdyb3FYeKpN7QsRt5AcB8xD1fE0vW6uI9oT3hM2jL";

// Questions suggérées optimisées pour mobile
const suggestedQuestions = [
  "Alimentation halal pour perdre du poids ?",
  "Conseils nutrition pendant Ramadan ?",
  "Protéines halal recommandées ?",
  "Menu équilibré selon la Sunna ?",
  "Aliments énergétiques islamiques ?"
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useLocalStorage<AIMessage[]>('ai-messages', []);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isMobileOptimized, setIsMobileOptimized] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userData, addPoints } = useUser();
  
  // Détection mobile améliorée
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
    if (messages.length > 3) {
      setShowSuggestions(false);
    }
  }, [messages.length]);

  // Réinitialiser la conversation
  const resetConversation = () => {
    setMessages([]);
    setShowSuggestions(true);
    setEditingMessageId(null);
    setRetryCount(0);
    toast.success("Conversation réinitialisée", {
      description: "Nouvelle conversation démarrée"
    });
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
  
  // Système de prompts amélioré avec données utilisateur en temps réel
  const getSystemMessage = () => {
    const userInfo = `
    Informations utilisateur (mises à jour en temps réel):
    - Nom: ${userData.name || 'Utilisateur'}
    - Genre: ${userData.gender === 'female' ? 'Femme' : userData.gender === 'male' ? 'Homme' : 'Non spécifié'}
    - Âge: ${userData.age || 'Non spécifié'} ans
    - Poids: ${userData.weight || 'Non spécifié'} kg
    - Taille: ${userData.height || 'Non spécifié'} cm
    - Objectif: ${userData.goal === 'lose' ? 'Perdre du poids' : userData.goal === 'gain' ? 'Prendre du poids' : 'Maintenir le poids'}
    - Préférences: ${userData.preferences?.halal ? 'Halal' : ''} ${userData.preferences?.vegetarian ? ', Végétarien' : ''} ${userData.preferences?.vegan ? ', Végétalien' : ''}
    - Allergies: ${userData.preferences?.allergies?.join(', ') || 'Aucune'}
    - Points de gamification: ${userData.gamification?.points || 0}
    - Niveau: ${userData.gamification?.level || 1}
    - Streak: ${userData.gamification?.streak || 0} jours
    `;

    return `Tu es un assistant IA islamique spécialisé dans la nutrition halal, la diététique et le bien-être selon les enseignements de l'Islam.
    
    ${userInfo}
    
    DIRECTIVES IMPORTANTES:
    - Réponds TOUJOURS en français
    - Reste dans le domaine de la nutrition, santé et bien-être islamique
    - Utilise des références au Coran et à la Sunna quand approprié
    - Sois bienveillant et respectueux des valeurs islamiques
    - Adapte tes conseils au profil de l'utilisateur mis à jour en temps réel
    - Suggère des aliments halal et des habitudes saines selon l'Islam
    - Si on te pose des questions hors sujet, redirige poliment vers la nutrition/santé islamique
    - Prends en compte les données de gamification pour encourager l'utilisateur`;
  };
  
  const handleSelectSuggestion = (question: string) => {
    setMessage(question);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const userMessage: AIMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      console.log('Envoi de la requête à GROQ API...');
      console.log('Message:', message);
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content: getSystemMessage()
            },
            ...messages.slice(-8).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 0.9,
        }),
      });
      
      console.log('Statut de la réponse:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur API:', response.status, errorText);
        throw new Error(`Erreur API: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Réponse reçue de GROQ:', data);
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Format de réponse invalide');
      }
      
      const aiMessage: AIMessage = {
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      addPoints(5, "Consultation assistant nutritionnel");
      setRetryCount(0);
      
      if (messages.length === 1) {
        addPoints(10, "Première consultation assistant IA");
        toast.success("Félicitations !", {
          description: "Première consultation avec l'assistant nutritionnel islamique !",
        });
      }
      
    } catch (error) {
      console.error('Erreur complète:', error);
      
      if (retryCount < 2) {
        setRetryCount(prev => prev + 1);
        toast.error("Connexion en cours...", {
          description: `Nouvelle tentative ${retryCount + 1}/3`,
          duration: 2000,
        });
        
        setTimeout(() => {
          handleSubmit(e);
        }, 2000);
        return;
      }
      
      toast.error("Assistant temporairement indisponible", {
        description: "Vérifiez votre connexion internet et réessayez",
        duration: 4000,
      });
      
      const fallbackMessage: AIMessage = {
        role: 'assistant',
        content: "السلام عليكم، je rencontre des difficultés techniques temporaires. En attendant, rappelez-vous que selon la Sunna, il est recommandé de manger avec modération et de privilégier les aliments naturels et halal. Réessayez dans quelques instants, بإذن الله.",
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
      setRetryCount(0);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Styles adaptatifs pour mobile
  const chatbotClasses = `fixed inset-0 bg-black/40 z-50 transition-all duration-300 ${
    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`;
  
  const chatbotContentClasses = `fixed ${
    isMobileOptimized 
      ? 'bottom-0 left-0 right-0 w-full h-full'
      : 'bottom-0 right-0 w-full sm:w-96 h-full sm:h-auto'
  } bg-white ${isMobileOptimized ? '' : 'rounded-t-lg'} shadow-xl transform transition-transform duration-300 ${
    isOpen ? 'translate-y-0' : 'translate-y-full'
  }`;
  
  return (
    <>
      {/* Bouton flottant optimisé mobile */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 bg-islamic-green text-white rounded-full p-3 shadow-lg hover:bg-islamic-green-dark transition-all duration-300 z-50 animate-bounce hover:scale-110"
          aria-label="Ouvrir l'assistant nutritionnel islamique"
        >
          <MessageCircle className="w-6 h-6" />
          {isMobileOptimized && (
            <Smartphone className="w-3 h-3 absolute -top-1 -right-1 bg-islamic-cream text-islamic-green rounded-full p-0.5" />
          )}
        </button>
      )}
      
      {/* Interface chatbot améliorée */}
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
