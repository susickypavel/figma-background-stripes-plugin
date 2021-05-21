import React from "react";
import { Label } from "./form-range.styles";

import type { FunctionComponent } from "react";

export const FormRangeInput: FunctionComponent<{
  label: string;
  name: string;
  min: number;
  max: number;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}> = ({ label, ...props }) => {
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
