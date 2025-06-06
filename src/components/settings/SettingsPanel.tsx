
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Key, Lightbulb } from 'lucide-react';
import ApiKeyManager from './ApiKeyManager';
import UXSuggestions from './UXSuggestions';

const SettingsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Settings className="w-8 h-8 text-islamic-green" />
        <h2 className="text-2xl font-bold text-islamic-green-dark">
          Paramètres & Améliorations
        </h2>
      </div>
      
      <Tabs defaultValue="api-keys" className="space-y-4">
        <TabsList className="grid grid-cols-2 bg-islamic-cream">
          <TabsTrigger 
            value="api-keys" 
            className="flex items-center data-[state=active]:bg-islamic-green data-[state=active]:text-white"
          >
            <Key className="w-4 h-4 mr-2" />
            Clés API
          </TabsTrigger>
          <TabsTrigger 
            value="ux-suggestions" 
            className="flex items-center data-[state=active]:bg-islamic-green data-[state=active]:text-white"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Suggestions UX
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="api-keys" className="animate-fade-in">
          <ApiKeyManager />
        </TabsContent>
        
        <TabsContent value="ux-suggestions" className="animate-fade-in">
          <UXSuggestions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
