
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star } from 'lucide-react';

interface AmazonProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  url: string;
  category: string;
}

interface AmazonProductsProps {
  layout?: 'horizontal' | 'vertical' | 'grid';
  maxProducts?: number;
  className?: string;
}

// Produits Amazon basés sur vos liens
const amazonProducts: AmazonProduct[] = [
  {
    id: '1',
    title: 'Tapis de Prière Islamique Premium',
    description: 'Tapis de prière doux et confortable pour vos moments de spiritualité',
    price: '29,99€',
    rating: 4.8,
    image: '/placeholder.svg',
    url: 'https://amzn.to/4e3mISx',
    category: 'Spiritualité'
  },
  {
    id: '2',
    title: 'Coran avec Traduction Française',
    description: 'Édition de qualité avec traduction et phonétique',
    price: '24,99€',
    rating: 4.9,
    image: '/placeholder.svg',
    url: 'https://amzn.to/4e3mTgF',
    category: 'Livre'
  },
  {
    id: '3',
    title: 'Encens Naturel Masjid',
    description: 'Parfum authentique pour créer une ambiance spirituelle',
    price: '15,99€',
    rating: 4.7,
    image: '/placeholder.svg',
    url: 'https://amzn.to/4l049B0',
    category: 'Parfum'
  },
  {
    id: '4',
    title: 'Chapelet Tasbih en Bois',
    description: 'Chapelet traditionnel en bois naturel de qualité',
    price: '12,99€',
    rating: 4.6,
    image: '/placeholder.svg',
    url: 'https://amzn.to/45oRjYz',
    category: 'Accessoire'
  },
  {
    id: '5',
    title: 'Horloge Azan Digitale',
    description: 'Horloge avec appel à la prière automatique',
    price: '49,99€',
    rating: 4.5,
    image: '/placeholder.svg',
    url: 'https://amzn.to/3HFW0Do',
    category: 'Électronique'
  },
  {
    id: '6',
    title: 'Livre de Dua et Invocations',
    description: 'Recueil complet des invocations quotidiennes',
    price: '18,99€',
    rating: 4.8,
    image: '/placeholder.svg',
    url: 'https://amzn.to/4n4GqS0',
    category: 'Livre'
  }
];

export const AmazonProducts: React.FC<AmazonProductsProps> = ({
  layout = 'horizontal',
  maxProducts = 3,
  className = ''
}) => {
  const displayProducts = amazonProducts.slice(0, maxProducts);

  if (layout === 'horizontal') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {displayProducts.map((product) => (
            <Card key={product.id} className="min-w-[280px] flex-shrink-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-md bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <Badge variant="secondary" className="text-xs mb-1">
                      {product.category}
                    </Badge>
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                      {product.title}
                    </h4>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-islamic-green">{product.price}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 text-xs"
                        onClick={() => window.open(product.url, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (layout === 'grid') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {displayProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-32 object-cover rounded-md bg-gray-100 mb-3"
              />
              <Badge variant="secondary" className="text-xs mb-2">
                {product.category}
              </Badge>
              <h4 className="font-medium text-sm mb-2 line-clamp-2">
                {product.title}
              </h4>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">{product.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-islamic-green">{product.price}</span>
                <Button
                  size="sm"
                  onClick={() => window.open(product.url, '_blank')}
                  className="bg-islamic-green hover:bg-islamic-green-dark"
                >
                  Voir sur Amazon
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {displayProducts.map((product) => (
        <Card key={product.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <img
                src={product.image}
                alt={product.title}
                className="w-12 h-12 object-cover rounded bg-gray-100"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-xs line-clamp-1 mb-1">
                  {product.title}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-islamic-green">{product.price}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs"
                    onClick={() => window.open(product.url, '_blank')}
                  >
                    Voir <ExternalLink className="w-2 h-2 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Composants spécialisés pour différents emplacements
export const NavbarAmazonBanner: React.FC = () => (
  <div className="w-full h-8 bg-gradient-to-r from-islamic-cream to-islamic-green/10 border-b flex items-center justify-center">
    <div className="container mx-auto px-4">
      <AmazonProducts layout="horizontal" maxProducts={6} />
    </div>
  </div>
);

export const MainAmazonBanner: React.FC = () => (
  <Card className="overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-islamic-green to-islamic-green-dark text-white py-3">
      <CardTitle className="text-lg">🛍️ Produits Recommandés Amazon</CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <AmazonProducts layout="grid" maxProducts={6} />
    </CardContent>
  </Card>
);

export const SidebarAmazonProducts: React.FC = () => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-sm text-islamic-green">Produits Islamiques</CardTitle>
    </CardHeader>
    <CardContent className="pt-0">
      <AmazonProducts layout="vertical" maxProducts={4} />
    </CardContent>
  </Card>
);

export default AmazonProducts;
