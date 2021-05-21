import React, { useReducer } from "react";

import { initialState, reducer } from "./form.reducer";
import { FormInput } from "./form-input/form-input.component";
import { FormRangeInput } from "./form-range/form-range.component";
import { FormButton, FormControls, FormRow, StyledForm } from "./form.styles";

import type { FunctionComponent } from "react";

export const Form: FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch({
      type: "SUBMIT",
    });
  };

  const onCancel = () => {
    dispatch({
      type: "CANCEL",
    });
  };

  const onReset = () => {
    dispatch({
      type: "RESET",
    });
  };

  const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_VALUE",
      field: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <FormRow>
        <FormInput
          label="First stripe color"
          centered={true}
          props={{
            name: "firstStripeColor",
            type: "color",
            value: state.firstStripeColor,
            onChange: onValueChanged,
          }}
        />
        <FormInput
          label="Second stripe color"
          centered={true}
          props={{
            name: "secondStripeColor",
            type: "color",
            value: state.secondStripeColor,
            onChange: onValueChanged,
          }}
        />
      </FormRow>
      <FormRow>
        <FormInput
          label="Rect height"
          description="Height of frame's visible area"
          props={{
            name: "rectHeight",
            type: "number",
            value: state.rectHeight,
            onChange: onValueChanged,
          }}
        />
        <FormInput
          label="Rect width"
          description="Width of frame's visible area"
          props={{
            name: "rectWidth",
            type: "number",
            value: state.rectWidth,
            onChange: onValueChanged,
          }}
        />
      </FormRow>
      <FormInput
        label="Stripe width"
        description="Width of the stripes (applies to all stripes)"
        props={{
          name: "stripeWidth",
          type: "number",
          value: state.stripeWidth,
          onChange: onValueChanged,
        }}
      />
      <FormRangeInput
        min={0}
        max={360}
        label="Angle"
        description="Angle under which are all stripes rendered"
        name="angle"
        value={state.angle}
        onChange={onValueChanged}
      />
      <FormControls>
        <FormButton variant="#6EE7B7" type="button" onClick={onCancel}>
          CANCEL
        </FormButton>
        <FormButton variant="#93C5FD" type="button" onClick={onReset}>
          RESET
        </FormButton>
        <FormButton variant="#FCA5A5" type="submit">
          CREATE
        </FormButton>
      </FormControls>
    </StyledForm>
  );
};
