import React from "react";

import { Description, Label } from "./form-input.styles";

import type { FunctionComponent } from "react";
import type { FormInputProps } from "./form-input";

export const FormInput: FunctionComponent<FormInputProps> = ({
  label,
  description,
  props,
}) => {
  return (
    <Label>
      <span>{label}</span>
      <input {...props} />
      {description && <Description>{description}</Description>}
    </Label>
  );
};
