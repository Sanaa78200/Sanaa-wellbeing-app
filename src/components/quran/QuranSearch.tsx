
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface QuranSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
}

const QuranSearch = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isLoading
}: QuranSearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex-1">
        <Input 
          placeholder="Rechercher un mot ou un verset..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          disabled={isLoading}
        />
      </div>
      <Button 
        onClick={handleSearch} 
        className="bg-islamic-accent hover:bg-islamic-accent/80"
        disabled={isLoading}
      >
        <Search className="h-4 w-4 mr-2" />
        Rechercher
      </Button>
    </div>
  );
};

export default QuranSearch;
