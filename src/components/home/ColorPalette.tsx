'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { ActiveFieldType } from '@/types/content';
import { useState } from 'react';
import TailwindPalette from './TailwindPalette';

interface ColorPaletteProps {
  onColorSelectAction: (name: string, hex: string) => void;
  activeField: ActiveFieldType;
}

export default function ColorPalette({
  onColorSelectAction,
  activeField,
}: ColorPaletteProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (name: string, hex: string, value: string) => {
    if (!name || !hex) return;

    setSelectedColor(value);
    onColorSelectAction(name, hex);
    setTimeout(() => setSelectedColor(null), 2000);
  };

  return (
    <TooltipProvider>
      <div className="w-full">
        <p role="status" className="sr-only">
          {selectedColor
            ? `Selected ${
                activeField === 'bg' ? 'background' : 'foreground'
              } color ${selectedColor}.`
            : ''}
        </p>
        <TailwindPalette
          handleColorSelectAction={handleColorSelect}
          selectedColor={selectedColor}
        />
      </div>
    </TooltipProvider>
  );
}
