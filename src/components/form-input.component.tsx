import React from "react";

import { Label } from "./form-input.styles";

import type { FunctionComponent } from "react";
import type { FormFields } from "./form.reducer";

export const FormInput: FunctionComponent<{
  label: string;
  props: {
    name: FormFields;
    type: string;
    value: any;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  };
}> = ({ label, props }) => {
  return (
    <Label>
      <span>{label}</span>
      <input {...props} />
    </Label>
  );
};
