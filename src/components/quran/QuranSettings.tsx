
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface QuranSettingsProps {
  currentTranslation: string;
  setCurrentTranslation: (value: string) => void;
  currentReciter: string;
  setCurrentReciter: (value: string) => void;
  isTajweedEnabled: boolean;
  setIsTajweedEnabled: (value: boolean) => void;
  showTranslation: boolean;
  setShowTranslation: (value: boolean) => void;
}

const QuranSettings = ({
  currentTranslation,
  setCurrentTranslation,
  currentReciter,
  setCurrentReciter,
  isTajweedEnabled,
  setIsTajweedEnabled,
  showTranslation,
  setShowTranslation
}: QuranSettingsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-islamic-cream/50 p-4 rounded-md">
      <div className="space-y-2">
        <Label htmlFor="translation-select">Traduction :</Label>
        <Select value={currentTranslation} onValueChange={setCurrentTranslation}>
          <SelectTrigger id="translation-select">
            <SelectValue placeholder="Choisir une traduction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fr.hamidullah">Hamidullah (Français)</SelectItem>
            <SelectItem value="en.sahih">Sahih International (Anglais)</SelectItem>
            <SelectItem value="ar.muyassar">Muyassar (Arabe simplifié)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reciter-select">Récitateur :</Label>
        <Select value={currentReciter} onValueChange={setCurrentReciter}>
          <SelectTrigger id="reciter-select">
            <SelectValue placeholder="Choisir un récitateur" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ar.alafasy">Mishary Rashid Alafasy</SelectItem>
            <SelectItem value="ar.abdurrahmaansudais">Abdurrahmaan As-Sudais</SelectItem>
            <SelectItem value="ar.hudhaify">Ali Al-Hudhaify</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="tajweed-checkbox" 
            checked={isTajweedEnabled} 
            onCheckedChange={setIsTajweedEnabled}
          />
          <Label htmlFor="tajweed-checkbox">Activer le tajweed (couleurs)</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="translation-checkbox" 
            checked={showTranslation} 
            onCheckedChange={setShowTranslation}
          />
          <Label htmlFor="translation-checkbox">Afficher la traduction</Label>
        </div>
      </div>
    </div>
  );
};

export default QuranSettings;
