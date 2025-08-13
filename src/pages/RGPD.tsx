import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, Cookie, Mail, MapPin } from 'lucide-react';

const RGPD = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-islamic-pattern">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Shield className="h-16 w-16 text-islamic-green" />
            </div>
            <h1 className="text-3xl font-bold text-islamic-green-dark mb-3">
              Politique de Confidentialité, RGPD et Conditions d'Utilisation
            </h1>
            <p className="text-islamic-slate max-w-2xl mx-auto">
              Nous nous engageons à protéger vos données personnelles conformément au RGPD. En utilisant notre application, vous acceptez nos conditions d'utilisation et autorisez le traitement de vos données selon les modalités décrites ci-dessous.
            </p>
          </div>

          <div className="space-y-6">
            {/* Collecte des données */}
            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-islamic-green" />
                  Collecte des Données
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Nous collectons les données suivantes :</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Informations de profil (nom, âge, poids, taille, objectifs)</li>
                  <li>Données nutritionnelles et de repas</li>
                  <li>Préférences alimentaires (halal, végétarien, allergies)</li>
                  <li>Données d'utilisation de l'application</li>
                  <li>Adresse IP et informations techniques</li>
                </ul>
              </CardContent>
            </Card>

            {/* Utilisation des données */}
            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-islamic-green" />
                  Utilisation des Données
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Vos données sont utilisées pour :</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Personnaliser votre expérience d'application</li>
                  <li>Calculer vos besoins caloriques et nutritionnels</li>
                  <li>Suivre vos progrès et objectifs</li>
                  <li>Améliorer nos services et fonctionnalités</li>
                  <li>Vous proposer des recommandations personnalisées</li>
                </ul>
              </CardContent>
            </Card>

            {/* Vos droits */}
            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-islamic-green" />
                  Vos Droits RGPD
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-islamic-cream p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Droit d'accès</h4>
                    <p className="text-sm">Consulter vos données personnelles</p>
                  </div>
                  <div className="bg-islamic-cream p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Droit de rectification</h4>
                    <p className="text-sm">Corriger vos données inexactes</p>
                  </div>
                  <div className="bg-islamic-cream p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Droit à l'effacement</h4>
                    <p className="text-sm">Supprimer vos données personnelles</p>
                  </div>
                  <div className="bg-islamic-cream p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Droit de portabilité</h4>
                    <p className="text-sm">Récupérer vos données</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookies et Technologies */}
            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cookie className="h-5 w-5 text-islamic-green" />
                  Cookies, Stockage Local et Technologies Utilisées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Notre application utilise :</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Cookies essentiels</strong> : Pour le fonctionnement de l'application</li>
                  <li><strong>Stockage local (localStorage)</strong> : Les cookies et données sont conservés localement sur votre appareil par l'utilisateur</li>
                  <li><strong>Intelligence Artificielle</strong> : Notre IA intégrée utilise la technologie <a href="https://groq.com/" target="_blank" className="text-islamic-green underline">Groq</a> pour les fonctionnalités de chat</li>
                  <li><strong>Hébergement</strong> : Le site est hébergé par <a href="https://vercel.com/" target="_blank" className="text-islamic-green underline">Vercel</a> aux États-Unis</li>
                  <li><strong>Base de données</strong> : Vos informations sont stockées sur les serveurs <a href="https://supabase.com/" target="_blank" className="text-islamic-green underline">Supabase</a></li>
                </ul>
                <div className="bg-islamic-cream p-4 rounded-lg">
                  <p className="text-sm font-semibold text-islamic-green-dark mb-2">Consentement et Autorisation :</p>
                  <p className="text-sm text-islamic-slate">
                    En vous inscrivant et en utilisant notre application, vous prenez conscience que vos informations sont conservées avec votre consentement sur les serveurs Supabase et vous nous autorisez à utiliser notre application selon ces conditions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-islamic-green" />
                  Contact et Exercice de vos Droits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Pour exercer vos droits ou pour toute question concernant vos données personnelles :</p>
                <div className="bg-islamic-cream p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-islamic-green" />
                    <span className="font-semibold">Email :</span>
                  </div>
                  <p className="text-sm">privacy@sanaa-bienetre.com</p>
                </div>
                <div className="bg-islamic-cream p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-islamic-green" />
                    <span className="font-semibold">Responsable du traitement :</span>
                  </div>
                  <p className="text-sm">Sanaa Bien-être<br />Application de suivi nutritionnel islamique</p>
                </div>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-islamic-green" />
                  Sécurité des Données
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Nous mettons en place des mesures techniques et organisationnelles appropriées pour :</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Protéger vos données contre l'accès non autorisé</li>
                  <li>Assurer la confidentialité et l'intégrité de vos informations</li>
                  <li>Prévenir la perte ou la destruction accidentelle de données</li>
                  <li>Utiliser le chiffrement pour les données sensibles</li>
                </ul>
              </CardContent>
            </Card>

            {/* Conditions d'utilisation et acceptation */}
            <Card className="islamic-card border-islamic-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-islamic-green">
                  <Shield className="h-5 w-5" />
                  Conditions d'Utilisation et Acceptation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-semibold">En utilisant l'application Sanaa Bien-être, vous acceptez :</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Le traitement de vos données personnelles selon cette politique</li>
                  <li>Le stockage de vos informations sur les serveurs Supabase</li>
                  <li>L'utilisation de technologies tierces (Groq, Vercel) pour le fonctionnement du service</li>
                  <li>La conservation locale des cookies et préférences sur votre appareil</li>
                  <li>Nos conditions générales d'utilisation</li>
                </ul>
                <div className="bg-islamic-green/10 p-4 rounded-lg">
                  <p className="text-sm font-semibold">Droit de retrait :</p>
                  <p className="text-sm">Vous pouvez retirer votre consentement à tout moment en supprimant votre compte ou en nous contactant.</p>
                </div>
              </CardContent>
            </Card>

            {/* Mise à jour */}
            <div className="text-center text-sm text-islamic-slate bg-islamic-cream p-4 rounded-lg">
              <p>Cette politique de confidentialité et conditions d'utilisation ont été mises à jour le : <strong>13 Août 2025</strong></p>
              <p className="mt-2">Nous vous informerons de toute modification importante de cette politique.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RGPD;