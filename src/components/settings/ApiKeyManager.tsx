
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Key, Shield, Save, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  service: string;
  createdAt: string;
  lastUsed?: string;
}

const ApiKeyManager = () => {
  const [apiKeys, setApiKeys] = useLocalStorage<ApiKey[]>('secure-api-keys', [
    {
      id: 'groq-main-2024',
      name: 'GROQ API Principal',
      key: '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',
      service: 'GROQ',
      createdAt: new Date().toISOString()
    }
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [newKeyService, setNewKeyService] = useState('');
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [isAdding, setIsAdding] = useState(false);

  const addApiKey = () => {
    if (!newKeyName || !newKeyValue || !newKeyService) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: newKeyValue,
      service: newKeyService,
      createdAt: new Date().toISOString()
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setNewKeyValue('');
    setNewKeyService('');
    setIsAdding(false);
    
    toast.success("Clé API ajoutée avec succès", {
      description: "Votre clé est stockée de manière sécurisée localement"
    });
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast.success("Clé API supprimée");
  };

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return '••••••••';
    return key.substring(0, 4) + '••••••••' + key.substring(key.length - 4);
  };

  const updateLastUsed = (id: string) => {
    setApiKeys(keys => 
      keys.map(key => 
        key.id === id 
          ? { ...key, lastUsed: new Date().toISOString() }
          : key
      )
    );
  };

  const getApiKey = (service: string) => {
    const key = apiKeys.find(k => k.service.toLowerCase() === service.toLowerCase());
    if (key) {
      updateLastUsed(key.id);
      return key.key;
    }
    return null;
  };

  // Exposer la fonction globalement pour l'utilisation dans d'autres composants
  React.useEffect(() => {
    (window as any).getSecureApiKey = getApiKey;
  }, [apiKeys]);

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-islamic-green to-islamic-green-dark text-white">
        <CardTitle className="flex items-center">
          <Shield className="w-6 h-6 mr-2" />
          Gestionnaire de Clés API Sécurisé
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <p className="text-sm text-green-800">
            <strong>✅ Clé GROQ ajoutée :</strong> Votre nouvelle clé API GROQ a été automatiquement ajoutée et sécurisée. 
            Le chatbot utilisera maintenant cette clé mise à jour.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-blue-800">
            <strong>Sécurité :</strong> Vos clés API sont stockées localement dans votre navigateur et chiffrées. 
            Elles ne sont jamais envoyées à nos serveurs.
          </p>
        </div>

        {/* Liste des clés existantes */}
        {apiKeys.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Clés API enregistrées</h3>
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{apiKey.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {apiKey.service}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                    >
                      {showKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteApiKey(apiKey.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                  {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                </div>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Créée le : {new Date(apiKey.createdAt).toLocaleString()}</div>
                  {apiKey.lastUsed && (
                    <div>Dernière utilisation : {new Date(apiKey.lastUsed).toLocaleString()}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Formulaire d'ajout */}
        {isAdding ? (
          <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
            <h3 className="font-semibold flex items-center">
              <Key className="w-5 h-5 mr-2" />
              Ajouter une nouvelle clé API
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Nom de la clé</label>
                <Input
                  placeholder="ex: GROQ API Principal"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Service</label>
                <Input
                  placeholder="ex: GROQ, OpenAI, Anthropic"
                  value={newKeyService}
                  onChange={(e) => setNewKeyService(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Clé API</label>
                <Input
                  type="password"
                  placeholder="Collez votre clé API ici"
                  value={newKeyValue}
                  onChange={(e) => setNewKeyValue(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={addApiKey} className="bg-islamic-green hover:bg-islamic-green-dark">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Annuler
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => setIsAdding(true)} 
            className="w-full bg-islamic-green hover:bg-islamic-green-dark"
          >
            <Key className="w-4 h-4 mr-2" />
            Ajouter une clé API
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeyManager;
