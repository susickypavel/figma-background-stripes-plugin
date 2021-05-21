import React, { useReducer } from "react";

import { initialState, reducer } from "./form.reducer";
import { FormInput } from "./form-input.component";
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
          props={{
            name: "firstStripeColor",
            type: "color",
            value: state.firstStripeColor,
            onChange: onValueChanged,
          }}
        />
        <FormInput
          label="Second stripe color"
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
          props={{
            name: "rectHeight",
            type: "number",
            value: state.rectHeight,
            onChange: onValueChanged,
          }}
        />
        <FormInput
          label="Rect width"
          props={{
            name: "rectWidth",
            type: "number",
            value: state.rectWidth,
            onChange: onValueChanged,
          }}
        />
      </FormRow>
      <FormInput
        label="Angle"
        props={{
          name: "angle",
          type: "number",
          value: state.angle,
          onChange: onValueChanged,
        }}
      />
      <FormInput
        label="Stripe width"
        props={{
          name: "stripeWidth",
          type: "number",
          value: state.stripeWidth,
          onChange: onValueChanged,
        }}
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
