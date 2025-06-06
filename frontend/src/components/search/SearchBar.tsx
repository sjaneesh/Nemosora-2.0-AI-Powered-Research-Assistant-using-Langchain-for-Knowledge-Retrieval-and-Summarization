
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = React.useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-3xl mx-auto relative">
      <Input
        type="text"
        placeholder="Search for research papers..."
        className="pr-16 h-14 bg-white border-gray-200 rounded-full shadow-sm focus-visible:ring-accent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button 
        type="submit" 
        size="icon"
        className="absolute right-1 top-1 h-12 w-12 rounded-full bg-accent hover:bg-accent/90 text-white"
      >
        <Search className="w-5 h-5" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;
