export type Action =
  | {
      type: "UPDATE_VALUE";
      field: string;
      value: string;
    }
  | {
      type: "SUBMIT";
    }
  | {
      type: "CANCEL";
    }
  | {
      type: "RESET";
    };

export type FormFields =
  | "angle"
  | "secondStripeColor"
  | "firstStripeColor"
  | "rectHeight"
  | "rectWidth"
  | "stripeWidth";

export type State = {
  [key in FormFields]: string;
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_VALUE": {
      const { field, value } = action;

      return {
        ...state,
        [field]: value,
      };
    }
    case "RESET": {
      return initialState;
    }
    case "SUBMIT": {
      parent.postMessage(
        { pluginMessage: { type: "create-background", ...state } },
        "*"
      );

      return state;
    }
    case "CANCEL": {
      parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");

      return state;
    }
    default:
      return state;
  }
}

export const initialState: State = {
  angle: "45",
  firstStripeColor: "#EF4444",
  secondStripeColor: "#10B981",
  rectHeight: "400",
  rectWidth: "400",
  stripeWidth: "15",
};
