// RadioBox.types.ts
export interface RadioBoxProps {
  options: Array<{ label: string; value: string }>;
  selectedValue: string;
  onChange: (value: string) => void;
  name: string;
  disabled?: boolean;
}