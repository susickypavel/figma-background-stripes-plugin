import type { FormFields } from "../form.reducer";

export interface FormInputProps {
  label: string;
  props: {
    name: FormFields;
    type: string;
    value: any;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  };
}
