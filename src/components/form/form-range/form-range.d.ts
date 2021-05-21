export interface FormRangeInputProps {
  label: string;
  name: string;
  min: number;
  max: number;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}
