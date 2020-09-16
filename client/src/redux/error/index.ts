import { RESET_ERROR } from "./constants";

export const error = (state = null, action: any) => {
  if (action.type === RESET_ERROR) {
    return null;
  }

  if (action.error) {
    return action.error;
  }
  return state;
};
