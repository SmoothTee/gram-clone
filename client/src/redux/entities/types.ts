import { Post } from "../post/types";

export interface EntityInitialState<T> {
  byId: { [key: number]: T };
}
