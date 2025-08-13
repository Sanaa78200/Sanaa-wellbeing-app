import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Book, Heart, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const Auth = () => {
  const { user, signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', name: '' });
  const [resetEmail, setResetEmail] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(loginData.email, loginData.password);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Connexion réussie !');
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(signupData.email, signupData.password, signupData.name);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Compte créé ! Vérifiez votre email.');
    }
    
    setLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    
    try {
      const { error } = await resetPassword(resetEmail);
      
      if (error) {
        toast.error(error.message || 'Erreur lors de l\'envoi de l\'email');
      } else {
        toast.success('Email de réinitialisation envoyé ! Vérifiez votre boîte mail.');
        setResetEmail('');
      }
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'email');
    }
    
    setResetLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-green/10 to-islamic-gold/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Bannière accès gratuit */}
        <Alert className="border-islamic-green bg-islamic-green/5">
          <Heart className="h-4 w-4 text-islamic-green" />
          <AlertDescription className="text-center text-lg font-medium">
            🎉 <span className="text-islamic-green font-bold">ACCÈS 100% GRATUIT</span> à tous nos contenus islamiques ! 
            Coran, nutrition, prières et bien plus encore.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Formulaire d'authentification */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-islamic-green">Sanaa Bien-être</CardTitle>
              <CardDescription>Votre plateforme islamique gratuite</CardDescription>
              <Badge variant="secondary" className="mx-auto">
                <MessageCircle className="h-3 w-3 mr-1" />
                Commentaires disponibles après inscription
              </Badge>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="signup">Inscription</TabsTrigger>
                  <TabsTrigger value="reset">Réinitialiser</TabsTrigger>
                </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="votre@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Mot de passe</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </form>
            </TabsContent>
            
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Nom</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Votre nom"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="votre@email.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Mot de passe</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Création...' : 'Créer un compte GRATUIT'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="reset">
                  <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="votre@email.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={resetLoading}>
                      {resetLoading ? 'Envoi...' : 'Réinitialiser le mot de passe'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Section livres et ressources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-islamic-green">
                <Book className="h-5 w-5" />
                Ressources Islamiques
              </CardTitle>
              <CardDescription>
                Accédez à nos ressources spirituelles recommandées
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Link 
                  to="https://amzn.to/46uPNoi" 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-islamic-green/5 transition-colors"
                  target="_blank"
                >
                  <div>
                    <h3 className="font-medium">Coran Audio & Texte</h3>
                    <p className="text-sm text-muted-foreground">Version complète avec traduction</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-islamic-green" />
                </Link>

                <Link 
                  to="https://amzn.to/4700GhU" 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-islamic-green/5 transition-colors"
                  target="_blank"
                >
                  <div>
                    <h3 className="font-medium">Miswak Traditionnel</h3>
                    <p className="text-sm text-muted-foreground">Hygiène dentaire selon la Sunna</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-islamic-green" />
                </Link>

                <div className="pt-3 border-t">
                  <p className="text-sm text-center text-muted-foreground">
                    Plus de ressources disponibles après inscription
                  </p>
                  <div className="mt-2 flex justify-center gap-2">
                    <Link to="/coran" className="text-xs text-islamic-green hover:underline">Coran</Link>
                    <span className="text-xs">•</span>
                    <Link to="/prieres" className="text-xs text-islamic-green hover:underline">Prières</Link>
                    <span className="text-xs">•</span>
                    <Link to="/nutrition-regime" className="text-xs text-islamic-green hover:underline">Nutrition</Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;