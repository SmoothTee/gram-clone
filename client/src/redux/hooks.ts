import { useSelector, TypedUseSelectorHook } from "react-redux";

import { ModalState } from "./modal/types";
import { AuthState } from "./auth/types";
import { PostState } from "./post/types";

interface RootState {
  modal: ModalState;
  auth: AuthState;
  post: PostState;
  error: any;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
