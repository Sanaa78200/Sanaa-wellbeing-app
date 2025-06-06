
import React, { useState, useRef, useEffect } from 'react';
import { AIMessage } from '@/components/nutrition/types';
import { useUser } from '@/context/UserContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, MessageCircle, X, Smartphone, RotateCcw, Edit3, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Clé API GROQ mise à jour
const GROQ_API_KEY = "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";

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
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
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
          max_tokens: 800,
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
          {/* En-tête amélioré avec boutons d'action */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-islamic-green to-islamic-green-dark text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-islamic-green" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Assistant Nutrition Islamique</h3>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-islamic-cream text-islamic-green text-xs">Halal & Sunna</Badge>
                  {isMobileOptimized && <Badge className="bg-white/20 text-white text-xs">Mobile</Badge>}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={resetConversation}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Réinitialiser la conversation"
                title="Nouvelle conversation"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Fermer l'assistant"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Zone publicitaire préparée */}
          <div className="h-16 bg-gray-50 border-b flex items-center justify-center text-gray-400 text-sm">
            <div id="google-ads-banner" className="w-full h-full flex items-center justify-center">
              <span>Espace publicitaire (Google Ads)</span>
            </div>
          </div>
          
          {/* Messages avec hauteur adaptative */}
          <div className={`${isMobileOptimized ? 'h-full' : 'h-96'} overflow-y-auto p-4 flex flex-col gap-3 bg-islamic-pattern bg-opacity-5`}>
            {messages.length === 0 ? (
              <div className="text-center text-gray-600 my-auto p-4 bg-white/90 rounded-lg shadow-sm">
                <MessageCircle className="w-16 h-16 mx-auto mb-3 opacity-40 text-islamic-green" />
                <p className="mb-4 font-medium">السلام عليكم {userData.name || ''} ! Posez vos questions sur la nutrition halal et le bien-être selon l'Islam.</p>
                
                {showSuggestions && (
                  <div className="space-y-2 mt-4">
                    <p className="font-semibold text-islamic-green text-sm mb-3">Questions suggérées :</p>
                    {suggestedQuestions.map((q, i) => (
                      <div 
                        key={i} 
                        className="text-left text-sm p-3 bg-islamic-cream rounded-lg cursor-pointer hover:bg-islamic-cream/80 transition-colors border border-islamic-green/10"
                        onClick={() => handleSelectSuggestion(q)}
                      >
                        {q}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.role === 'user' 
                      ? 'bg-islamic-cream self-end ml-8 border-islamic-green/20' 
                      : 'bg-white self-start mr-8 border-gray-200'
                  } rounded-lg p-3 max-w-[85%] border shadow-sm animate-fade-in group relative`}
                >
                  {editingMessageId === index ? (
                    <div className="space-y-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full p-2 border rounded text-sm resize-none"
                        rows={3}
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => saveEditMessage(index)}>
                          Sauvegarder
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit}>
                          Annuler
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {msg.edited && <span className="ml-1 text-islamic-green">(modifié)</span>}
                        </span>
                        {msg.role === 'user' && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                            <button
                              onClick={() => startEditMessage(index, msg.content)}
                              className="p-1 text-gray-400 hover:text-islamic-green"
                              title="Modifier"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => deleteMessage(index)}
                              className="p-1 text-gray-400 hover:text-red-500"
                              title="Supprimer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="bg-white self-start rounded-lg p-4 mr-8 border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-5 h-5 animate-spin text-islamic-green" />
                  <span className="text-sm text-islamic-green font-medium">L'assistant réfléchit...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Zone publicitaire mobile */}
          {isMobileOptimized && (
            <div className="h-12 bg-gray-50 border-t flex items-center justify-center text-gray-400 text-xs">
              <div id="google-ads-mobile" className="w-full h-full flex items-center justify-center">
                <span>Publicité mobile</span>
              </div>
            </div>
          )}
          
          {/* Formulaire amélioré */}
          <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex gap-3">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
        </div>
      </div>
    </>
  );
};

export default AIChatbot;
