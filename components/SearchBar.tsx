'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  city: string;
  onCityChange: (city: string) => void;
}

export function SearchBar({ city, onCityChange }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(city);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim().length >= 2) {
      onCityChange(inputValue.trim());
    }
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        className="pl-10 w-[300px]"
        placeholder="Search city (e.g., London or London, UK)"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}