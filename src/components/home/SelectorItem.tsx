import { Pipette } from '@/lib/lucide';
import {
  ActiveFieldType,
  PickerModeState,
  SelectedColorState,
} from '@/types/content';
import { ChangeEvent, useEffect, useState } from 'react';
import ColorCopyButton from './ColorCopyButton';

interface SelectorItemProps {
  handleClickSelecter: (value: ActiveFieldType) => void;
  activeField: ActiveFieldType;
  handleSetColor: (type: ActiveFieldType, value: SelectedColorState) => void;
  pickerMode: PickerModeState;
  handleUseColorPicker: (type: ActiveFieldType) => void;
  targetColor: SelectedColorState;
  targetItemType: ActiveFieldType;
  order?: ActiveFieldType[];
}

export default function SelectorItem({
  handleClickSelecter,
  activeField,
  handleSetColor,
  pickerMode,
  handleUseColorPicker,
  targetColor,
  targetItemType,
  order = ['fg', 'bg'],
}: SelectorItemProps) {
  const isSelected = activeField === targetItemType;
  const title = targetItemType === 'bg' ? 'Background' : 'Foreground';
  const titleId = `selector-${targetItemType}-title`;
  const radioId = `selector-${targetItemType}-radio`;

  // ▼ Draft for HEX. Synchronize when the color changes from outside.
  const [hexDraft, setHexDraft] = useState(targetColor.hex.toUpperCase());
  useEffect(() => {
    setHexDraft(targetColor.hex.toUpperCase());
  }, [targetColor.hex]);

  const normalizeHexForCommit = (v: string) => {
    // Remove extra spaces, add # at the beginning, and convert to uppercase
    let s = v.trim().toUpperCase();
    if (!s.startsWith('#')) s = `#${s}`;

    // Automatically expand #RGB to #RRGGBB
    const m3 = /^#([0-9A-F]{3})$/.exec(s);
    if (m3) {
      const [r, g, b] = m3[1].split('');
      return { ok: true, value: `#${r}${r}${g}${g}${b}${b}` };
    }

    // #RRGGBB is accepted as is
    if (/^#([0-9A-F]{6})$/.test(s)) {
      return { ok: true, value: s };
    }

    // Doesn't match any pattern
    return { ok: false as const, value: s };
  };

  const commitHexIfValid = () => {
    const res = normalizeHexForCommit(hexDraft);
    if (res.ok) {
      handleSetColor(targetItemType, { name: res.value, hex: res.value });
      setHexDraft(res.value); // Update display to normalized value
    } else {
      // Invalid → revert display to original correct value
      setHexDraft(targetColor.hex.toUpperCase());
    }
  };

  return (
    <div
      onClick={(e) => {
        document.getElementById(radioId)?.focus();
        handleClickSelecter(targetItemType);
      }}
      className={`relative flex flex-col items-center gap-3 rounded-lg p-4 shadow cursor-pointer
       border text-slate-700 w-full
       ${isSelected ? 'border-2 border-blue-700' : 'border-slate-500'}
        focus-within:ring-2  focus-within:ring-blue-700  focus-within:ring-offset-2
        focus-within:ring-offset-white`}
    >
      {/* Visually hidden real radio input — carries radio semantics without nesting interactive controls */}
      <input
        type="radio"
        id={radioId}
        name="color-selector"
        value={targetItemType}
        checked={isSelected}
        onChange={() => handleClickSelecter(targetItemType)}
        aria-labelledby={titleId}
        tabIndex={isSelected ? 0 : -1}
        onKeyDown={(e) => {
          // Ignore if focus is on input or button
          if ((e.target as HTMLElement)?.closest('input,button,textarea'))
            return;

          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleClickSelecter(targetItemType);
          }

          const idx = order.indexOf(targetItemType);
          const prevKey = order[(idx - 1 + order.length) % order.length];
          const nextKey = order[(idx + 1) % order.length];
          const firstKey = order[0];
          const lastKey = order[order.length - 1];

          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            handleClickSelecter(prevKey);
            requestAnimationFrame(() => {
              document.getElementById(`selector-${prevKey}-radio`)?.focus();
            });
          }
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            handleClickSelecter(nextKey);
            requestAnimationFrame(() => {
              document.getElementById(`selector-${nextKey}-radio`)?.focus();
            });
          }
          if (e.key === 'Home') {
            e.preventDefault();
            handleClickSelecter(firstKey);
            requestAnimationFrame(() => {
              document.getElementById(`selector-${firstKey}-radio`)?.focus();
            });
          }
          if (e.key === 'End') {
            e.preventDefault();
            handleClickSelecter(lastKey);
            requestAnimationFrame(() => {
              document.getElementById(`selector-${lastKey}-radio`)?.focus();
            });
          }
        }}
        className="sr-only"
      />
      <span
        className="text-sm font-normal uppercase tracking-widest"
        id={titleId}
      >
        {title}
      </span>

      <div
        className="h-14 w-14 rounded border border-slate-500" // xl:h-18 xl:w-18
        style={{ backgroundColor: targetColor.hex }}
        aria-hidden="true"
      />
      <span className="text-sm text-slate-600">{targetColor.name}</span>

      {/* HEX Input Field (Intermediate input allowed) */}
      <div
        className="flex items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          value={hexDraft}
          onChange={(e) => setHexDraft(e.target.value)}
          onBlur={commitHexIfValid}
          onKeyDown={(e) => {
            e.stopPropagation(); // Disable parent radio key handling
            if (e.key === 'Enter') {
              e.preventDefault();
              commitHexIfValid();
            }
            if (e.key === 'Escape') {
              e.preventDefault();
              setHexDraft(targetColor.hex.toUpperCase());
            }
          }}
          className={`w-24 h-11 p-2 border-2 rounded text-md font-mono placeholder:text-slate-500 ${isSelected ? 'border-slate-700' : 'border-slate-400'}`}
          aria-label={`${title} hex value`}
          placeholder="#RRGGBB"
          tabIndex={isSelected ? 0 : -1} // ★ Do not stop Tab in non-selected cards
        />

        <ColorCopyButton
          targetColor={targetColor}
          tabIndex={isSelected ? 0 : -1}
        />
      </div>

      <div
        className="flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {pickerMode[targetItemType] ? (
          <input
            type="color"
            value={targetColor.hex}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const res = normalizeHexForCommit(e.target.value);
              if (res.ok) {
                handleSetColor(targetItemType, {
                  name: res.value,
                  hex: res.value,
                });
              }
            }}
            className="w-16 h-12 cursor-pointer"
            aria-label={`${title} color picker`}
            tabIndex={isSelected ? 0 : -1}
          />
        ) : (
          <button
            className="relative inline-flex items-center justify-center text-sm text-indigo-600 hover:text-indigo-700 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 h-12 min-w-12 px-3 cursor-pointer"
            onClick={() => handleUseColorPicker(targetItemType)}
            type="button"
            aria-expanded={!!pickerMode[targetItemType]}
            tabIndex={isSelected ? 0 : -1}
          >
            <Pipette className="w-3 h-3 mr-1" aria-hidden="true" />
            Use Color Picker
            <span className="pointer-events-none absolute -inset-2 md:inset-0"></span>
          </button>
        )}
      </div>
    </div>
  );
}
