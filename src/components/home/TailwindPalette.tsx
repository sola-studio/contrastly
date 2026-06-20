'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { paletteColors, shades } from '@/constants';
import { getTextColor } from '@/helpers';
import { cn } from '@/lib/clsx';
import { PaletteProps, TailwindColors } from '@/types/content';
import { useEffect, useMemo, useState } from 'react';

export default function TailwindPalette({
  handleColorSelectAction,
  selectedColor,
}: PaletteProps) {
  const tailwindColors: TailwindColors = paletteColors;
  const colorNames = useMemo(
    () => Object.keys(tailwindColors),
    [tailwindColors]
  );

  // Active cell (roving tabindex)
  const [active, setActive] = useState<{ r: number; c: number }>({
    r: 0,
    c: 0,
  });

  // If a selected key exists, set the corresponding cell as initially active (optional)
  useEffect(() => {
    if (!selectedColor) return;
    // selectedColor was in the format `${colorName}-${shade}-${hex}`, so extract colorName and shade
    const [selColorName, selShade] = selectedColor.split('-');
    const r = Math.max(0, shades.indexOf(selShade));
    const c = Math.max(0, colorNames.indexOf(selColorName));
    if (r >= 0 && c >= 0) setActive({ r, c });
  }, [selectedColor]);

  const focusCell = (r: number, c: number) => {
    const el = document.getElementById(
      `swatch-r${r}-c${c}`
    ) as HTMLElement | null;
    if (el) {
      setActive({ r, c });
      requestAnimationFrame(() => el.focus());
    }
  };

  const handleArrowNav = (e: React.KeyboardEvent, r: number, c: number) => {
    // Assume focus is not on tooltip, etc. (consolidated into button with asChild)
    let nr = r,
      nc = c;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nc = Math.min(colorNames.length - 1, c + 1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nc = Math.max(0, c - 1);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      nr = Math.min(shades.length - 1, r + 1);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      nr = Math.max(0, r - 1);
    }
    if (nr !== r || nc !== c) focusCell(nr, nc);

    // Optional: Home/End (start/end of row)
    if (e.key === 'Home') {
      e.preventDefault();
      focusCell(r, 0);
    }
    if (e.key === 'End') {
      e.preventDefault();
      focusCell(r, colorNames.length - 1);
    }
  };

  return (
    <div className="overflow-x-auto text-slate-500">
      <table
        className="border-collapse w-full" /* Keep as table for visual purposes */
      >
        <caption className="sr-only">
          Tailwind color palette. Select a swatch to apply the color.
        </caption>

        <thead>
          <tr>
            <th className="text-left p-2 font-normal text-sm" scope="col">
              Shade
            </th>
            {colorNames.map((colorName) => (
              <th
                key={colorName}
                className="p-1 capitalize text-sm font-normal"
                scope="col"
              >
                {colorName}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {shades.map((shade, r) => (
            <tr key={shade}>
              <th className="pr-3 text-sm font-normal" scope="row">
                {shade}
              </th>

              {colorNames.map((colorName, c) => {
                const hex = tailwindColors[colorName][shade];
                const name = `${colorName}-${shade}`;
                const key = `${name}-${hex}`;
                const textColor = getTextColor(hex); // '#FFFFFF' | '#000000'
                const isActive = active.r === r && active.c === c;

                return (
                  <td key={key} className="p-1">
                    {hex && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            id={`swatch-r${r}-c${c}`}
                            type="button"
                            tabIndex={isActive ? 0 : -1} // roving
                            onKeyDown={(e) => handleArrowNav(e, r, c)} // ←→↑↓
                            onClick={() => {
                              setActive({ r, c }); // Update active on click as well
                              handleColorSelectAction(name, hex, key);
                            }}
                            style={{ backgroundColor: hex }}
                            className={cn(
                              'w-12 h-12 rounded-sm border border-gray-300 cursor-pointer',
                              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                              'focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
                              selectedColor === key && 'ring-2 ring-blue-500',
                              textColor === '#FFFFFF'
                                ? 'text-white'
                                : 'text-black',
                              'flex items-center justify-center'
                            )}
                            aria-label={`Select ${colorName} ${shade} (${hex})`}
                            aria-current={
                              selectedColor === key ? 'true' : undefined
                            }
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                'hidden md:flex w-12 h-12 items-center justify-center',
                                'md:text-transparent md:transition-colors',
                                textColor === '#FFFFFF'
                                  ? 'md:hover:text-white'
                                  : 'md:hover:text-black'
                              )}
                            >
                              {shade}
                            </span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>{`${colorName}-${shade}: ${hex}`}</TooltipContent>
                      </Tooltip>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
