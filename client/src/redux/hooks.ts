import { useSelector, TypedUseSelectorHook } from "react-redux";

import { ModalState } from "./modal/types";
import { AuthState } from "./auth/types";
import { PostState } from "./post/types";
import { EntityState } from "./entities/types";
import { PostMediaState } from "./postMedia/types";

interface RootState {
  modal: ModalState;
  auth: AuthState;
  post: PostState;
  postMedia: PostMediaState;
  entities: EntityState;
  error: any;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
