'use client';

import { MapPin } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';

interface HeaderProps {
  city: string;
  onCityChange: (city: string) => void;
}

export function Header({ city, onCityChange }: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-effect p-6 rounded-lg mb-8">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <MapPin className="text-primary w-6 h-6" />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            AtmosPhase
          </h1>
          <p className="text-muted-foreground">{city}</p>
        </div>
      </div>
      <SearchBar city={city} onCityChange={onCityChange} />
    </div>
  );
}