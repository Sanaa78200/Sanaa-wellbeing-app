
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Star, 
  Smartphone, 
  Palette, 
  Zap, 
  Users, 
  MessageCircle,
  TrendingUp,
  Bell,
  Settings
} from 'lucide-react';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  icon: React.ReactNode;
  votes: number;
  implemented?: boolean;
}

const UXSuggestions = () => {
  const [suggestions] = React.useState<Suggestion[]>([
    {
      id: '1',
      title: 'Mode sombre adaptatif',
      description: 'Ajout d\'un mode sombre qui s\'adapte automatiquement à l\'heure de la journée et aux habitudes de l\'utilisateur.',
      impact: 'high',
      category: 'Interface',
      icon: <Palette className="w-4 h-4" />,
      votes: 127
    },
    {
      id: '2',
      title: 'Rappels personnalisés',
      description: 'Notifications intelligentes basées sur les habitudes alimentaires et les horaires de prière.',
      impact: 'high',
      category: 'Notifications',
      icon: <Bell className="w-4 h-4" />,
      votes: 98
    },
    {
      id: '3',
      title: 'Widget de progression',
      description: 'Widget d\'accueil montrant les objectifs quotidiens et la progression spirituelle.',
      impact: 'medium',
      category: 'Dashboard',
      icon: <TrendingUp className="w-4 h-4" />,
      votes: 85
    },
    {
      id: '4',
      title: 'Partage communautaire',
      description: 'Possibilité de partager ses recettes halal et conseils nutritionnels avec la communauté.',
      impact: 'medium',
      category: 'Social',
      icon: <Users className="w-4 h-4" />,
      votes: 73
    },
    {
      id: '5',
      title: 'Assistant vocal',
      description: 'Commandes vocales pour ajouter des repas et consulter les informations rapidement.',
      impact: 'high',
      category: 'Accessibilité',
      icon: <MessageCircle className="w-4 h-4" />,
      votes: 156
    },
    {
      id: '6',
      title: 'Optimisation mobile',
      description: 'Interface mobile plus fluide avec gestures intuitifs et navigation simplifiée.',
      impact: 'high',
      category: 'Mobile',
      icon: <Smartphone className="w-4 h-4" />,
      votes: 142
    },
    {
      id: '7',
      title: 'Raccourcis clavier',
      description: 'Shortcuts pour les actions fréquentes : ajout rapide de repas, navigation, etc.',
      impact: 'low',
      category: 'Productivité',
      icon: <Zap className="w-4 h-4" />,
      votes: 34
    },
    {
      id: '8',
      title: 'Personnalisation avancée',
      description: 'Thèmes personnalisables, disposition des widgets et préférences d\'affichage.',
      impact: 'medium',
      category: 'Personnalisation',
      icon: <Settings className="w-4 h-4" />,
      votes: 67
    }
  ]);

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Interface': 'bg-purple-100 text-purple-800',
      'Notifications': 'bg-blue-100 text-blue-800',
      'Dashboard': 'bg-indigo-100 text-indigo-800',
      'Social': 'bg-pink-100 text-pink-800',
      'Accessibilité': 'bg-green-100 text-green-800',
      'Mobile': 'bg-orange-100 text-orange-800',
      'Productivité': 'bg-cyan-100 text-cyan-800',
      'Personnalisation': 'bg-amber-100 text-amber-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleVote = (suggestionId: string) => {
    console.log(`Vote pour la suggestion ${suggestionId}`);
    // Ici on pourrait implémenter la logique de vote
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-islamic-green to-islamic-green-dark text-white">
        <CardTitle className="flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          Suggestions d'Amélioration UX
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-blue-800">
            <strong>Votre avis compte !</strong> Votez pour les améliorations que vous souhaitez voir en priorité. 
            Vos retours nous aident à créer une meilleure expérience utilisateur.
          </p>
        </div>

        <div className="grid gap-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {suggestion.icon}
                  <h3 className="font-semibold text-lg">{suggestion.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getImpactColor(suggestion.impact)}>
                    {suggestion.impact}
                  </Badge>
                  <Badge className={getCategoryColor(suggestion.category)}>
                    {suggestion.category}
                  </Badge>
                </div>
              </div>
              
              <p className="text-gray-600 mb-3">{suggestion.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Star className="w-4 h-4" />
                  <span>{suggestion.votes} votes</span>
                </div>
                
                <Button 
                  onClick={() => handleVote(suggestion.id)}
                  variant="outline"
                  className="hover:bg-islamic-green hover:text-white transition-colors"
                >
                  👍 Voter
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-islamic-cream rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-islamic-green" />
            Suggérer une amélioration
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Vous avez une idée pour améliorer l'application ? Partagez-la avec nous !
          </p>
          <Button className="bg-islamic-green hover:bg-islamic-green-dark">
            Proposer une idée
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UXSuggestions;
