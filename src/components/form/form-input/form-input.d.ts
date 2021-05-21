import type { FormFields } from "../form.reducer";

export interface FormInputProps {
  label: string;
  description?: string;
  centered?: boolean;
  props: {
    name: FormFields;
    type: string;
    value: any;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  };
}
