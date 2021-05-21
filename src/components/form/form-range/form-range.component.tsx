import React from "react";

import { Label } from "./form-range.styles";
import { Description } from "../form-input/form-input.styles";

import type { FunctionComponent } from "react";
import type { FormRangeInputProps } from "./form-range";

export const FormRangeInput: FunctionComponent<FormRangeInputProps> = ({
  label,
  description,
  ...props
}) => {
  return (
    <Label>
      <span>{label}</span>
      <div>
        <input type="range" {...props} />
        <input type="number" {...props} />
      </div>
      {description && <Description>{description}</Description>}
    </Label>
  );
};
