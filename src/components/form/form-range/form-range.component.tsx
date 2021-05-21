import React from "react";

import { Label } from "./form-range.styles";

import type { FunctionComponent } from "react";
import type { FormRangeInputProps } from "./form-range";

export const FormRangeInput: FunctionComponent<FormRangeInputProps> = ({
  label,
  ...props
}) => {
  return (
    <Label>
      <span>{label}</span>
      <div>
        <input type="range" {...props} />
        <input type="number" {...props} />
      </div>
    </Label>
  );
};
