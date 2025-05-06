
import React from 'react';
import { Button } from '@/components/ui/button';

interface ConnectDevicePromptProps {
  onConnect: () => void;
}

const ConnectDevicePrompt: React.FC<ConnectDevicePromptProps> = ({ onConnect }) => {
  return (
    <div className="text-center py-6">
      <p className="mb-4 text-islamic-slate">
        Pour suivre automatiquement vos pas et calories, nous avons besoin d'accéder à vos données d'activité physique.
      </p>
      <Button 
        onClick={onConnect}
        className="bg-islamic-green hover:bg-islamic-green-dark"
      >
        Connecter mon appareil
      </Button>
      <p className="text-xs text-gray-500 mt-3">
        Compatible avec Google Fit, Apple Health, Samsung Health et autres appareils.
      </p>
    </div>
  );
};

export default ConnectDevicePrompt;
