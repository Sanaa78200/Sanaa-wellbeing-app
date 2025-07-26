import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, Heart, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  url: string;
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
}

const featuredProducts: Product[] = [
  {
    id: '1',
    title: 'Tapis de Prière Islamique Premium',
    description: 'Tapis de prière doux et confortable avec motifs traditionnels pour vos moments de spiritualité quotidienne',
    price: '29,99€',
    originalPrice: '39,99€',
    rating: 4.8,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1585909695847-9c3f3c5b9b0a?w=500&h=400&fit=crop',
    url: 'https://amzn.to/4e3mISx',
    category: 'Spiritualité',
    isPopular: true
  },
  {
    id: '2',
    title: 'Coran avec Traduction Française',
    description: 'Édition de qualité supérieure avec traduction française précise et phonétique pour faciliter la lecture',
    price: '24,99€',
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=400&fit=crop',
    url: 'https://amzn.to/4e3mTgF',
    category: 'Livre',
    isNew: true
  },
  {
    id: '3',
    title: 'Encens Naturel Masjid',
    description: 'Parfum authentique et naturel pour créer une ambiance spirituelle et apaisante dans votre foyer',
    price: '15,99€',
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1612201171625-8b9c1b0b2a6b?w=500&h=400&fit=crop',
    url: 'https://amzn.to/4l049B0',
    category: 'Parfum'
  }
];

export const ProductShowcase: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-islamic-cream to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-12 w-12 text-islamic-green" />
          </div>
          <h2 className="text-3xl font-bold text-islamic-green-dark mb-4">
            Produits Islamiques Recommandés
          </h2>
          <p className="text-islamic-slate max-w-2xl mx-auto">
            Découvrez notre sélection de produits authentiques pour enrichir votre pratique spirituelle et quotidienne
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.isNew && (
                    <Badge className="bg-islamic-green text-white">Nouveau</Badge>
                  )}
                  {product.isPopular && (
                    <Badge variant="secondary" className="bg-amber-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Populaire
                    </Badge>
                  )}
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-3 text-islamic-green border-islamic-green">
                  {product.category}
                </Badge>
                
                <h3 className="font-semibold text-lg mb-2 group-hover:text-islamic-green transition-colors">
                  {product.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-200'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} avis)
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-islamic-green">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-islamic-green hover:bg-islamic-green-dark text-white group"
                  onClick={() => window.open(product.url, '_blank')}
                >
                  Voir sur Amazon
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="inline-block bg-islamic-green text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Commissions d'affiliation</h3>
              <p className="text-sm opacity-90">
                En tant que partenaire Amazon, nous recevons une commission sur les achats qualifiés.
                Cela nous aide à maintenir ce service gratuit pour vous.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;