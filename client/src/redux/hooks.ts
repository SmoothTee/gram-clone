import { useSelector, TypedUseSelectorHook } from "react-redux";

import { ModalState } from "./modal/types";
import { AuthState } from "./auth/types";

interface RootState {
  modal: ModalState;
  auth: AuthState;
  error: any;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
