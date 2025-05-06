
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useUser } from '@/context/UserContext';
import DietApp from '@/components/nutrition/DietApp';
import RegimeTracker from '@/components/regime/RegimeTracker';
import { useIsMobile } from '@/hooks/use-mobile';
import NutritionTabsNav from '@/components/nutrition/NutritionTabsNav';
import ActivityTabContent from '@/components/nutrition/ActivityTabContent';
import HealthSummary from '@/components/nutrition/HealthSummary';
import MobileHealthSummary from '@/components/nutrition/MobileHealthSummary';
import MadinahLiveView from '@/components/nutrition/MadinahLiveView';

const NutritionRegime = () => {
  const { userData } = useUser();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-6 bg-islamic-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-islamic-green-dark mb-2">Nutrition & Régime</h1>
            <p className="text-islamic-slate">
              Suivez votre alimentation et activité physique en accord avec les principes islamiques.
            </p>
          </div>
          
          <Tabs defaultValue="regime" className="space-y-6">
            <NutritionTabsNav isMobile={isMobile} />
            
            <div className={`grid grid-cols-1 ${isMobile ? '' : 'lg:grid-cols-3'} gap-6`}>
              <div className={isMobile ? '' : 'lg:col-span-2'}>
                <TabsContent value="nutrition" className="animate-fade-in mt-0">
                  <DietApp />
                </TabsContent>
                
                <TabsContent value="regime" className="animate-fade-in mt-0">
                  <RegimeTracker />
                </TabsContent>
                
                <TabsContent value="activite" className="animate-fade-in mt-0">
                  <ActivityTabContent isMobile={isMobile} />
                </TabsContent>
              </div>
              
              {/* Desktop sidebar with health summary and Madinah live view */}
              {!isMobile && (
                <div className="lg:col-span-1 space-y-6">
                  <HealthSummary userData={userData} />
                  
                  <iframe 
                    src="https://makkahlive.net/medinah.aspx" 
                    title="Madinah Live" 
                    width="100%" 
                    height="250" 
                    frameBorder="0" 
                    allowFullScreen
                    className="rounded-lg overflow-hidden shadow-md"
                  ></iframe>
                </div>
              )}
            </div>
            
            {/* Mobile health summary as collapsible */}
            {isMobile && (
              <MobileHealthSummary userData={userData} />
            )}
            
            {/* Mobile Madinah Live view */}
            {isMobile && (
              <MadinahLiveView />
            )}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NutritionRegime;
