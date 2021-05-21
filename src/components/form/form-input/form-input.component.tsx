import React from "react";

import { Label } from "./form-input.styles";

import type { FunctionComponent } from "react";
import type { FormInputProps } from "./form-input";

export const FormInput: FunctionComponent<FormInputProps> = ({
  label,
  props,
}) => {
  return (
    <Label>
      <span>{label}</span>
      <input {...props} />
    </Label>
  );
};
