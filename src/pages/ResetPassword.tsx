import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  useEffect(() => {
    console.log('Tokens reçus:', { accessToken: !!accessToken, refreshToken: !!refreshToken });
    
    // Si nous avons les tokens, les définir dans la session
    if (accessToken && refreshToken) {
      console.log('Tentative de définition de la session...');
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      }).then(({ data, error }) => {
        if (error) {
          console.error('Erreur lors de la définition de la session:', error);
          toast.error('Lien de réinitialisation invalide ou expiré. Veuillez demander un nouveau lien.');
        } else {
          console.log('Session définie avec succès:', data);
          toast.success('Vous pouvez maintenant définir votre nouveau mot de passe');
        }
      });
    } else {
      console.log('Aucun token trouvé dans l\'URL');
      toast.error('Lien de réinitialisation manquant. Veuillez cliquer sur le lien reçu par email.');
    }
  }, [accessToken, refreshToken]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        toast.error(error.message || 'Erreur lors de la mise à jour du mot de passe');
      } else {
        toast.success('Mot de passe mis à jour avec succès !');
        navigate('/');
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du mot de passe');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-green/10 to-islamic-gold/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-islamic-green/10 rounded-full flex items-center justify-center mb-4">
              <KeyRound className="h-6 w-6 text-islamic-green" />
            </div>
            <CardTitle className="text-2xl font-bold text-islamic-green">
              Nouveau mot de passe
            </CardTitle>
            <CardDescription>
              Saisissez votre nouveau mot de passe
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!accessToken ? (
              <Alert className="mb-6">
                <AlertDescription>
                  Lien de réinitialisation invalide ou expiré. 
                  <Link to="/auth" className="text-islamic-green hover:underline ml-1">
                    Demandez un nouveau lien
                  </Link>
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Nouveau mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
                </Button>
              </form>
            )}
            
            <div className="mt-6 text-center">
              <Button variant="ghost" asChild>
                <Link to="/auth" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Retour à la connexion
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;