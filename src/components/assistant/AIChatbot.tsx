
import React, { useState, useRef, useEffect } from 'react';
import { AIMessage } from '@/components/nutrition/types';
import { useUser } from '@/context/UserContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, MessageCircle, X } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const GROQ_API_KEY = "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";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useLocalStorage<AIMessage[]>('ai-messages', []);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userData, addPoints } = useUser();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);
  
  const systemMessage = `Tu es un assistant IA islamique spécialisé dans la nutrition halal et la diététique pour les femmes musulmanes. Tu donnes des conseils basés sur les hadiths et le Coran.
  
  Informations sur l'utilisateur:
  - Nom: ${userData.name || 'Utilisateur'}
  - Genre: ${userData.gender === 'female' ? 'Femme' : userData.gender === 'male' ? 'Homme' : 'Non spécifié'}
  - Âge: ${userData.age || 'Non spécifié'}
  - Poids: ${userData.weight || 'Non spécifié'} kg
  - Taille: ${userData.height || 'Non spécifié'} cm
  - Objectif: ${userData.goal === 'lose' ? 'Perdre du poids' : userData.goal === 'gain' ? 'Prendre du poids' : 'Maintenir le poids'}
  - Préférences alimentaires: ${userData.preferences?.halal ? 'Halal' : ''} ${userData.preferences?.vegetarian ? ', Végétarien' : ''} ${userData.preferences?.vegan ? ', Végétalien' : ''}
  - Allergies: ${userData.preferences?.allergies?.join(', ') || 'Aucune'}
  
  Réponds toujours en français et de manière respectueuse. Utilise des sources islamiques fiables quand c'est pertinent. Focalise-toi sur les conseils nutritionnels halal adaptés à son profil.`;
  
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
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-chat',
          messages: [
            {
              role: 'system',
              content: systemMessage
            },
            ...messages.map(msg => ({
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
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }
      
      const data = await response.json();
      const aiMessage: AIMessage = {
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      addPoints(5, "Interaction avec l'assistant nutritionnel");
      
    } catch (error) {
      console.error('Erreur lors de la requête à Groq:', error);
      toast.error("Erreur de connexion à l'assistant", {
        description: "Veuillez réessayer plus tard."
      });
      
      // Message d'erreur de repli
      const fallbackMessage: AIMessage = {
        role: 'assistant',
        content: "Je suis désolé, je rencontre des difficultés à me connecter. Pourriez-vous réessayer plus tard? Entre-temps, n'oubliez pas de suivre les principes alimentaires halal et de maintenir une alimentation équilibrée.",
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      {/* Bouton flottant pour ouvrir le chatbot */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 bg-islamic-green text-white rounded-full p-3 shadow-lg hover:bg-islamic-green-dark transition-colors z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
      
      {/* Interface du chatbot */}
      <div className={`fixed inset-0 bg-black bg-opacity-30 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed bottom-0 right-0 w-full sm:w-96 bg-white rounded-t-lg shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          {/* En-tête */}
          <div className="flex justify-between items-center p-3 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-islamic-green flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium">Assistant Nutritionnel</h3>
                <Badge className="bg-islamic-green-dark text-xs">Halal & Sunna</Badge>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 my-auto">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>Posez une question sur la nutrition halal ou demandez des conseils diététiques basés sur la Sunna.</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.role === 'user' 
                      ? 'bg-islamic-cream self-end ml-12' 
                      : 'bg-gray-100 self-start mr-12'
                  } rounded-lg p-3 max-w-[80%]`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
            {isLoading && (
              <div className="bg-gray-100 self-start rounded-lg p-3 mr-12">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">En train d'écrire...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Posez votre question sur la nutrition halal..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !message.trim()}>
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AIChatbot;
