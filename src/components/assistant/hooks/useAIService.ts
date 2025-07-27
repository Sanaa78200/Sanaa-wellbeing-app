
import { AIMessage } from '@/components/nutrition/types';

export const useAIService = () => {
  const getApiKey = () => {
    try {
      const storedKeys = localStorage.getItem('secure-api-keys');
      if (storedKeys) {
        const keys = JSON.parse(storedKeys);
        const groqKey = keys.find((k: any) => k.service.toLowerCase() === 'groq');
        if (groqKey?.key) {
          console.log('✅ Clé API GROQ trouvée');
          return groqKey.key;
        }
      }
    } catch (error) {
      console.error('❌ Erreur récupération clé API:', error);
    }
    
    console.log('🔑 Utilisation clé par défaut');
    return "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";
  };

  const getRandomProducts = () => {
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
    
    // Mélanger et retourner 1-2 produits aléatoires
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 1);
  };

  const getSystemMessage = (userData: any) => {
    const userInfo = userData.name ? `L'utilisateur s'appelle ${userData.name}. ` : '';
    const goalInfo = userData.goal ? `Son objectif est de ${userData.goal === 'lose' ? 'perdre du poids' : userData.goal === 'gain' ? 'prendre du poids' : 'maintenir son poids'}. ` : '';
    const randomProducts = getRandomProducts();
    
    const productsInfo = randomProducts.map(p => 
      `- ${p.title} (${p.price}) - ${p.description} [Lien: ${p.url}]`
    ).join('\n');
    
    return `Tu es un assistant IA spécialisé dans la nutrition halal et le bien-être selon l'Islam.

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
  };

  const sendMessageToAI = async (
    message: string,
    conversationHistory: AIMessage[],
    userData: any
  ): Promise<AIMessage> => {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      throw new Error("Clé API manquante");
    }

    console.log('📤 Envoi message:', message);

    const messages = [
      {
        role: 'system',
        content: getSystemMessage(userData)
      },
      ...conversationHistory.slice(-6).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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
      console.error('❌ Erreur API:', response.status, errorText);
      throw new Error(`Erreur API ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('📊 Réponse reçue');

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Réponse invalide de l\'API');
    }

    return {
      role: 'assistant',
      content: data.choices[0].message.content.trim(),
      timestamp: new Date().toISOString()
    };
  };

  return {
    sendMessageToAI
  };
};
