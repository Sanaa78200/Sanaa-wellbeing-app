
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Star, Zap, Heart, Users, Sparkles, ChevronRight, Check } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useUser } from '@/context/UserContext';

interface UXSuggestion {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'design' | 'accessibility' | 'gamification' | 'personalization';
  priority: 'high' | 'medium' | 'low';
  impact: string;
  implementation: string;
  icon: React.ReactNode;
  implemented?: boolean;
}

const UXSuggestions = () => {
  const { addPoints } = useUser();
  const [implementedSuggestions, setImplementedSuggestions] = useState<string[]>([]);

  const suggestions: UXSuggestion[] = [
    {
      id: '1',
      title: 'Mode Sombre Adaptatif',
      description: 'Ajout d\'un mode sombre qui s\'adapte automatiquement aux heures de prière',
      category: 'design',
      priority: 'high',
      impact: 'Améliore le confort visuel et respecte les cycles islamiques',
      implementation: 'Thème sombre activé automatiquement après Maghrib',
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: '2',
      title: 'Notifications Push Intelligentes',
      description: 'Rappels personnalisés pour les prières, dhikr et lectures du Coran',
      category: 'personalization',
      priority: 'high',
      impact: 'Augmente l\'engagement spirituel quotidien',
      implementation: 'Système de notifications contextuelles avec citations',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: '3',
      title: 'Reconnaissance Vocale Arabe',
      description: 'Possibilité de poser des questions à l\'assistant en arabe vocal',
      category: 'accessibility',
      priority: 'medium',
      impact: 'Rend l\'app accessible aux non-francophones',
      implementation: 'Intégration API de reconnaissance vocale multilingue',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: '4',
      title: 'Streaks de Bonnes Actions',
      description: 'Système de streaks pour encourager la constance dans les adorations',
      category: 'gamification',
      priority: 'high',
      impact: 'Motivation continue et habitudes durables',
      implementation: 'Compteurs visuels avec récompenses hebdomadaires',
      icon: <Star className="w-5 h-5" />
    },
    {
      id: '5',
      title: 'Optimisation Progressive',
      description: 'Chargement adaptatif selon la connexion internet',
      category: 'performance',
      priority: 'medium',
      impact: 'Meilleure expérience sur tous types de connexions',
      implementation: 'Compression d\'images et lazy loading intelligent',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: '6',
      title: 'Personnalisation par Madhab',
      description: 'Adaptation des conseils selon l\'école juridique de l\'utilisateur',
      category: 'personalization',
      priority: 'high',
      impact: 'Conseils plus précis et respectueux des différences',
      implementation: 'Base de données des avis juridiques par école',
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: '7',
      title: 'Mode Hors-ligne Intelligent',
      description: 'Fonctionnalités essentielles disponibles sans connexion',
      category: 'performance',
      priority: 'medium',
      impact: 'Continuité de service partout et tout le temps',
      implementation: 'Cache intelligent des données essentielles',
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: '8',
      title: 'Partage Social Islamique',
      description: 'Partage de versets, hadiths et conseils avec design adapté',
      category: 'design',
      priority: 'low',
      impact: 'Diffusion positive et da\'wa numérique',
      implementation: 'Templates de partage avec calligraphie arabe',
      icon: <Users className="w-5 h-5" />
    }
  ];

  const getCategoryColor = (category: UXSuggestion['category']) => {
    switch (category) {
      case 'performance': return 'bg-blue-100 text-blue-800';
      case 'design': return 'bg-purple-100 text-purple-800';
      case 'accessibility': return 'bg-green-100 text-green-800';
      case 'gamification': return 'bg-amber-100 text-amber-800';
      case 'personalization': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: UXSuggestion['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsImplemented = (suggestionId: string) => {
    setImplementedSuggestions([...implementedSuggestions, suggestionId]);
    addPoints(15, "Suggestion UX notée comme implémentée");
    toast.success("Suggestion marquée comme implémentée !", {
      description: "Merci pour votre retour sur l'amélioration UX"
    });
  };

  const highPrioritySuggestions = suggestions.filter(s => s.priority === 'high');
  const otherSuggestions = suggestions.filter(s => s.priority !== 'high');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-islamic-green to-islamic-green-dark text-white">
          <CardTitle className="flex items-center">
            <Lightbulb className="w-6 h-6 mr-2" />
            Suggestions d'Amélioration UX
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="bg-islamic-cream p-4 rounded-lg mb-6">
            <p className="text-islamic-green-dark">
              Ces suggestions sont conçues pour créer une expérience utilisateur unique, 
              harmonieuse et respectueuse des valeurs islamiques. Chaque amélioration vise 
              à renforcer votre connexion spirituelle tout en modernisant l'interface.
            </p>
          </div>

          {/* Suggestions haute priorité */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-islamic-green-dark mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Priorité Haute - Impact Maximal
            </h3>
            <div className="grid gap-4">
              {highPrioritySuggestions.map((suggestion) => (
                <div 
                  key={suggestion.id} 
                  className={`border rounded-lg p-5 transition-all hover:shadow-md ${
                    implementedSuggestions.includes(suggestion.id) 
                      ? 'bg-green-50 border-green-200' 
                      : 'border-gray-200 hover:border-islamic-green'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="text-islamic-green">
                        {suggestion.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-900">
                          {suggestion.title}
                        </h4>
                        <p className="text-gray-600 mt-1">
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                    
                    {implementedSuggestions.includes(suggestion.id) ? (
                      <Badge className="bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        Implémenté
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => markAsImplemented(suggestion.id)}
                        className="bg-islamic-green hover:bg-islamic-green-dark"
                      >
                        Marquer
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getCategoryColor(suggestion.category)}>
                      {suggestion.category}
                    </Badge>
                    <Badge className={getPriorityColor(suggestion.priority)}>
                      {suggestion.priority}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong className="text-islamic-green">Impact :</strong> 
                      <span className="ml-2">{suggestion.impact}</span>
                    </div>
                    <div>
                      <strong className="text-islamic-green">Implémentation :</strong> 
                      <span className="ml-2">{suggestion.implementation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Autres suggestions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Autres Améliorations
            </h3>
            <div className="grid gap-3">
              {otherSuggestions.map((suggestion) => (
                <div 
                  key={suggestion.id} 
                  className={`border rounded-lg p-4 transition-all hover:shadow-sm ${
                    implementedSuggestions.includes(suggestion.id) 
                      ? 'bg-green-50 border-green-200' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="text-islamic-green">
                        {suggestion.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(suggestion.priority)} size="sm">
                        {suggestion.priority}
                      </Badge>
                      {!implementedSuggestions.includes(suggestion.id) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsImplemented(suggestion.id)}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UXSuggestions;
