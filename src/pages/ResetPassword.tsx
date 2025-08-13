import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { KeyRound, ArrowLeft, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

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
          toast.error('Lien expiré. Demandez un nouveau lien de réinitialisation.');
          setShowPasswordForm(false);
        } else {
          console.log('Session configurée:', data);
          toast.success('Vous pouvez maintenant changer votre mot de passe');
          setShowPasswordForm(true);
        }
      });
    } else if (type === 'recovery') {
      toast.error('Lien de réinitialisation invalide');
      setShowPasswordForm(false);
    }
  }, [accessToken, refreshToken, type]);

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
        console.error('Erreur mise à jour:', error);
        toast.error(error.message || 'Erreur lors de la mise à jour du mot de passe');
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

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await resetPassword(email);
      if (error) {
        toast.error(error.message || 'Erreur lors de l\'envoi de l\'email');
      } else {
        toast.success('Email de réinitialisation envoyé ! Vérifiez votre boîte mail.');
      }
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'email');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-green/10 to-islamic-gold/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-islamic-green/10 rounded-full flex items-center justify-center mb-4">
              {showPasswordForm ? (
                <KeyRound className="h-6 w-6 text-islamic-green" />
              ) : (
                <Mail className="h-6 w-6 text-islamic-green" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-islamic-green">
              {showPasswordForm ? 'Nouveau mot de passe' : 'Réinitialiser le mot de passe'}
            </CardTitle>
            <CardDescription>
              {showPasswordForm 
                ? 'Saisissez votre nouveau mot de passe'
                : 'Entrez votre email pour recevoir un lien de réinitialisation'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showPasswordForm ? (
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
            ) : (
              <form onSubmit={handleRequestReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre-email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
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