'use client';

import {
  colorPaletteSectionId,
  defaultBgColor,
  defaultFgColor,
} from '@/constants';
import { getContrastRatio } from '@/helpers/contrasts';
import { useMediaQuery } from '@/lib/useMediaQuery';
import {
  ActiveFieldType,
  PickerModeState,
  SelectedColorState,
  WCAGCheckSize,
  WCAGType,
} from '@/types/content';
import { useRef, useState } from 'react';
import ColorPalette from './ColorPalette';
import ResultSection from './ResultSection';
import SelectorItem from './SelectorItem';
import FloatingNavButton from '../parts/FloatingNavButton';

export default function ContrastChecker() {
  const paletteRef = useRef<HTMLDivElement | null>(null);
  const [bg, setBg] = useState<SelectedColorState>(defaultBgColor);
  const [fg, setFg] = useState<SelectedColorState>(defaultFgColor);
  const [pickerMode, setPickerMode] = useState<PickerModeState>({
    bg: false,
    fg: false,
  });
  const [activeField, setActiveField] = useState<ActiveFieldType>('fg');
  const selectorOrder: ActiveFieldType[] = ['fg', 'bg'];

  const contrast = getContrastRatio(bg.hex, fg.hex);
  const isXlUp = useMediaQuery('(min-width: 1280px)');

  const checkPass = (
    ratio: number,
    type: WCAGType,
    size: WCAGCheckSize
  ): boolean => {
    const threshold =
      size === 'large' ? (type === 'AA' ? 3 : 4.5) : type === 'AA' ? 4.5 : 7;
    return ratio >= threshold;
  };

  const handleClickSelecter = (value: ActiveFieldType) => {
    setActiveField(value);
  };

  const handleSetColor = (type: ActiveFieldType, value: SelectedColorState) =>
    type === 'bg' ? setBg(value) : setFg(value);

  const handleUseColorPicker = (type: ActiveFieldType) =>
    setPickerMode((p) => ({ ...p, [type]: true }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 xl:flex-row xl:w-full xl:items-start xl:min-h-1/3 xl:gap-3 bg-white">
      <h1 className="sr-only">Contrastly - Tailwind color contrast checker</h1>

      <div className="sm:w-full flex flex-col gap-4 justify-center items-center lg:flex-row xl:flex-1 xl:gap-5 xl:flex-col">
        {/* Contrast Result */}
        <ResultSection
          checkPass={checkPass}
          contrast={contrast}
          bg={bg}
          fg={fg}
        />

        {/* Color Selector */}
        <section
          className="flex items-start justify-between"
          aria-labelledby="color-selector"
        >
          <h2 className="sr-only" id="color-selector">
            Color Selector
          </h2>
          <div
            className="flex items-start justify-between gap-4 sm:w-105"
            role="radiogroup"
            aria-labelledby="color-selector"
            aria-orientation="horizontal"
          >
            {/* Foreground */}
            <SelectorItem
              handleClickSelecter={handleClickSelecter}
              activeField={activeField}
              handleSetColor={handleSetColor}
              pickerMode={pickerMode}
              handleUseColorPicker={handleUseColorPicker}
              targetItemType={'fg'}
              targetColor={fg}
              order={selectorOrder}
            />

            {/* Background */}
            <SelectorItem
              handleClickSelecter={handleClickSelecter}
              activeField={activeField}
              handleSetColor={handleSetColor}
              pickerMode={pickerMode}
              handleUseColorPicker={handleUseColorPicker}
              targetItemType={'bg'}
              targetColor={bg}
              order={selectorOrder}
            />
          </div>
        </section>
      </div>

      {/* Color Palette */}
      <section
        className="w-full max-w-5xl xl:max-w-[67%] xl:flex-3 scroll-mt-24 focus:outline-none focus-visible:ring-2"
        ref={paletteRef}
        id={colorPaletteSectionId}
        aria-labelledby="color-palette-heading"
        role="region"
        tabIndex={-1}
      >
        <h2 id="color-palette-heading" className="sr-only">
          Color palette
        </h2>
        <ColorPalette
          activeField={activeField}
          onColorSelectAction={(name: string, hex: string) => {
            if (activeField === 'bg') {
              setBg({ name, hex });
            } else {
              setFg({ name, hex });
            }
          }}
        />
      </section>
      {isXlUp ? null : <FloatingNavButton />}
    </div>
  );
}
