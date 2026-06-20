export interface TailwindColors {
  [colorName: string]: {
    [shade: string]: string;
  };
}

export interface PaletteProps {
  handleColorSelectAction: (name: string, hex: string, value: string) => void;
  selectedColor: string | null;
}

export interface SelectedColorState {
  name: string;
  hex: string;
}

export interface PickerModeState {
  bg: boolean;
  fg: boolean;
}

export type WCAGType = 'AA' | 'AAA';
export type WCAGCheckSize = 'normal' | 'large';
export type ActiveFieldType = 'bg' | 'fg';
