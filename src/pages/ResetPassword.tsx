import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const type = searchParams.get('type');

  useEffect(() => {
    console.log('Paramètres URL:', { accessToken: !!accessToken, refreshToken: !!refreshToken, type });
    
    // Si nous avons les tokens ET que c'est un recovery, configurer la session
    if (accessToken && refreshToken && type === 'recovery') {
      console.log('Configuration de la session pour recovery...');
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      }).then(({ data, error }) => {
        if (error) {
          console.error('Erreur session:', error);
          toast.error('Erreur de session. Redirection vers la demande de lien...');
          // Rediriger vers la page d'authentification avec un message
          setTimeout(() => navigate('/auth'), 2000);
        } else {
          console.log('Session configurée avec succès:', data);
          setSessionReady(true);
          toast.success('Session active - vous pouvez changer votre mot de passe');
        }
      });
    } else if (type === 'recovery') {
      toast.error('Tokens manquants. Demandez un nouveau lien de réinitialisation');
      setTimeout(() => navigate('/auth'), 3000);
    } else {
      // Si on arrive sans paramètres de recovery, vérifier si on a une session active
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (session && !error) {
          console.log('Session existante trouvée:', session);
          setSessionReady(true);
          toast.info('Session active - vous pouvez changer votre mot de passe');
        } else {
          toast.error('Aucune session active. Redirection vers la connexion...');
          setTimeout(() => navigate('/auth'), 2000);
        }
      });
    }
  }, [accessToken, refreshToken, type, navigate]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionReady) {
      toast.error('Session non prête. Veuillez patienter ou redemander un lien de réinitialisation.');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/.test(password)) {
      toast.error('Le mot de passe doit contenir au moins une lettre et un chiffre');
      return;
    }

    setLoading(true);

    try {
      // Vérifier la session avant la mise à jour
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Session expirée. Veuillez demander un nouveau lien de réinitialisation.');
        setTimeout(() => navigate('/auth'), 2000);
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        console.error('Erreur mise à jour:', error);
        if (error.message.includes('session')) {
          toast.error('Session expirée. Demandez un nouveau lien de réinitialisation.');
          setTimeout(() => navigate('/auth'), 2000);
        } else {
          toast.error(error.message || 'Erreur lors de la mise à jour du mot de passe');
        }
      } else {
        toast.success('Mot de passe mis à jour avec succès !');
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (error) {
      console.error('Erreur:', error);
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
              Créez un mot de passe alphanumérique sécurisé
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                <p className="text-sm text-muted-foreground">
                  Minimum 6 caractères avec au moins une lettre et un chiffre
                </p>
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