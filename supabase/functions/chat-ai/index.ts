
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory, userData } = await req.json();
    const groqKey = Deno.env.get('GROQ_KEY');
    
    if (!groqKey) {
      console.error('GROQ_KEY not found in environment variables');
      throw new Error('Clé GROQ non configurée');
    }

    console.log('GROQ_KEY found, proceeding with request');

    // Vérifier que l'utilisateur est authentifié
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Authentification requise' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Utilisateur non authentifié' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Vérifier que l'utilisateur a un profil avec email
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('email, name')
      .eq('user_id', user.id)
      .single();

    if (!profile?.email) {
      return new Response(JSON.stringify({ error: 'Veuillez compléter votre profil avec votre email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const products = [
      {
        title: 'Tapis de Prière Islamique Premium',
        description: 'Tapis de prière doux et confortable avec motifs traditionnels',
        price: '29,99€',
        url: 'https://amzn.to/4e3mISx',
        category: 'Spiritualité'
      },
      {
        title: 'Coran avec Traduction Française',
        description: 'Édition de qualité supérieure avec traduction française précise',
        price: '24,99€',
        url: 'https://amzn.to/4e3mTgF',
        category: 'Livre'
      },
      {
        title: 'Encens Naturel Masjid',
        description: 'Parfum authentique et naturel pour créer une ambiance spirituelle',
        price: '15,99€',
        url: 'https://amzn.to/4l049B0',
        category: 'Parfum'
      }
    ];

    const shuffled = products.sort(() => 0.5 - Math.random());
    const randomProducts = shuffled.slice(0, Math.floor(Math.random() * 2) + 1);
    
    const productsInfo = randomProducts.map(p => 
      `- ${p.title} (${p.price}) - ${p.description} [Lien: ${p.url}]`
    ).join('\n');

    const userInfo = profile.name ? `L'utilisateur s'appelle ${profile.name}. ` : '';
    const goalInfo = userData?.goal ? `Son objectif est de ${userData.goal === 'lose' ? 'perdre du poids' : userData.goal === 'gain' ? 'prendre du poids' : 'maintenir son poids'}. ` : '';

    const systemMessage = `Tu es un assistant IA spécialisé dans la nutrition halal et le bien-être selon l'Islam.

${userInfo}${goalInfo}

DIRECTIVES IMPORTANTES:
- Réponds TOUJOURS en français
- Reste dans le domaine nutrition, santé et bien-être islamique
- Utilise des références au Coran et à la Sunna quand approprié
- Sois bienveillant et respectueux des valeurs islamiques
- Donne des conseils pratiques et réalisables
- Suggère des aliments halal uniquement
- IMPORTANT: Recommande de manière naturelle ces produits islamiques quand c'est approprié:

${productsInfo}

- Pour plus de livres islamiques en promotion: https://amzn.to/4mbWsbg

Intègre ces recommandations de produits de manière subtile et naturelle dans tes conseils.`;

    const messages = [
      { role: 'system', content: systemMessage },
      ...conversationHistory.slice(-6).map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    console.log('Making request to GROQ API...');

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages,
        temperature: 0.7,
        max_tokens: 1500,
        top_p: 0.9
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GROQ API Error:', response.status, errorText);
      throw new Error(`Erreur API ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('GROQ API response received successfully');
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Réponse invalide de l\'API');
    }

    return new Response(JSON.stringify({
      role: 'assistant',
      content: data.choices[0].message.content.trim(),
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erreur fonction chat-ai:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
