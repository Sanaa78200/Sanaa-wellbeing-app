
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const MadinahLiveView: React.FC = () => {
  return (
    <div className="mt-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="madinah">
          <AccordionTrigger>
            Vue sur Madinah
          </AccordionTrigger>
          <AccordionContent>
            <iframe 
              src="https://makkahlive.net/medinah.aspx" 
              title="Madinah Live" 
              width="100%" 
              height="200" 
              frameBorder="0" 
              allowFullScreen
              className="rounded-lg overflow-hidden shadow-md"
            ></iframe>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MadinahLiveView;
